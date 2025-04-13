import { IPedido } from "../interfaces"

const mockupOrder2 = [
    { id: 1, items: ['X-Burguer', 'Coca-Cola', 'X-Burguer'] },
    { id: 2, items: ['Pizza', 'Suco de Laranja', 'Pizza', 'Pizza'] },
    { id: 3, items: ['Batata Frita', 'Hambúrguer', 'Coca-Cola'] },
    { id: 4, items: ['Batata Frita', 'Hambúrguer', 'Coca-Cola'] },
    { id: 5, items: ['Batata Frita', 'Hambúrguer', 'Hambúrguer', 'Coca-Cola'] },
    { id: 6, items: ['Batata Frita', 'Coca-Cola'] }
]

export const mockupOrder: IPedido[] = [
    {
        _id: '67be656f821074d98495c259',
        cod_mesa: 5,
        cod_comanda: 2,
        produtos: 
        [
            {nome: 'X-burger', preco: 20, tipo:'Lanche', desc:'Pão de hamburger, carne de hamburger 90g, queijo mussarela, molho da casa e alface.'},
            {nome: 'Batata Frita Média', preco: 8, tipo:'Acompanhamento', desc:'Porção média de batata frita', comment:'Adicionar cheddar'}
        ],
        data_pedido: '2025-02-25T03:00:00.000+00:00',
        entregue: false,
        pago: false,
        total: 28
    }
]