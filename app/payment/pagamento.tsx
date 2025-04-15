import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import api from '../../helpers/axios'
import { IPedido } from '../../components/interfaces';

export default function PaymentScreen() {
  const [orders, setOrders] = useState<IPedido[]>([])
  const [command, setCommand] = useState('')

  function pedidosComanda() {
    const buscaPedidos = async () => {
      try {
        const response = await api.get(`order/cmd/${command}`)
        setOrders(response.data)
      } catch (e) {
        console.log('Erro: ' + e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.navigate("/")}>
        <Text style={styles.homeButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Pagamentos</Text>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ height: 50, width: 225, borderWidth: 2, padding: 10, margin: 15, fontSize: 20, backgroundColor: 'white' }}
          placeholder='Número da comanda' keyboardType='numeric' 
          value={command} onChangeText={setCommand}/>

        <TouchableOpacity style={{ backgroundColor: '#4f6bd9', height: 50, width: 100, padding: 5, margin: 15, borderRadius: 5 }}
        onPress={()=>{pedidosComanda}}>
          <Text style={{ fontSize: 16, padding: 5, borderRadius: 5, textAlign: 'center', margin: 5, fontWeight: 'bold', color: 'white' }}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20, alignSelf: 'flex-start' },
  homeButtonText: { color: 'white', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
});
