require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const products = require('../data/products-seed.json');

const categories = [
  {
    id: 1,
    name: 'Tecnología',
    description: 'Productos tecnológicos como laptops, mouse, teclados y accesorios.'
  },
  {
    id: 2,
    name: 'Oficina',
    description: 'Productos para oficina, escritorio y espacios de trabajo.'
  },
  {
    id: 3,
    name: 'Ropa',
    description: 'Prendas de vestir y artículos deportivos.'
  },
  {
    id: 4,
    name: 'Deportes',
    description: 'Artículos deportivos para entrenamiento y recreación.'
  }
];

const seedAtlas = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('No existe la variable MONGODB_URI en backend/.env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conectado a MongoDB Atlas');

    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('Datos anteriores eliminados');

    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log('Categorías insertadas:', categories.length);
    console.log('Productos insertados:', products.length);

    await mongoose.disconnect();

    console.log('Carga finalizada correctamente');
  } catch (error) {
    console.error('Error al cargar datos:', error.message);
    process.exit(1);
  }
};

seedAtlas();
