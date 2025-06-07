import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

interface Props {
  _id?: string
  name: string
  price: string
  type: string
  desc: string
  img: string
  onChangeName: (text: string) => void
  onChangePrice: (text: string) => void
  onChangeType: (text: string) => void
  onChangeDesc: (text: string) => void
  onChangeImg: (text: string) => void
  onSubmit: () => void
  submitLabel: string
}

export default function FormProduct(props: Props)
{
    return(
      <View style={styles.form}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} onChangeText={props.onChangeName} value={props.name} />

      <Text style={styles.label}>Preço</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={props.onChangePrice} value={props.price} />

      <Text style={styles.label}>Tipo</Text>
      <TextInput style={styles.input} onChangeText={props.onChangeType} value={props.type} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} onChangeText={props.onChangeDesc} value={props.desc} />

      <Text style={styles.label}>Imagem (URL)</Text>
      <TextInput style={styles.input} onChangeText={props.onChangeImg} value={props.img} />

      <TouchableOpacity style={styles.button} onPress={props.onSubmit}>
        <Text style={styles.buttonText}>{props.submitLabel}</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2b138',
    padding: 20,
  },
  form: {
    flex: 1,
    padding: 10,
    backgroundColor: '#c43225',
    borderRadius: 10,
    marginRight: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#f29e38',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  list: {
    flex: 2,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: {
    color: '#000',
  },
  editButton: {
    backgroundColor: '#f29e38',
    padding: 6,
    marginTop: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  editText: {
    color: '#000',
    fontWeight: 'bold',
  },
})
