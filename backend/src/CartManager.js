import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CARTS_PATH = path.join(__dirname, '..', 'data', 'carts.json');

export class CartManager {
  constructor() {
    this.path = CARTS_PATH;
  }

  async #readCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(this.path, '[]', 'utf-8');
        return [];
      }
      throw err;
    }
  }

  async #writeCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
  }

  #generateId(carts) {
    if (carts.length === 0) return 1;
    const maxId = Math.max(...carts.map((c) => (typeof c.id === 'number' ? c.id : Number(c.id) || 0)));
    return maxId + 1;
  }

  async createCart() {
    const carts = await this.#readCarts();
    const id = this.#generateId(carts);
    const newCart = { id, products: [] };
    carts.push(newCart);
    await this.#writeCarts(carts);
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.#readCarts();
    const cart = carts.find((c) => String(c.id) === String(cid));
    return cart ?? null;
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const carts = await this.#readCarts();
    const cartIdx = carts.findIndex((c) => String(c.id) === String(cid));
    if (cartIdx === -1) return null;

    const cart = carts[cartIdx];
    const productId = typeof pid === 'number' ? pid : (Number(pid) || String(pid));
    const qty = Math.max(1, Math.floor(Number(quantity) || 1));

    const existing = cart.products.find((p) => String(p.product) === String(pid));
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.products.push({ product: productId, quantity: qty });
    }

    await this.#writeCarts(carts);
    return cart;
  }
}
