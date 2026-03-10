import { Router } from 'express';
import { CartManager } from '../CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/carts/:cid
 * Retorna el carrito con productos poblados (referencia a Product).
 */
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid, true);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body?.quantity ?? 1;
    const cart = await cartManager.addProductToCart(cid, pid, quantity);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** DELETE /api/carts/:cid/products/:pid - Eliminar un producto del carrito */
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.removeProductFromCart(cid, pid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** PUT /api/carts/:cid - Actualizar todos los productos del carrito (array en req.body) */
router.put('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.updateCartProducts(req.params.cid, req.body.products ?? req.body);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** PUT /api/carts/:cid/products/:pid - Actualizar solo cantidad del producto (req.body.quantity) */
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body?.quantity ?? req.body;
    const cart = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** DELETE /api/carts/:cid - Vaciar el carrito (eliminar todos los productos) */
router.delete('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.clearCart(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
