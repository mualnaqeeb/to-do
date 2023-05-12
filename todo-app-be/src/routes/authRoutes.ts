import express from 'express';
import authController from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.use(express.json());

authRoutes.use('/auth', authController);

export default authRoutes;
