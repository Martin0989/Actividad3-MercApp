const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

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

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id del producto debe ser numérico'
      });
    }

    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newProductData = {
      id: lastProduct ? lastProduct.id + 1 : 1,
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl,
      categoryId: Number(req.body.categoryId),
      stock: Number(req.body.stock)
    };

    const errors = validateProduct(newProductData);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors
      });
    }

    const newProduct = await Product.create(newProductData);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id del producto debe ser numérico'
      });
    }

    const updatedProductData = {
      id,
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl,
      categoryId: Number(req.body.categoryId),
      stock: Number(req.body.stock)
    };

    const errors = validateProduct(updatedProductData);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      updatedProductData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id del producto debe ser numérico'
      });
    }

    const currentProduct = await Product.findOne({ id });

    if (!currentProduct) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    const updatedProductData = {
      ...currentProduct.toObject(),
      ...req.body,
      id,
      price: req.body.price !== undefined ? Number(req.body.price) : currentProduct.price,
      categoryId: req.body.categoryId !== undefined ? Number(req.body.categoryId) : currentProduct.categoryId,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : currentProduct.stock
    };

    const errors = validateProduct(updatedProductData);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      updatedProductData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id del producto debe ser numérico'
      });
    }

    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
