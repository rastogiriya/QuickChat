import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

connectDB();

const app = express();
//require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected successfully");
//     const server = app.listen(process.env.PORT, () => {
//       console.log(`Server Started on Port ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });
