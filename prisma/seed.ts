import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание тестовых товаров
  const products = [
    {
      name: 'Футболка классическая',
      code: 'RV-M-001',
      price: 5990,
      description: 'Премиальная футболка из высококачественного хлопка',
      category: 'Мужское',
      fit: 'Обычная',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['#006341', '#FFFFFF']),
    },
    {
      name: 'Футболка оверсайз',
      code: 'RV-M-002',
      price: 6490,
      description: 'Свободная футболка оверсайз',
      category: 'Мужское',
      fit: 'Свободная',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['#006341', '#FFFFFF']),
    },
    {
      name: 'Платье',
      code: 'RV-W-001',
      price: 8990,
      description: 'Элегантное платье',
      category: 'Женское',
      fit: 'Узкая',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['#006341', '#FFFFFF']),
    },
    {
      name: 'VRT SHEERT 001',
      code: 'RV-W-002',
      price: 6800,
      description: 'Женская футболка',
      category: 'Женское',
      fit: 'Обычная',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['#006341', '#FFFFFF']),
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        fit: product.fit,
        sizes: product.sizes,
        colors: product.colors,
      },
      create: product,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

