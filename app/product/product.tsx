import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'
import { IProduto } from '../../components/interfaces'
import { mockupProduto } from '../../components/mockups/product-mockup'
import FormProduct from '../../components/forms/form-product/form-product'
import React, { useState } from 'react'


export default function Product() 
{
  
  const [produtos, setProdutos] = useState<IProduto[]>(mockupProduto)

      const [name, onChangeName] = useState('')
      const [price, onChangePrice] = useState('')
      const [type, onChangeType] = useState('')
      const [desc, onChangeDesc] = useState('')
      const [img, onChangeImg] = useState('')
      const [modalVisible, setModalVisible] = useState(false);


      const adicionar = () => {
        const novoProduto = {
          _id: String(produtos.length + 1),
          nome: name,
          preco: Number(price),
          tipo: type,
          desc: desc,
          img: img
        }
      
        setProdutos([...produtos, novoProduto])
      }

  const listaProdutos = produtos.map((produto, index) => (
    <View key={index} style={styles.card}>
      <Text style={styles.cardText}>Nome: {produto.nome}</Text>
      <Text style={styles.cardText}>Preço: R$ {produto.preco}</Text>
      <Text style={styles.cardText}>Tipo: {produto.tipo}</Text>
      <Text style={styles.cardText}>Descrição: {produto.desc}</Text>
      <Text style={styles.cardText}>Imagem: {produto.img}</Text>
      <TouchableOpacity style={styles.editButton} onPress={()=>setModalVisible(true)}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  ))

  return (
    <View style={styles.container}>

    <FormProduct name={name} price={price} type={type} desc={desc} img={img} onChangeName={onChangeName} onChangeDesc={onChangeDesc} onChangeImg={onChangeImg} onChangePrice={onChangePrice} onChangeType={onChangeType} onSubmit={adicionar} submitLabel={'Adicionar'} />
        {/* Lista de Produtos */}
        <ScrollView style={styles.list}>
          {listaProdutos}
        </ScrollView>
        <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
          <FormProduct name={name} price={price} type={type} desc={desc} img={img} onChangeName={onChangeName} onChangeDesc={onChangeDesc} onChangeImg={onChangeImg} onChangePrice={onChangePrice} onChangeType={onChangeType} onSubmit={adicionar} submitLabel={'Editar'} />

      </Modal>
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
