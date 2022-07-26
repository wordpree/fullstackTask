import express from "express";
import dotenv from "dotenv";
import tasks from "../routers/tasks.js";
import connectDB from "../db/connect.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MGDB_CONNECTION);
    app.listen(
      process.env.PORT,
      console.log(`server running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
