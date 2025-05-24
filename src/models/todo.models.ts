import { model, Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model<ITodo>("Todo", todoSchema);

export { Todo, ITodo };
