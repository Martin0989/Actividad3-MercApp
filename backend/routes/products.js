const express = require('express');
const router = express.Router();

const products = require('../data/products.json');

router.get('/', (req, res) => {
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'El id del producto debe ser numérico'
    });
  }

  const product = products.find(item => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }

  res.status(200).json(product);
});

module.exports = router;