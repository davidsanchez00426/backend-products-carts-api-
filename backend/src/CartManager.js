import { Cart } from './models/Cart.js';

/**
 * CartManager: lógica de negocio de carritos.
 * Persistencia en MongoDB; products referencian al modelo Product.
 */
export class CartManager {
  async createCart() {
    const cart = await Cart.create({ products: [] });
    return cart.toJSON();
  }

  async getCartById(cid, populateProducts = false) {
    let query = Cart.findById(cid);
    if (populateProducts) query = query.populate('products.product');
    const cart = await query.lean();
    if (!cart) return null;
    const id = cart._id.toString();
    return { ...cart, id };
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    const existing = cart.products.find((p) => p.product.toString() === String(pid));
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.products.push({ product: pid, quantity: qty });
    }
    await cart.save();
    return cart.toJSON();
  }

  /** Eliminar un producto del carrito */
  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    const initial = cart.products.length;
    cart.products = cart.products.filter((p) => p.product.toString() !== String(pid));
    if (cart.products.length === initial) return null;
    await cart.save();
    return cart.toJSON();
  }

  /** Actualizar todos los productos del carrito (array { product, quantity }) */
  async updateCartProducts(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = Array.isArray(products)
      ? products.map((p) => ({ product: p.product, quantity: Math.max(1, Number(p.quantity) || 1) }))
      : [];
    await cart.save();
    return cart.toJSON();
  }

  /** Actualizar solo la cantidad de un producto en el carrito */
  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    const item = cart.products.find((p) => p.product.toString() === String(pid));
    if (!item) return null;
    const qty = Math.max(0, Math.floor(Number(quantity) || 0));
    if (qty === 0) {
      cart.products = cart.products.filter((p) => p.product.toString() !== String(pid));
    } else {
      item.quantity = qty;
    }
    await cart.save();
    return cart.toJSON();
  }

  /** Vaciar el carrito (eliminar todos los productos) */
  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart.toJSON();
  }
}
