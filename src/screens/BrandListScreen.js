import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BrandListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una Marca</Text>

      <TouchableOpacity onPress={() => navigation.navigate('List', { brand: 'neumann' })}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Neumann_logo.svg' }}
          style={styles.logo}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('List', { brand: 'sennheiser' })}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Sennheiser_logo.svg' }}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BrandListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
  },
});
