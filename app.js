require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authrouter = require("./routes/Authentication.route");
const bodyparser = require("body-parser");
const authenticateToken = require("./middleware/is-Auth");
const postRouter = require("./routes/Post.routes");
const userRouter = require("./routes/User.routes");
const friendsRouter = require("./routes/Friend.routes");
const storyRouter = require("./routes/story.routes");
const commentRouter = require("./routes/Comment.routes");
const reactionRouter = require('./routes/Reaction.routes');
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const setupSocket = require("./socket/chat");
const { scopePerRequest } = require("awilix-express");
const container = require("./config/DIContainer");

const app = express();
app.use(scopePerRequest(container));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

setupSocket(io);

app.use("/api/auth", authrouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/reactions', reactionRouter);
app.use("/api/users", userRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/stories", storyRouter);
// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;
  res.status(status).json({
    message: message,
    data: data,
  });
});
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected route, user " + req.userId });
});

app.listen(3000, () => {
  connectDB();
  console.log("server is starting running now ");
  console.log("Swagger UI available at http://localhost:3000/api-docs");
});
