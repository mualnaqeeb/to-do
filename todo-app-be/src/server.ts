import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(authRoutes);
app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
