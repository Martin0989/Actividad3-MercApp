const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ id: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id de la categoría debe ser numérico'
      });
    }

    const category = await Category.findOne({ id });

    if (!category) {
      return res.status(404).json({
        message: 'Categoría no encontrada'
      });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const lastCategory = await Category.findOne().sort({ id: -1 });

    const newCategory = await Category.create({
      id: lastCategory ? lastCategory.id + 1 : 1,
      name: req.body.name,
      description: req.body.description || ''
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id de la categoría debe ser numérico'
      });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { id },
      {
        name: req.body.name,
        description: req.body.description || ''
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: 'Categoría no encontrada'
      });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'El id de la categoría debe ser numérico'
      });
    }

    const deletedCategory = await Category.findOneAndDelete({ id });

    if (!deletedCategory) {
      return res.status(404).json({
        message: 'Categoría no encontrada'
      });
    }

    res.status(200).json({
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
