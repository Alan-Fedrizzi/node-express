import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todos";

const router = Router();

// add new todo
router.post("/", createTodo);

// get all todos
router.get("/", getTodos);

// update todo
router.patch("/:id", updateTodos);

// delete todo
router.delete("/:id", deleteTodos);

export default router;
