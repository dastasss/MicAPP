import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ route }) => {
  const { brand } = route.params;
  const [mics, setMics] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMics = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await axios.get(`/microphones/${brand}?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMics(res.data.results);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMics();
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Micrófonos: {brand.toUpperCase()}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={mics}
          keyExtractor={(item, index) => `${item.Title}_${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item.Title}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.pagination}>
        <Button title="Anterior" disabled={page === 1} onPress={() => setPage(page - 1)} />
        <Text style={styles.text}>Página {page}</Text>
        <Button title="Siguiente" disabled={page * 10 >= total} onPress={() => setPage(page + 1)} />
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
    paddingTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#222',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
