import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager();

/**
 * GET /api/products
 * Query params: limit (default 10), page (default 1), sort (asc|desc), category, status (filtros)
 * Respuesta: { status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink }
 */
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const sort = req.query.sort;
    let category = req.query.category;
    let status = req.query.status;
    // query (opcional): filtro. Si viene "category:valor" o "status:valor" se aplica
    const queryParam = req.query.query;
    if (queryParam && typeof queryParam === 'string') {
      if (queryParam.startsWith('category:')) category = queryParam.slice(9);
      else if (queryParam.startsWith('status:')) status = queryParam.slice(7);
      else category = queryParam; // por defecto filtrar por categoría
    }
    const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;
    const result = await productManager.getProductsPaginated(
      { limit, page, sort, category, status },
      baseUrl
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ status: 'error', payload: null, error: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    const io = req.app.get('io');
    if (io) {
      const products = await productManager.getProducts();
      io.emit('products', products);
    }
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const product = await productManager.updateProduct(req.params.pid, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const io = req.app.get('io');
    if (io) {
      const products = await productManager.getProducts();
      io.emit('products', products);
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
