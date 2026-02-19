import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager();

// Home: lista de todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products, title: 'Home' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// RealTime Products: misma lista pero con actualización vía WebSocket
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products, title: 'Productos en tiempo real' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
