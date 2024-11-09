const express = require('express')
const router = express.Router()
const Message = require("../modals/messageModal")

router.post("/sendMessage", 
    async (req,res) => {
        const content = req.body.content;
        const sender = req.body.sender;

        if(!content || !sender){
            console.log("Insufficient data to send msg")
            return res.status(400).json({success:false});
        }

        var newMessage = {
            sender : sender,
            content : content
        }

        try{
            var message = await Message.create(newMessage);
            // console.log(json(message))
            res.json(message)
        }
        catch(err){
            res.status(400);
            console.log("msg sending err", err);
        }
    }
)

module.exports = router;