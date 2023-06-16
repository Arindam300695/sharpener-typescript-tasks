"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();

router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post("/", (req, res, next) => {
    const newTodos = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodos);
    return res.status(201).json({ message: "Added Todo", newTodos: newTodos });
});

router.put("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todo) => todo.id === tid);
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "Updated todo", todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter((todo) => todo.id !== req.params.todoId);
    return res.status(200).json({ message: "Deleted todo", todos: todos });
});

exports.default = router;
