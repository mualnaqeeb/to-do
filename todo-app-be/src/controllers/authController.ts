import express from 'express';
import { hashPassword, comparePassword, generateToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authController = express.Router();

authController.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await hashPassword(password);
  const user = await prisma.user.create({ data: { name, email, password: hash } });
  const token = generateToken(+user.id);
  res.json({ user, token });
});

authController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }
  const token = generateToken(+user.id);
  res.json({ user, token });
});

export default authController;
