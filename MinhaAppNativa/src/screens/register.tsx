import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios'; // <--- Garante que esta linha não tem erros

export default function App() {
  // Estados para capturar os dados do formulário
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // 1. Validação simples
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      /**
       * IMPORTANTE: No emulador Android, 'localhost' não funciona.
       * Usa-se o IP 10.0.2.2 para aceder ao teu computador (onde o Docker está).
       * Porta: 3000 (conforme configurado no teu docker-compose).
       */
      const response = await axios.post('http://10.0.2.2:3000/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', `Utilizador ${firstName} registado na base de dados!`);
        // Limpar o formulário após sucesso
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Erro de Ligação', 
        'Não foi possível comunicar com o servidor. Verifica se o Docker está a correr.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginBox}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Registe-se para a sua app de autocarros</Text>

            <TextInput 
              style={styles.input}
              placeholder="Primeiro Nome"
              value={firstName}
              onChangeText={setFirstName}
            />

            <TextInput 
              style={styles.input}
              placeholder="Apelido"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput 
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput 
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>REGISTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 20 }}>
              <Text style={{ color: '#666' }}>Já tem conta? Faça Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginBox: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});