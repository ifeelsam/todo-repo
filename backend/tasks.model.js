import mongoose from "mongoose"
// mongoose.connect("mongodb://localhost:27017/magesDB");


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: 0,
    required: true
  }
})

export const Task = new mongoose.model("Task", taskSchema)

