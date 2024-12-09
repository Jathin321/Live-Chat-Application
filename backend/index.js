const express = require('express')
const app = express()
const port = 7777
const mongoDb = require('./mongodb')
mongoDb();

const allowedOrigins = [
  "http://localhost:5173",
  "https://agentesports-trail.vercel.app",
];

try {
  app.use((req, res, next) => {
    const origin = req.headers.origin; // Get the origin of the request
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin); // Dynamically set allowed origin
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Optional: Allow specific HTTP methods
    next();
  });
} catch (err) {
  console.log("CORS_SYJ_ERROR: " + err);
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./routes/login"))
app.use('/api',require("./routes/messageRoute"))
app.use('/api',require("./routes/fetchMessages"))

const server = app.listen(port, () => {
    console.log(`connected to port ${port}`)
})

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://agentesports-trail.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io:", socket.id);

  // When a user sets up their email
  socket.on('setup', (user) => {
    if (!user) {
      console.error('User setup failed: No user provided');
      return;
    }
    socket.join(user); // Joining a room based on their email
    console.log("User joined room:", user," id: ",socket.id);
    socket.emit('connection'); // Acknowledge connection to client
  });

  // Handling new messages
  socket.on("new message", (newMessage) => {
    socket.broadcast.emit("message received", newMessage);
  });
});
