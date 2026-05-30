const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('La variable MONGODB_URI no está definida');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Conexión a MongoDB Atlas establecida correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
