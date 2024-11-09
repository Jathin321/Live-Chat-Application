const express = require('express')
const app = express()
const port = 7777
const mongoDb = require('./mongodb')
mongoDb();

try{
    app.use((req,res,next) => {
      res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    })
  }
  catch(err){
    console.log("CORS_SYJ_ERROR : "+ err);
  }

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./routes/login"))
app.use('/api',require("./routes/messageRoute"))
app.use('/api',require("./routes/fetchMessages"))

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})