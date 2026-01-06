import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const API_URL = "http://192.168.1.XX:3000"; 

function App() { // Garante que o nome é 'App'
  // ... o teu código do criarCartao ...
  return (
    <View style={styles.container}>
       <Text style={styles.title}>BusApp Mobile</Text>
       <TouchableOpacity style={styles.button} onPress={criarCartao}>
         <Text style={{color: 'white'}}>Testar Ligação ao Docker</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 20, borderRadius: 10 }
});

export default App;
