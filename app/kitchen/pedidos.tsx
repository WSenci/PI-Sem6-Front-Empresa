import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-paper'
import { IPedido, IProdutoCom } from '../../components/interfaces'
import api from '../../helpers/axios'

export default function KitchenOrdersScreen() {
  const [orders, setOrders] = useState<IPedido[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [orderItem, setOrderItem] = useState<IProdutoCom>({ nome: '', preco: 0, tipo: '', comment: '', desc: '' })

  function getHourFromDate(date: string): string {
    try {
      const parsedDate = new Date(date)
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date")
      }
      return parsedDate.toTimeString().split(' ')[0]
    } catch (error) {
      console.error("Error extracting time:", error)
      return ""
    }
  }

  function update() {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/pending')
        setOrders(response.data)
      } catch (e) {
        console.log("ERROR: " + e)
      }
    }
    fetchOrders()
  }

  async function orderComplete(order: IPedido) {
    const updatedOrder: IPedido = { ...order, entregue: true }
    try {
      await api.put(`/order/${order._id}`, updatedOrder)
    } catch (e) {
      console.log("ERROR: " + e)
    }

    update()
  }

  useEffect(() => { update() }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          mode="contained"
          onPress={() => router.navigate("/")}
          style={styles.backButton}
          labelStyle={styles.buttonLabel}
        >
          Back
        </Button>
        <Text style={styles.title}>Kitchen Orders</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ordersContainer}>
        {orders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <View style={styles.cardContent}>
              <Text style={styles.orderTime}>{getHourFromDate(order.data_pedido)}</Text>
              {order.produtos.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.itemButton, item.comment ? styles.itemWithComment : null]}
                  onPress={() => {
                    setModalVisible(true)
                    setOrderItem(item)
                  }}
                >
                  <Text style={styles.itemName}>{item.nome}</Text>
                  {item.comment && <Text style={styles.itemComment}>{item.comment}</Text>}
                </TouchableOpacity>
              ))}
              <View style={styles.footer}>
                <Button
                  mode="contained"
                  onPress={()=> orderComplete(order)}
                  style={styles.closeButton}
                  labelStyle={styles.buttonLabel}
                >
                  Finalizar
                </Button>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{orderItem.nome}</Text>
                <Text style={styles.modalDescription}>{orderItem.desc}</Text>
                {orderItem.comment && (
                  <Text style={styles.modalComment}>{orderItem.comment}</Text>
                )}
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                  labelStyle={styles.buttonLabel}
                >
                  Close
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
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
  cardContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  ordersContainer: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 20,
    marginRight: 16,
    borderRadius: 12,
    elevation: 3,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  itemButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemWithComment: {
    backgroundColor: '#fff3cd',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemComment: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  modalComment: {
    fontSize: 16,
    color: '#856404',
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#2c3e50',
    marginTop: 8,
  },
})