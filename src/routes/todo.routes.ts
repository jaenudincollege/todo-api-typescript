import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.get("/:id", getTodoById);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
