import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.X:8000/api'; // ⚠️ CAMBIA esto por tu IP local

export const login = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  const data = await res.json();
  await AsyncStorage.setItem('token', data.access);
  return data.access;
};

export const getMicros = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/micros/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener micrófonos');
  return await res.json();
};
