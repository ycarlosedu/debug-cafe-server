import { ProductCategory } from '@prisma/client';

type Category = Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>;

export enum CATEGORY {
  HOT_COFFEE = 'Cafés Quentes',
  ICED_COFFEE = 'Cafés Gelados',
  SALTY = 'Salgados',
  SWEET = 'Doces',
  JUICES = 'Sucos',
}

export const categories: Category[] = [
  {
    name: CATEGORY.HOT_COFFEE,
    image:
      'https://hypescience.com/wp-content/uploads/2016/06/bebidas-cafe-muito-quente-cancet.jpg',
  },
  {
    name: CATEGORY.ICED_COFFEE,
    image:
      'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/04/14/1631073624-dia-mundial-do-cafe-cafe-gelado.jpg',
  },
  {
    name: CATEGORY.SALTY,
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-coxinha.jpg',
  },
  {
    name: CATEGORY.SWEET,
    image:
      'https://www.phoenixmag.com/wp-content/uploads/2022/06/az-chimney-cakes-featured-image-1280x853.jpg',
  },
  {
    name: CATEGORY.JUICES,
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-suco-de-laranja.jpg',
  },
];
