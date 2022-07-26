import connectDB from "../db/connect.js";
import Task from "../model/index.js";
import dotenv from "dotenv";
dotenv.config();
async function start() {
  try {
    await connectDB(process.env.MGDB_CONNECTION);
    // await Task.create(data);
    await Task.deleteMany();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
