require('dotenv').config();
const express=require('express');
const connectDB = require('./config/db');
const authrouter=require('./routes/auth');
const bodyparser=require('body-parser');
const authenticateToken=require('./middleware/is-Auth');
const postRoute=require('./routes/posts');
const userRouter=require('./routes/user');
const friendsRouter=require('./routes/friends');
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const setupSocket = require('./socket/chat'); 


const app=express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
app.use(cors());
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  setupSocket(io);

app.use('/api/auth',authrouter);
app.use('/api/posts',postRoute);
app.use('/api/users',userRouter);
app.use('/api/friends',friendsRouter)
// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const data = error.data;
    const message = error.message;
    res.status(status).json({
      message: message,
      data: data
    });
  });
  app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route, user ' + req.userId });
});

app.listen(3000,()=>{
  connectDB();
    console.log('server is starting running now ');
    console.log("Swagger UI available at http://localhost:3000/api-docs");
})