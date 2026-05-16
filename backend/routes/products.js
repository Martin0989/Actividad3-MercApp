const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const productsPath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateProduct = (product) => {
  const errors = [];

  if (!product.name || typeof product.name !== 'string') {
    errors.push('El nombre es obligatorio.');
  }

  if (!product.description || typeof product.description !== 'string') {
    errors.push('La descripción es obligatoria.');
  }

  if (typeof product.price !== 'number' || product.price <= 0) {
    errors.push('El precio debe ser numérico y mayor a 0.');
  }

  if (!product.imageUrl || !isValidUrl(product.imageUrl)) {
    errors.push('La URL de imagen debe ser válida.');
  }

  if (typeof product.categoryId !== 'number' || product.categoryId <= 0) {
    errors.push('La categoría es obligatoria.');
  }

  if (typeof product.stock !== 'number' || product.stock < 0) {
    errors.push('El stock debe ser numérico y mayor o igual a 0.');
  }

  return errors;
};

router.get('/', (req, res) => {
  const products = readProducts();
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'El id del producto debe ser numérico'
    });
  }

  const products = readProducts();
  const product = products.find(item => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const products = readProducts();

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(item => item.id)) + 1 : 1,
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    imageUrl: req.body.imageUrl,
    categoryId: Number(req.body.categoryId),
    stock: Number(req.body.stock)
  };

  const errors = validateProduct(newProduct);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors
    });
  }

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'El id del producto debe ser numérico'
    });
  }

  const products = readProducts();
  const index = products.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  const updatedProduct = {
    id,
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    imageUrl: req.body.imageUrl,
    categoryId: Number(req.body.categoryId),
    stock: Number(req.body.stock)
  };

  const errors = validateProduct(updatedProduct);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors
    });
  }

  products[index] = updatedProduct;
  writeProducts(products);

  res.status(200).json(updatedProduct);
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'El id del producto debe ser numérico'
    });
  }

  const products = readProducts();
  const index = products.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  const currentProduct = products[index];

  const updatedProduct = {
    ...currentProduct,
    ...req.body,
    id,
    price: req.body.price !== undefined ? Number(req.body.price) : currentProduct.price,
    categoryId: req.body.categoryId !== undefined ? Number(req.body.categoryId) : currentProduct.categoryId,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : currentProduct.stock
  };

  const errors = validateProduct(updatedProduct);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors
    });
  }

  products[index] = updatedProduct;
  writeProducts(products);

  res.status(200).json(updatedProduct);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'El id del producto debe ser numérico'
    });
  }

  const products = readProducts();
  const productExists = products.some(item => item.id === id);

  if (!productExists) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  const filteredProducts = products.filter(item => item.id !== id);
  writeProducts(filteredProducts);

  res.status(200).json({
    message: 'Producto eliminado correctamente'
  });
});

module.exports = router;