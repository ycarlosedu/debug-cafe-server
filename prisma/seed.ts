import { PrismaClient, USER_TYPE } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const userTypes = Object.values(USER_TYPE);
  userTypes.forEach(async (userType) => {
    const hashedPassword = await bcrypt.hash(userType, 10);
    await prisma.userTypePasswords.create({
      data: {
        userType,
        password: hashedPassword,
      },
    });
  });
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
