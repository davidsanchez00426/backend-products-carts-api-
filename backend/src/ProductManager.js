import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_PATH = path.join(__dirname, '..', 'data', 'products.json');

export class ProductManager {
  constructor() {
    this.path = PRODUCTS_PATH;
  }

  async #readProducts() {
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

  async #writeProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }

  #generateId(products) {
    if (products.length === 0) return 1;
    const maxId = Math.max(...products.map((p) => (typeof p.id === 'number' ? p.id : Number(p.id) || 0)));
    return maxId + 1;
  }

  async getProducts() {
    return this.#readProducts();
  }

  async getProductById(pid) {
    const products = await this.#readProducts();
    const product = products.find((p) => String(p.id) === String(pid));
    if (!product) {
      return null;
    }
    return product;
  }

  async addProduct(productData) {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = productData;

    if (!title || !description || !code || price == null || stock == null || !category) {
      throw new Error('Faltan campos obligatorios: title, description, code, price, stock, category');
    }

    const products = await this.#readProducts();
    const id = this.#generateId(products);
    const newProduct = {
      id,
      title: String(title),
      description: String(description),
      code: String(code),
      price: Number(price),
      status: Boolean(status),
      stock: Number(stock),
      category: String(category),
      thumbnails: Array.isArray(thumbnails) ? thumbnails.map(String) : [],
    };

    products.push(newProduct);
    await this.#writeProducts(products);
    return newProduct;
  }

  async updateProduct(pid, updates) {
    const products = await this.#readProducts();
    const idx = products.findIndex((p) => String(p.id) === String(pid));
    if (idx === -1) return null;

    const { id, ...rest } = updates;
    const allowed = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const key of allowed) {
      if (rest[key] !== undefined) {
        products[idx][key] = key === 'thumbnails' && Array.isArray(rest[key])
          ? rest[key].map(String)
          : rest[key];
      }
    }

    await this.#writeProducts(products);
    return products[idx];
  }

  async deleteProduct(pid) {
    const products = await this.#readProducts();
    const filtered = products.filter((p) => String(p.id) !== String(pid));
    if (filtered.length === products.length) return false;

    await this.#writeProducts(filtered);
    return true;
  }
}
