import { PrismaClient, USER_TYPE } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { categories } from '../mock/categories';
import { products } from '../mock/products';

const prisma = new PrismaClient();

const createPasswords = async () => {
  return Object.values(USER_TYPE).map(async (userType) => {
    const hashedPassword = await bcrypt.hash(userType, 10);
    await prisma.userTypePasswords.deleteMany({
      where: {
        userType,
      },
    });
    return prisma.userTypePasswords.create({
      data: {
        userType,
        password: hashedPassword,
      },
    });
  });
};

const createCategories = async () => {
  return categories.map(async (category) => {
    return prisma.productCategory.create({
      data: category,
    });
  });
};

const createProducts = async () => {
  return products.map(async (fullProduct) => {
    const { categories, ...product } = fullProduct;
    const categoriesIds = await prisma.productCategory.findMany({
      select: {
        id: true,
      },
      where: {
        name: {
          in: categories,
        },
      },
    });

    return prisma.product.create({
      data: {
        ...product,
        categories: {
          create: categoriesIds.map((category) => ({
            productCategoryId: category.id,
          })),
        },
      },
    });
  });
};

async function main() {
  await createPasswords();

  await createCategories();

  await createProducts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
