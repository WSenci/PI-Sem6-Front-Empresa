import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

const initialOrders = [
  { id: 1, total: 'R$ 25,00', status: 'Pendente', paymentMethod: 'Dinheiro', items: ['X-Burguer', 'Coca-Cola'] },
  { id: 2, total: 'R$ 40,00', status: 'Concluído', paymentMethod: 'Pix', items: ['Pizza', 'Suco de Laranja'] }
];

export default function PaymentScreen() {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleOrderItems = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const toggleStatus = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: order.status === 'Pendente' ? 'Concluído' : 'Pendente' } : order
    ));
  };

  const openPaymentModal = (id) => {
    setSelectedOrder(id);
    setModalVisible(true);
  };

  const changePaymentMethod = (method) => {
    setOrders(orders.map(order => 
      order.id === selectedOrder ? { ...order, paymentMethod: method } : order
    ));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.navigate("/")}> 
        <Text style={styles.homeButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Pagamentos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <TouchableOpacity onPress={() => toggleOrderItems(item.id)}>
              <Text style={styles.orderText}>Pedido {item.id}</Text>
            </TouchableOpacity>
            <Text style={styles.totalText}>{item.total}</Text>
            <TouchableOpacity onPress={() => toggleStatus(item.id)}>
              <Text style={[styles.statusText, item.status === 'Concluído' ? styles.completed : styles.pending]}>
                {item.status}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openPaymentModal(item.id)}>
              <Text style={styles.paymentText}>{item.paymentMethod}</Text>
            </TouchableOpacity>
            {expandedOrder === item.id && (
              <View style={styles.itemsContainer}>
                {item.items.map((i, index) => (
                  <Text key={index} style={styles.itemText}>- {i}</Text>
                ))}
              </View>
            )}
          </View>
        )}
      />
      
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o método de pagamento</Text>
            {['Dinheiro', 'Pix', 'Crédito', 'Débito'].map((method) => (
              <TouchableOpacity key={method} onPress={() => changePaymentMethod(method)}>
                <Text style={styles.modalOption}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20, alignSelf: 'flex-start' },
  homeButtonText: { color: 'white', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  orderCard: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
  orderText: { fontSize: 18, fontWeight: 'bold' },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginTop: 5 },
  statusText: { fontSize: 16, padding: 5, borderRadius: 5, textAlign: 'center', marginTop: 5 },
  completed: { backgroundColor: '#27ae60', color: 'white' },
  pending: { backgroundColor: '#d9534f', color: 'white' },
  paymentText: { fontSize: 16, textDecorationLine: 'underline', color: '#3498db', marginTop: 5 },
  itemsContainer: { marginTop: 10, padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 },
  itemText: { fontSize: 14 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 8, width: 300, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalOption: { fontSize: 16, padding: 10, textAlign: 'center' },
  modalCancel: { marginTop: 10, fontSize: 16, color: 'red' },
});
