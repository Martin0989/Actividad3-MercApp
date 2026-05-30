const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
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
      default: ''
    }
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

module.exports = mongoose.model('Category', categorySchema);
