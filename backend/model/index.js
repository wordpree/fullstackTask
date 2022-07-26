import mongoose from "mongoose";

const { Schema } = mongoose;
const taskSchema = new Schema({
  task: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
});

export default mongoose.model("Tasks", taskSchema);
