import { Request, Response } from "express";
import { ITodo, Todo } from "../models/todo.models";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}

export const createTodo = async (
  req: Request<{}, {}, TodoInput>,
  res: Response
) => {
  const { title, description, completed, dueDate, priority } = req.body;

  if (!title) {
    return res.status(406).json({ message: "Title is required" });
  }

  try {
    const newTodo: ITodo = await Todo.create({
      title,
      description,
      completed,
      dueDate,
      priority,
    });

    res.status(201).json({ todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTodoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const todo: ITodo | null = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTodo = async (
  req: Request<{ id: string }, {}, TodoInput>,
  res: Response
) => {
  const { title, description, completed, dueDate, priority } = req.body;
  const { id } = req.params;
  try {
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        dueDate,
        priority,
      },
      { new: true }
    );

    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ deleted: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
