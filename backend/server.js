const express = require('express');
const cors = require('cors');

const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API REST de MercApp funcionando correctamente',
    endpoints: {
      health: '/health',
      products: '/api/products',
      productById: '/api/products/:id',
      categories: '/api/categories'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API MercApp funcionando correctamente',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});