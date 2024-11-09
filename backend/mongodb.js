const mongoose = require("mongoose");
const mongoURI = 'mongodb://jathin:12345@ac-wz91ayi-shard-00-00.l0it8dy.mongodb.net:27017,ac-wz91ayi-shard-00-01.l0it8dy.mongodb.net:27017,ac-wz91ayi-shard-00-02.l0it8dy.mongodb.net:27017/Live_Chat?ssl=true&replicaSet=atlas-11g1a5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const mongoDb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("MongoDB connected...");

        const fetched_users = await mongoose.connection.db.collection("users").find({}).toArray(async (err)=>{
            if(err) console.log(err);
        });
        global.users = fetched_users;
        // console.log(global.users);

        const messages = await mongoose.connection.db.collection("messages").find({}).toArray(async (err) => {
            if(err) console.log("Msg fetching error", err)
        })
    global.messages = messages;
    console.log(global.messages)
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = mongoDb;