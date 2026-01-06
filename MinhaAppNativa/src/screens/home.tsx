import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Olá, Silvia!</Text>
          <Text style={styles.subText}>Para onde vamos hoje?</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Saldo Disponível</Text>
          <Text style={styles.balanceValue}>20,00 €</Text>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate('Card')}
          >
            <Text style={styles.detailsButtonText}>Ver Detalhes do Cartão</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Routes')}
          >
            <Text style={styles.menuIcon}>🚌</Text>
            <Text style={styles.menuText}>Horários</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Última Viagem</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyRoute}>Linha 102 - Centro</Text>
            <Text style={styles.historyDate}>Hoje, 08:30</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 30, marginTop: 10 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A' },
  subText: { fontSize: 16, color: '#666' },
  balanceCard: { backgroundColor: '#0056b3', borderRadius: 20, padding: 25, marginBottom: 30 },
  balanceTitle: { color: '#E0E0E0', fontSize: 14, textTransform: 'uppercase' },
  balanceValue: { color: '#FFFFFF', fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  detailsButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  detailsButtonText: { color: '#FFFFFF', fontWeight: '600' },
  menuGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  menuItem: { backgroundColor: '#FFFFFF', width: '48%', padding: 20, borderRadius: 15, alignItems: 'center' },
  menuIcon: { fontSize: 30, marginBottom: 10 },
  menuText: { fontWeight: '600', color: '#333' },
  historySection: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  historyItem: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#0056b3' },
  historyRoute: { fontWeight: '600', fontSize: 16 },
  historyDate: { color: '#888', marginTop: 5 },
});