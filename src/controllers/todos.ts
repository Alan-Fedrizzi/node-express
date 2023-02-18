import { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, resp, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  resp.status(201).json({ message: "Created the todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, resp, next) => {
  resp.json({ todos: TODOS });
};

export const updateTodos: RequestHandler<{ id: string }> = (
  req,
  resp,
  next
) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  resp.json({ message: "Updated!", updatedTodos: TODOS[todoIndex] });
};

export const deleteTodos: RequestHandler<{ id: string }> = (
  req,
  resp,
  next
) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS.splice(todoIndex, 1);

  resp.json({ message: "Todo deleted!" });
};
