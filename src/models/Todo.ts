import mongoose, { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
  whatToDo: {
    type: String,
    required: true,
  },
  whenToDo: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
