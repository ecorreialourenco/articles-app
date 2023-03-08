import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

const start = async () => {
  dotenv.config({ path: ".env" });

  if (!process.env.JWT_KEY) {
    throw new Error("Key not found!");
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/article-platform");
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("err", err);
  }

  const PORT = 8001;

  app.listen(PORT, () => {
    console.log("Listen on port:", PORT);
  });
};

start();
