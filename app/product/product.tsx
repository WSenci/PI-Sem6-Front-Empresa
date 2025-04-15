import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { mockupProduto } from '../../components/mockups/product-mockup'

const [name, onChangeName] = useState('')
const [price, onChangePrice] = useState('')
const [type, onChangeType] = useState('')
const [desc, onChangeDesc] = useState('')
const [img, onChangeImg] = useState('')

const adicionar = ()=>{mockupProduto.push({_id: '1', nome: name, preco: Number(price), tipo: type, desc: desc, img: img})}

const listaProdutos = mockupProduto.map(produto => (
    <><Text>{produto.nome}</Text><Text>{produto.preco}</Text><Text>{produto.tipo}</Text><Text>{produto.desc}</Text><Text>{produto.img}</Text><TouchableOpacity onPress={}>Editar</TouchableOpacity></>

))

export default function Product()
{
 return(
    <View>
        <View>
            <Text></Text>
            <TextInput onChangeText={onChangeName}></TextInput>
            <Text></Text>
            <TextInput onChangeText={onChangePrice}></TextInput>
            <Text></Text>
            <TextInput onChangeText={onChangeType}></TextInput>
            <Text></Text>
            <TextInput onChangeText={onChangeDesc}></TextInput>
            <Text></Text>
            <TextInput onChangeText={onChangeImg}></TextInput>
            <TouchableOpacity onPress={}></TouchableOpacity>   

        </View>
        <View>
           {
            listaProdutos
           }            
        </View>
    </View>
 0)
}