import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Login from './login';
import TodoList from './todo';

const Stack = createNativeStackNavigator();

export interface User {
  id: number;
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        try {
          const res = await axios.get<User>('/api/user');
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return null; // or a loading spinner or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="TodoList" options={{ headerShown: false }}>
            {props => <TodoList {...props} user={user} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
