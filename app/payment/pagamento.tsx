import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import api from '../../helpers/axios';
import { IPedido } from '../../components/interfaces';
import OrderCard from '../../components/orderCard/orderCard';

export default function PaymentScreen() {
  const [orders, setOrders] = useState<IPedido[]>([{
    _id: '',
    cod_mesa: 0,
    cod_comanda: 0,
    produtos: [{ nome: '', preco: 0, tipo: '', desc: '' }],
    data_pedido: '2025-02-01T03:00:00.000+00:00',
    entregue: false,
    pago: false,
    total: 0
  }]);
  const [command, setCommand] = useState('');

  async function fetchOrders() {
    try {
      const response = await api.get(`order/cmd/${command}`);
      if(response.data[0] !== undefined) setOrders(response.data);
      else setOrders([{
        _id: '',
        cod_mesa: 0,
        cod_comanda: 0,
        produtos: [{ nome: '', preco: 0, tipo: '', desc: '' }],
        data_pedido: '2025-02-01T03:00:00.000+00:00',
        entregue: false,
        pago: false,
        total: 0
      }]);
    } catch (e) {
      console.log('Error: ' + e);
    }
  }

  async function orderComplete(orders: IPedido[]) {
    orders.map(async order =>{
      const updatedOrder: IPedido = { ...order, pago: true }
      try {
        await api.put(`/order/${order._id}`, updatedOrder)
      } catch (e) {
        console.log("ERROR: " + e)
      }
    })
    setOrders([{
      _id: '',
      cod_mesa: 0,
      cod_comanda: 0,
      produtos: [{ nome: '', preco: 0, tipo: '', desc: '' }],
      data_pedido: '2025-02-01T03:00:00.000+00:00',
      entregue: false,
      pago: false,
      total: 0
    }])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          mode="contained"
          onPress={() => router.navigate("/")}
          style={styles.backButton}
          labelStyle={styles.buttonLabel}
        >
          Voltar
        </Button>
        <Text style={styles.title}>Pagamento</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter command number"
          keyboardType="numeric"
          value={command}
          onChangeText={setCommand}
        />
        <Button
          mode="contained"
          onPress={fetchOrders}
          style={styles.searchButton}
          labelStyle={styles.buttonLabel}
        >
          Procurar
        </Button>
      </View>

{orders[0]._id !== '' && (
      <ScrollView style={styles.ordersContainer}>
        {orders.map((order) => (
          <OrderCard key={order._id} item={order} />
        ))}
      </ScrollView>
    )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: R$ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
        </Text>
      </View>

      <Button
          mode="contained"
          onPress={()=>orderComplete(orders)}
          style={styles.searchButton}
          labelStyle={styles.buttonLabel}
        >
          Finalizar
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    backgroundColor: '#2c3e50',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  buttonLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchButton: {
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
  },
  ordersContainer: {
    padding: 20,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'right',
  },
});