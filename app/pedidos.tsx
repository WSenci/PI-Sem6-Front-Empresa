import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';

const initialOrders = [
  { id: 1, items: ['X-Burguer', 'Coca-Cola', 'X-Burguer'] },
  { id: 2, items: ['Pizza', 'Suco de Laranja', 'Pizza', 'Pizza'] },
  { id: 3, items: ['Batata Frita', 'Hambúrguer', 'Coca-Cola'] },
  { id: 4, items: ['Batata Frita', 'Hambúrguer', 'Coca-Cola'] },
  { id: 5, items: ['Batata Frita', 'Hambúrguer','Hambúrguer', 'Coca-Cola'] },
  { id: 6, items: ['Batata Frita','Coca-Cola'] }
];

export default function KitchenOrdersScreen() {
  const [orders, setOrders] = useState(initialOrders);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.navigate("/")}> 
        <Text style={styles.homeButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Pedidos na Cozinha</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderNumber}>Pedido {order.id}</Text>
            {order.items.map((item, index) => (
              <Text key={index} style={styles.itemText}>{item}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20, alignSelf: 'flex-start' },
  homeButtonText: { color: 'white', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  orderCard: { backgroundColor: 'white', padding: 15, marginHorizontal: 10, borderRadius: 8, elevation: 3, minWidth: 200 },
  orderNumber: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemText: { fontSize: 16 },
});