const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// UPDATE USER
router.put('/:id', async(req, res)=>{
    try{
        if(req.body.userId == req.params.id || req.body.isAdmin){
            if(req.body.password){
                try{
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password , salt)
                }catch(e){
                    res.status(500).send(e)
                }
            }
            try{
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                });
                res.status(200).send("Account has been updated")
            }catch(e){
                res.status(400).send(e)
            }
        }else{
            res.status(404).send('You can update only Your account')
        }
    }catch(e){
        res.status(400).send(e)
    }
})


// DELETE USER
router.delete('/:id', async(req, res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.send('Account has been Deleted Successfully')
        }catch(e){
            res.send(e)
        }
    }else{
        res.status(403).send('You can delete only your Account')
    }
})


// GET AN USER
router.get('/userr/', async(req, res)=>{
    const userId = req.query.userId
    const username = req.query.username
    try{
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username : username})
        !user && res.send('User Not found');
        const {password, updatedAt, ...other} = user._doc            // For not getting password and updateAt
        res.status(200).send(other)
    }catch(e){
        res.status(400).send(e)
    }
})

// GET FRIENDS
router.get('/friends/:userId', async(req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followeing.map(friendId =>{
                return User.findById(friendId);
            })
        );
        const friendList = [];
        friends.map(friend =>{
            const {_id, username, ProfilePicture} = friend;
            friendList.push({_id, username, ProfilePicture});
        })
        res.status(200).send(friendList);
    }catch(err){
        res.status(500).send(err)
    }
    
})


// FOLLOW USER
router.put('/:id/follow', async(req, res)=>{
    if(req.body.userId != req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}})
                await currentUser.updateOne({ $push: {followeing: req.params.id}})
                res.send(`You followed ${user.username}`)
            }else{
                res.status(403).send('You already Follow this user')
            }

        }catch(e){
            res.send(e)
        }
    }else{
        res.send("You can't follow Your Self")
    }
})



// UNFOLLOW USER
router.put('/:id/unfollow', async(req, res)=>{
    if(req.body.userId != req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}})
                await currentUser.updateOne({ $pull: {followeing: req.params.id}})
                res.send(`You unfollowed ${user.username}`)
            }else{
                res.status(403).send("You don't Follow this user")
            }

        }catch(e){
            res.send(e)
        }
    }else{
        res.send("You don't follow Your Self")
    }
})


module.exports = router