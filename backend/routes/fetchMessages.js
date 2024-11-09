const express = require("express");
const router = express.Router();
const Message = require("../modals/messageModal")

router.post("/fetchMessages",
    async(req,res) => {
        try{
            const messages = await Message.find({});
            res.json(messages)
        }
        catch(err){
            conbsole.log("msg fetch error",err);
        }
    }
)

module.exports = router;