import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { IProduto } from '../../components/interfaces';
import FormProduct from '../../components/forms/form-product/form-product';
import React, { useEffect, useState } from 'react';
import api from '../../helpers/axios';

async function getProducts() {
  const response = await api.get('/product');
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

async function postProduct(produto: any) {
  try {
    const response = await api.post('/product', produto);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
  }
}

async function putProduct(produto: any) {
  try {
    const response = await api.put(`/product/${produto._id}`, produto);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
  }
}

export default function Product() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [name, onChangeName] = useState('');
  const [price, onChangePrice] = useState('');
  const [type, onChangeType] = useState('');
  const [desc, onChangeDesc] = useState('');
  const [img, onChangeImg] = useState('');
  const [id, onChangeId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isEditing = !!id;

  function resetForm() {
    onChangeId('');
    onChangeName('');
    onChangePrice('');
    onChangeType('');
    onChangeDesc('');
    onChangeImg('');
  }

  function handleCreateProduct() {
    const novoProduto = {
      nome: name,
      preco: Number(price),
      tipo: type,
      desc: desc,
      img: img,
    };

    postProduct(novoProduto).then(() => {
      alert('Produto criado com sucesso!');
      resetForm();
      getProducts().then(setProdutos);
    });
  }

  function handleUpdateProduct() {
    const produtoAtualizado = {
      _id: id,
      nome: name,
      preco: Number(price),
      tipo: type,
      desc: desc,
      img: img,
    };

    putProduct(produtoAtualizado).then(() => {
      alert('Produto atualizado com sucesso!');
      setModalVisible(false);
      resetForm();
      getProducts().then(setProdutos);
    });
  }

  useEffect(() => {
    async function fetchProdutos() {
      const data = await getProducts();
      setProdutos(data);
    }

    fetchProdutos();
  }, []);

  const listaProdutos = produtos.map((produto) => (
    <View key={produto._id} style={styles.card}>
      <Text style={styles.cardText}>Nome: {produto.nome}</Text>
      <Text style={styles.cardText}>Preço: R$ {produto.preco}</Text>
      <Text style={styles.cardText}>Tipo: {produto.tipo}</Text>
      <Text style={styles.cardText}>Descrição: {produto.desc}</Text>
      <Text style={styles.cardText}>Imagem: {produto.img}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setModalVisible(true);
          onChangeId(produto._id);
          onChangeName(produto.nome);
          onChangePrice(produto.preco.toString());
          onChangeType(produto.tipo);
          onChangeDesc(produto.desc);
          onChangeImg(produto.img);
        }}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      <FormProduct
        name={name}
        price={price}
        type={type}
        desc={desc}
        img={img}
        onChangeName={onChangeName}
        onChangeDesc={onChangeDesc}
        onChangeImg={onChangeImg}
        onChangePrice={onChangePrice}
        onChangeType={onChangeType}
        onSubmit={handleCreateProduct}
        submitLabel={'Adicionar'}
      />

      <ScrollView style={styles.list}>{listaProdutos}</ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <FormProduct
          name={name}
          price={price}
          type={type}
          desc={desc}
          img={img}
          onChangeName={onChangeName}
          onChangeDesc={onChangeDesc}
          onChangeImg={onChangeImg}
          onChangePrice={onChangePrice}
          onChangeType={onChangeType}
          onSubmit={handleUpdateProduct}
          submitLabel={'Editar'}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2b138',
    padding: 20,
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
});
