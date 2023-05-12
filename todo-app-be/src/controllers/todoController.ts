import express from 'express';
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../models/todo';
import { verifyToken } from '../utils/jwt';

const todoController = express.Router();

todoController.use(express.json());

todoController.get('/', async (req, res) => {
    const userId = verifyToken(req.headers.authorization as string);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const todos = await getAllTodos(userId.toString());
    res.json(todos.filter((todo: any) => todo.userId === userId));
});

todoController.get('/:id', async (req, res) => {
    const userId = verifyToken(req.headers.authorization as string);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const id = req.params.id;
    const todo = await getTodoById(id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    if (todo.userId !== userId.toString()) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    res.json(todo);
});

todoController.post('/', async (req, res) => {
    const userId = verifyToken(req.headers.authorization as string);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const { title } = req.body;
    const todo = await createTodo(title, userId.toString());
    res.json(todo);
});

todoController.patch('/:id', async (req, res) => {
    const userId = verifyToken(req.headers.authorization as string);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = await updateTodo(id.toString(), title, completed);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
});

todoController.delete('/:id', async (req, res) => {
    const userId = verifyToken(req.headers.authorization as string);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const id = parseInt(req.params.id);
    const todo = await deleteTodo(id.toString());
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json({ message: 'Todo deleted' });
});

export default todoController;
