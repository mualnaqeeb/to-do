import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { User } from './App';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
}

interface Props {
  user: User;
}

export default function TodoList({ user }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get<Todo[]>(`${process.env.API_URL}/todos?user_id=${user.id}`);
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, [user]);

  const handleNewTodoSubmit = async () => {
    try {
      const res = await axios.post<Todo>(`${process.env.API_URL}/todos`, {
        title: newTodoTitle,
        completed: false,
        user_id: user.id,
      });
      setTodos([...todos, res.data]);
      setNewTodoTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoUpdate = async (id: number, completed: boolean) => {
    try {
      await axios.put(`${process.env.API_URL}/todos/${id}`, { completed });
      const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed } : todo));
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <TouchableOpacity onPress={() => handleTodoUpdate(item.id, !item.completed)} style={styles.todoItem}>
        <Text style={[styles.todoTitle, item.completed && styles.completedTodoTitle]}>{item.title}</Text>
        <Text style={[styles.todoStatus, item.completed && styles.completedTodoStatus]}>
          {item.completed ? 'Completed' : 'Incomplete'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <FlatList data={todos} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      <View style={styles.newTodoContainer}>
        <TextInput
          style={styles.newTodoInput}
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          placeholder="Enter a new todo"
        />
        <TouchableOpacity style={styles.newTodoButton} onPress={handleNewTodoSubmit}>
          <Text style={styles.newTodoButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  todoItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  completedTodoTitle: {
    textDecorationLine: 'line-through',
  },
  todoStatus: {
    fontSize: 14,
  },
  completedTodoStatus: {
    textDecorationLine: 'line-through',
  },
  newTodoContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  newTodoInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  newTodoButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  newTodoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
