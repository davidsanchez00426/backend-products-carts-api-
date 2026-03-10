import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';
import { CartManager } from '../CartManager.js';

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

// Home: lista de todos los productos (sin paginación, para compatibilidad)
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products, title: 'Home' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Productos con paginación (vista index)
router.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const category = req.query.category;
    const status = req.query.status;
    const baseUrl = `${req.protocol}://${req.get('host')}/products`;
    const result = await productManager.getProductsPaginated(
      { limit, page, sort, category, status },
      baseUrl
    );
    res.render('index', {
      ...result,
      title: 'Productos',
      query: req.query,
      sortAsc: sort === 'asc',
      sortDesc: sort === 'desc',
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Detalle de un producto + botón agregar al carrito
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetail', { product, title: product.title });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Carrito específico (solo productos de ese carrito, poblados)
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid, true);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    const products = (cart.products || []).map((item) => ({
      ...item,
      product: item.product
        ? { ...item.product, id: (item.product._id || item.product).toString() }
        : null,
    }));
    res.render('cart', {
      cart: { ...cart, products },
      cartId: cart.id || cart._id,
      title: 'Carrito',
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// RealTime Products (WebSocket)
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products, title: 'Productos en tiempo real' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
