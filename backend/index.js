import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import messagesRoute from "./routes/messagesRoute.js";
import { Server } from "socket.io";
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
