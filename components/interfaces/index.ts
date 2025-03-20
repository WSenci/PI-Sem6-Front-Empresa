import { ObjectId } from 'mongodb'

export interface IProduto {
    _id: ObjectId
    nome: string
    preco: number
    tipo: string
    desc?: string
    img?: string
}

export interface IProdutoCom {
    nome: string
    preco: number
    tipo: string
    desc?: string
    img?: string // não?
    comment?: string
}

export interface IPedido {
    _id: ObjectId
    cod_mesa: number
    cod_comanda: number
    produtos: IProdutoCom[] // img? id?
    data_pedido: Date
    entregue: boolean
    pago: boolean
    total:number
}