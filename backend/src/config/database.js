import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    throw err;
  }
}
