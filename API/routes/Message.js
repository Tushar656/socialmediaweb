const router = require('express').Router()
const Message = require('../models/Messages')

// ADD
router.post('/', async(req, res)=>{
    const newmessage = new Message(req.body)

    try{
        const savedMessage = await newmessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json("Add msg error")
    }
})

// GET
router.get('/:conversationId', async(req, res)=>{
    try{
        const messages = await Message.find({
            ConversationID: req.params.conversationId
        });
        res.status(200).send(messages);
    }catch(err){
        res.status(500).json("Get msg error")
    }
})



module.exports = router