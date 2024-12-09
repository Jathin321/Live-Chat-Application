const mongoose = require('mongoose')

const messageModal = mongoose.Schema(
    {
        sender : {type : String, required : true},
        content : {type : String, required : true},
        to: {type: String, required : false},
        toContent : {type: String, required : false}
    },
    {
        timestamps : true
    }
);

const Message = mongoose.model("Message", messageModal);
module.exports = Message;