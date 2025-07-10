import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';

const API_BASE = 'http://10.0.2.2:3001';

type Mic = {
  ID: number;
  Title: string;
  Title_URL: string;
  Image: string;
};

// Aquí importas las imágenes locales usando require()
const brands = [
  {
    name: 'sennheiser',
    logo: require('./assets/sennheiser.png'),
  },
  {
    name: 'neumann',
    logo: require('./assets/neumann.png'),
  },
];


export default function App() {
  const [screen, setScreen] = useState<'login' | 'select' | 'list'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mics, setMics] = useState<Mic[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Login
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error en login');
        setLoading(false);
        return;
      }
      setToken(data.token);
      setUsername('');
      setPassword('');
      setScreen('select');
    } catch (e: any) {
      setError(e.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Fetch micrófonos por marca con token
  const fetchMics = async (brand: string) => {
    setError(null);
    setLoading(true);
    setSelectedBrand(brand);
    try {
      const res = await fetch(`${API_BASE}/microphones/${brand}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al obtener micrófonos');
        setLoading(false);
        return;
      }
      setMics(data.results || []);
      setScreen('list');
    } catch (e: any) {
      setError(e.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Render item micrófono para FlatList
  const renderItem = ({ item }: { item: Mic }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.Title}</Text>
      <Image source={{ uri: item.Image }} style={styles.image} resizeMode="contain" />
      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(item.Title_URL);
        }}
      >
        Más información
      </Text>
    </View>
  );

  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        <Button
          title={loading ? 'Cargando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={loading || !username || !password}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  if (screen === 'select') {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Elige Marca</Text>
        <View style={styles.brandContainer}>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand.name}
              onPress={() => fetchMics(brand.name)}
              style={styles.brandButton}
            >
              <Image source={brand.logo} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 20 }} />
        <Button
          title="Cerrar sesión"
          onPress={() => {
            setToken(null);
            setScreen('login');
            setError(null);
            setMics([]);
            setSelectedBrand(null);
          }}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  if (screen === 'list') {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Micrófonos {selectedBrand}</Text>
        {loading && <ActivityIndicator size="large" color="#0f0" />}
        {!loading && (
          <>
            <FlatList
              data={mics}
              keyExtractor={(item) => item.ID.toString()}
              renderItem={renderItem}
            />
            <View style={{ height: 20 }} />
            <Button title="Volver a marcas" onPress={() => setScreen('select')} />
            <View style={{ height: 10 }} />
            <Button
              title="Cerrar sesión"
              onPress={() => {
                setToken(null);
                setScreen('login');
                setError(null);
                setMics([]);
                setSelectedBrand(null);
              }}
            />
            {error && <Text style={styles.error}>{error}</Text>}
          </>
        )}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
  heading: { color: '#fff', fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', marginBottom: 12, padding: 10, borderRadius: 6 },
  error: { color: 'red', marginTop: 12, textAlign: 'center' },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  brandButton: { marginHorizontal: 15 },
  logo: { width: 120, height: 60 },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: { color: '#0f0', fontSize: 18, marginBottom: 8 },
  image: { width: 100, height: 60, marginBottom: 8 },
  link: { color: '#0af', textDecorationLine: 'underline' },
});
