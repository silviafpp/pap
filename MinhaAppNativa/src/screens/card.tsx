import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>O Meu Cartão Virtual</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={[styles.busCard, { width: screenWidth - 40 }]}>
          <Text style={styles.cardBrand}>BUS PASS</Text>
          <Text style={styles.cardNumber}>**** **** **** 4582</Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.label}>TITULAR</Text>
              <Text style={styles.value}>SILVIA PACHECO</Text>
            </View>
            <View>
              <Text style={styles.label}>VALIDADE</Text>
              <Text style={styles.value}>12/30</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ESTA PARTE FALTA NO TEU FICHEIRO (Por isso é que dá erro):
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: { marginTop: 20, marginBottom: 30 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  cardContainer: { alignItems: 'center' },
  busCard: { height: 200, backgroundColor: '#111', borderRadius: 16, padding: 25, justifyContent: 'space-between' },
  cardBrand: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  cardNumber: { color: '#FFF', fontSize: 22, textAlign: 'center', letterSpacing: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#888', fontSize: 10 },
  value: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  backButton: { marginTop: 'auto', marginBottom: 20, alignItems: 'center' },
  backButtonText: { color: '#0056b3', fontSize: 16, fontWeight: '600' },
});