const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

// CREATE A POST
router.post('/', async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.send(savedPost);
    }catch(e){
        res.send('Create post err')
    }
})



// UPDATE A POST
router.put('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
            await post.updateOne({$set: req.body})
            res.send("Post has been Updated")
        }else{
            res.send('You can update only your post')
        }
    }catch(e){
        res.send(e)
    }
})


// DELETE A POST
router.delete('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
            await post.deleteOne()
            res.send("Post has been deleted")
        }else{
            res.send('You can delete only your post')
        }
    }catch(e){
        res.send(e)
    }
})

// LIKE A POST
router.put('/:id/like', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.send('Post has been liked')
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.send('Post has been disliked')
        }

    }catch(e){
        res.send(e)
    }

})


// GET A POST
router.get('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.send(post)
    }catch(e){
        res.send("Get post err")
    }
})


// GET TIMELINES POST
router.get('/timeline/:userId', async(req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPost = await Post.find({userId: currentUser._id})
        const frindPost = await Promise.all(
            currentUser.followeing.map((friendId)=>{
                return Post.find({userId : friendId})
            })
        );
        res.status(200).send(userPost.concat(...frindPost))
    }catch(e){
        res.send("Timeline err")
    }
})


// GET USER'S ALL POST
router.get('/profile/:username', async(req, res)=>{
    try{
        const currentUser = await User.findOne({username:req.params.username});
        const userPost = await Post.find({userId: currentUser._id})
        
        res.status(200).send(userPost)
    }catch(e){
        res.send(e)
    }
})
module.exports = router