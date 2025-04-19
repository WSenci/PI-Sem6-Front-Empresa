import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { IPedido, IPedidos, IProdutoCom } from "../interfaces";

interface OrderCard {
    item: IPedido
}

export default function OrderCard({item}: {item: IPedido}) {

    function getFormattedDateTime(dateString: string): string {
        try {
          const data = new Date(dateString)
          if (isNaN(data.getTime())) {
            throw new Error("Data inválida")
          }
          const hora = String(data.getUTCHours()).padStart(2, '0')
          const minutos = String(data.getUTCMinutes()).padStart(2, '0')
          const horaCompleta = `${hora}:${minutos}`
          const dia = String(data.getUTCDate()).padStart(2, '0')
          const mes = String(data.getUTCMonth() + 1).padStart(2, '0')
          const ano = data.getUTCFullYear()
          const dataCompleta = `${dia}/${mes}/${ano}`
      
          return `${horaCompleta} - ${dataCompleta}`
        } catch (error) {
          console.error("Erro ao formatar data:", error)
          return ""
        }
      }

    return (
        <View style={styles.card}>
            <Text style={styles.data}>{getFormattedDateTime(item.data_pedido)}</Text>
            <Text style={styles.mesa}>{"Mesa: "}{item.cod_mesa}</Text>
            <Text style={styles.order}>{"Pedido: "}</Text>
            {item.produtos.map((item, index) => (
                <View key={index} >
                    <Text style={styles.order}>{"    "}{item.nome} {" - R$ "} {item.preco}</Text>
                </View>
            ))}
            <Text style={styles.price}>{"Subtotal: R$"} {item.total.toFixed(2)}</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 150,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "flex-start",
        margin: 10,
        elevation: 3,
    },
    data: {
        fontFamily: "arial",
        fontSize: 16,
        fontWeight: "bold",
    },
    mesa: {
        fontFamily: "arial",
        fontSize: 16,
    },
    order: {
        fontFamily: "arial",
        fontSize: 16,
        marginTop: 2,
    },
    price: {
        fontFamily: "arial",
        fontSize: 16,
        color: "green",
        marginTop: 2,
    },
});