import express from 'express';
import todoController from '../controllers/todoController';

const todoRoutes = express.Router();

todoRoutes.use(express.json());

todoRoutes.use('/todos', todoController);

export default todoRoutes;
