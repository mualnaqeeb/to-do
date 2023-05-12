import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { User } from './App';

interface RegisterProps {
  setUser: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/register`, { username, password });
      setUser(response.data);
    } catch (error) {
      setErrorMessage("failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Register;
