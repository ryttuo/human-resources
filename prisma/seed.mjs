import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed departments
  const departments = await prisma.departments.createMany({
    data: [
      { id: 1, name: 'Human Resources' },
      { id: 2, name: 'Engineering' }, 
      { id: 3, name: 'Sales' },
      { id: 4, name: 'Marketing' },
      { id: 5, name: 'Finance' }
    ]
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });