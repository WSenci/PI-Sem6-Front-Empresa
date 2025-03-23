import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import { SButtonItemCozinha } from '../../components/styled-button';

import { mockupOrder } from '../../components/mockups/orders-mockup';
import { IProdutoCom } from '../../components/interfaces';

/*
Pensar em como o sistema vai atualizar os pedidos feitos pelo cardapio, quando forem feitos

Trocar cor do item já realizado pela cozinha?

*/

export default function KitchenOrdersScreen() {
  const [orders, setOrders] = useState(mockupOrder);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderItem, setOrderItem] = useState<IProdutoCom>({ nome: '', preco: 0, tipo: '', comment: '', desc: '' })

  function getHourFromDate(date: Date): string {
    return date.toISOString().split('T')[1].split('.')[0]
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.homeButton} onPress={() => router.navigate("/")}>
        <Text style={styles.homeButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Pedidos na Cozinha</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {orders.map((order) => (

          <View key={order._id} style={styles.orderCard}>

            <Text style={styles.orderNumber}>{getHourFromDate(order.data_pedido)}</Text>
            {order.produtos.map((item) => (

              <View>
                <SButtonItemCozinha item={item} onClick={() => {
                  setModalVisible(true)
                  setOrderItem(item)
                }} />
              </View>

            ))}
          </View>

        ))}
      </ScrollView>


      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => { }} >
              <View style={styles.modalContent}>

                <Text style={styles.modalTitle}>{orderItem.nome}</Text>
                <Text style={styles.modalDescription}>{orderItem.desc}</Text>
                <Text style={[styles.modalDescription, {fontWeight:'bold'}]}>{orderItem.comment}</Text>

                <View style={{ flex: 1, flexDirection:'row', justifyContent:'space-evenly', width: '60%'}}>
                  
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={{ color: 'red', fontSize: 20, backgroundColor: '#F5F5F5', borderRadius: 8 }}> X </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20, alignSelf: 'flex-start' },
  homeButtonText: { color: 'white', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  orderCard: { backgroundColor: 'white', padding: 15, marginHorizontal: 10, borderRadius: 8, elevation: 3, minWidth: 200 },
  orderNumber: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, alignSelf:'center'},
  itemText: { fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalDescription: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
});