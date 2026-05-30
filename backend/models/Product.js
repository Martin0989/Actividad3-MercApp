const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

module.exports = mongoose.model('Product', productSchema);
