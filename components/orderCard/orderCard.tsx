import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IPedido } from "../interfaces";

function getFormattedDateTime(dateString: string): string {
  try {
    const data = new Date(dateString);
    if (isNaN(data.getTime())) {
      throw new Error("Invalid date");
    }
    const hours = String(data.getUTCHours()).padStart(2, '0');
    const minutes = String(data.getUTCMinutes()).padStart(2, '0');
    const fullTime = `${hours}:${minutes}`;
    const day = String(data.getUTCDate()).padStart(2, '0');
    const month = String(data.getUTCMonth() + 1).padStart(2, '0');
    const year = data.getUTCFullYear();
    const fullDate = `${day}/${month}/${year}`;

    return `${fullTime} - ${fullDate}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export default function OrderCard({ item }: { item: IPedido }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{getFormattedDateTime(item.data_pedido)}</Text>
        <Text style={styles.table}>Table: {item.cod_mesa}</Text>
      </View>

      <View style={styles.orderItems}>
        <Text style={styles.orderTitle}>Order Items:</Text>
        {item.produtos.map((produto, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemName}>{produto.nome}</Text>
            <Text style={styles.itemPrice}>R$ {produto.preco.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Subtotal: R$ {item.total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  table: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'right',
  },
});