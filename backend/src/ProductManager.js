import { Product } from './models/Product.js';

/**
 * ProductManager: lógica de negocio de productos.
 * Persistencia en MongoDB (modelo Product).
 */
export class ProductManager {
  async getProducts() {
    const products = await Product.find().lean();
    return products.map((p) => ({ ...p, id: p._id.toString() }));
  }

  async getProductById(pid) {
    const product = await Product.findById(pid).lean();
    if (!product) return null;
    return { ...product, id: product._id.toString() };
  }

  async addProduct(productData) {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = productData;

    if (!title || !description || !code || price == null || stock == null || !category) {
      throw new Error('Faltan campos obligatorios: title, description, code, price, stock, category');
    }

    const newProduct = await Product.create({
      title: String(title),
      description: String(description),
      code: String(code),
      price: Number(price),
      status: Boolean(status),
      stock: Number(stock),
      category: String(category),
      thumbnails: Array.isArray(thumbnails) ? thumbnails.map(String) : [],
    });

    return newProduct.toJSON();
  }

  async updateProduct(pid, updates) {
    const { id, _id, ...rest } = updates;
    const allowed = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    const toSet = {};
    for (const key of allowed) {
      if (rest[key] !== undefined) {
        toSet[key] = key === 'thumbnails' && Array.isArray(rest[key]) ? rest[key].map(String) : rest[key];
      }
    }
    const product = await Product.findByIdAndUpdate(pid, { $set: toSet }, { new: true }).lean();
    if (!product) return null;
    return { ...product, id: product._id.toString() };
  }

  async deleteProduct(pid) {
    const result = await Product.findByIdAndDelete(pid);
    return !!result;
  }

  /**
   * Consulta paginada con filtros y ordenamiento.
   * @param {Object} opts - limit (default 10), page (default 1), sort ('asc'|'desc'|null), category, status
   * @param {string} baseUrl - base URL para prevLink/nextLink (ej: '/api/products')
   */
  async getProductsPaginated(opts = {}, baseUrl = '/api/products') {
    const limit = Math.max(1, parseInt(opts.limit, 10) || 10);
    const page = Math.max(1, parseInt(opts.page, 10) || 1);
    const sort = opts.sort === 'asc' || opts.sort === 'desc' ? opts.sort : null;
    const category = opts.category;
    const status = opts.status;

    const filter = {};
    if (category != null && category !== '') filter.category = category;
    if (status !== undefined && status !== '') filter.status = status === 'true' || status === true;

    const totalDocs = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit) || 1;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    let query = Product.find(filter).skip((page - 1) * limit).limit(limit);
    if (sort) query = query.sort({ price: sort === 'asc' ? 1 : -1 });
    const docs = await query.lean();

    const payload = docs.map((p) => ({ ...p, id: p._id.toString() }));

    const buildLink = (p) => {
      if (p == null) return null;
      const params = new URLSearchParams();
      params.set('limit', String(limit));
      params.set('page', String(p));
      if (category != null && category !== '') params.set('category', category);
      if (status !== undefined && status !== '') params.set('status', String(status));
      if (sort) params.set('sort', sort);
      return `${baseUrl}?${params.toString()}`;
    };

    return {
      status: 'success',
      payload,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: buildLink(prevPage),
      nextLink: buildLink(nextPage),
    };
  }
}
