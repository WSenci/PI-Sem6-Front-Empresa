export interface IProduto {
    _id: string
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
    comment?: string
}

export interface IPedido {
    _id: string
    cod_mesa: number
    cod_comanda: number
    produtos: IProdutoCom[]
    data_pedido: string
    entregue: boolean
    pago: boolean
    total: number
}

export interface IPedidos {
    items: IPedido[]
}