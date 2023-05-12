import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllTodos(userId: string): Promise<Todo[]> {
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });
  return todos;
}

export async function getTodoById(id: string): Promise<Todo | null> {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  return todo;
}

export async function createTodo(
  userId: string,
  title: string,
  completed = false
): Promise<Todo> {
  const todo = await prisma.todo.create({
    data: {
      title,
      completed,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return todo;
}

export async function updateTodo(
  id: string,
  title: string,
  completed: boolean
): Promise<Todo | null> {
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      completed,
    },
  });
  return todo;
}

export async function deleteTodo(id: string): Promise<Todo | null> {
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return todo;
}
