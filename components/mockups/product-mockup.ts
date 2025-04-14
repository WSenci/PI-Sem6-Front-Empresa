import { IProduto } from "../interfaces";

export const mockupProduto: IProduto[] = [
    {_id: '1', nome: 'X-Burguer', preco: 20, tipo: 'Lanche', desc: 'Pão, hamburguer, queijo, alface, mostarda e ketchup', img: 'Uma imagem random'},
    {_id: '2', nome: 'Hamburguer', preco: 25, tipo: 'Lanche', desc: 'Pão, hamburguer, queijo, mostarda e ketchup', img: 'Uma imagem random'},
     {_id: '3', nome: 'Pizza', preco: 15, tipo: 'Lanche', desc: 'Pão, salcicha, mostarda, ketchup', img: 'Uma imagem random'}, 
     {_id: '4', nome: 'Coca-Cola', preco: 5, tipo: 'Bebidas', desc: 'Água com açucar', img: 'Uma imagem random'},
     {_id: '5', nome: 'Água', preco: 2.50, tipo: 'Bebidas', desc: 'Água', img: 'Uma imagem random'},
     {_id: '6', nome: 'Batata frita', preco: 10, tipo: 'Acompanhamento', desc: 'Pão, hamburguer, queijo, mostarda e ketchup', img: 'Uma imagem random'}
    ]