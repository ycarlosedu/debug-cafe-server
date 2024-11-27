import { Product } from '@prisma/client';
import { CATEGORY } from './categories';

type SimpleProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & {
  categories: string[];
};

export const products: SimpleProduct[] = [
  {
    name: 'Cafés Expresso',
    image:
      'https://hypescience.com/wp-content/uploads/2016/06/bebidas-cafe-muito-quente-cancet.jpg',
    price: 5.25,
    description: 'Café expresso feito com grãos selecionados',
    categories: [CATEGORY.HOT_COFFEE],
  },
  {
    name: 'Café Americano',
    image:
      'https://srdelights.com/cdn/shop/files/AmericanCoffee.png?v=1718024474',
    price: 4.99,
    description: 'Café americano feito com grãos selecionados',
    categories: [CATEGORY.HOT_COFFEE],
  },
  {
    name: 'Café Latte',
    image:
      'https://www.bongusto.ind.br/wp-content/uploads/2023/06/2023-06-08-foto-cafe-com-leite.jpg',
    price: 7.5,
    description: 'Café latte feito com leite vaporizado e café expresso',
    categories: [CATEGORY.HOT_COFFEE],
  },
  {
    name: 'Café com Leite',
    image:
      'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/WXHSLJM2XZNVDLP7OTLDNMYNVM.jpg',
    price: 6.75,
    description: 'Café com leite quentinho feito na hora',
    categories: [CATEGORY.HOT_COFFEE],
  },
  {
    name: 'Café Mocha',
    image: 'https://osterstatic.reciperm.com/webp/10442.webp',
    price: 9.99,
    description: 'Café mocha com leite vaporizado e calda de chocolate',
    categories: [CATEGORY.HOT_COFFEE],
  },
  {
    name: 'Café Shake',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCHQmEgxGx6iJiw75dJEZpPHJX8AiZzfqOjA&s',
    price: 10.29,
    description: 'Café gelado batido com leite e açúcar',
    categories: [CATEGORY.ICED_COFFEE],
  },
  {
    name: 'Café Frappé',
    image:
      'https://www.icafé.com/wp-content/uploads/2024/11/iced-coffee-with-poured-cream-wh.webp',
    price: 9.99,
    description: 'Café frappé com chantilly e calda de chocolate',
    categories: [CATEGORY.ICED_COFFEE],
  },
  {
    name: 'Café Gelado',
    image:
      'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/04/14/1631073624-dia-mundial-do-cafe-cafe-gelado.jpg',
    price: 8.99,
    description: 'Café gelado com chantilly e calda de caramelo',
    categories: [CATEGORY.ICED_COFFEE],
  },
  {
    name: 'Cone de Sorvete',
    image:
      'https://www.phoenixmag.com/wp-content/uploads/2022/06/az-chimney-cakes-featured-image-1280x853.jpg',
    price: 7.5,
    description: 'Sorvete de creme em um cone crocante',
    categories: [CATEGORY.SWEET],
  },
  {
    name: 'Sorvete de Morango',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-sorvete-de-morango.jpg',
    price: 6.5,
    description: 'Sorvete de morango cremoso feito na hora',
    categories: [CATEGORY.SWEET],
  },
  {
    name: 'Bolo de Chocolate',
    image:
      'https://s2-receitas.glbimg.com/wJmq1MqeOZZ-VSLlDxRLdL2zj60=/0x0:1280x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/1/N/aQD0fhQs2qW7qlFw0bTA/bolo-de-chocolate-facil.jpg',
    price: 8.99,
    description: 'Bolo de chocolate com cobertura de brigadeiro',
    categories: [CATEGORY.SWEET],
  },
  {
    name: 'Pão de Queijo',
    image:
      'https://amopaocaseiro.com.br/wp-content/uploads/2022/08/yt-069_pao-de-queijo_receita.jpg',
    price: 2.99,
    description: 'Pão de queijo quentinho com recheio de queijo',
    categories: [CATEGORY.SALTY],
  },
  {
    name: 'Coxinha de Frango',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-coxinha.jpg',
    price: 3.5,
    description: 'Coxinha de frango com massa crocante e recheio cremoso',
    categories: [CATEGORY.SALTY],
  },
  {
    name: 'Pastel Assado de Frango',
    image:
      'https://www.comidaereceitas.com.br/wp-content/uploads/2021/07/pastel_assado_facil.jpg',
    price: 4.5,
    description: 'Pastel assado de frango com massa crocante e recheio cremoso',
    categories: [CATEGORY.SALTY],
  },
  {
    name: 'Suco de Laranja',
    image:
      'https://s2-oglobo.glbimg.com/YyUC_KRFzV2nRNd8OVaN2O6iBuo=/0x0:5257x3505/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/o/M/S3B6yZQYOrjtTTBNEMLQ/copo-de-suco-de-laranja-e-uma-pessoa-espremendo-uma-laranja-nele.jpg',
    price: 5.99,
    description: 'Suco de laranja natural feito na hora',
    categories: [CATEGORY.JUICES],
  },
  {
    name: 'Suco de Limão',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-suco-de-limao.jpg',
    price: 4.99,
    description: 'Suco de limão natural feito na hora',
    categories: [CATEGORY.JUICES],
  },
  {
    name: 'Suco de Morango',
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-suco-de-morango.jpg',
    price: 6.99,
    description: 'Suco de morango natural feito na hora',
    categories: [CATEGORY.JUICES],
  },
];
