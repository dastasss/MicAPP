// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import api from './axios';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      Alert.alert('Login exitoso', `Token: ${token}`);
      onLoginSuccess(token);
    } catch (error) {
      console.log('Error login:', error.message);
      Alert.alert('Error', 'Credenciales inválidas o no hay conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Cargando...' : 'Ingresar'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:24, marginBottom:20, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:15, borderRadius:5 },
});
