# Entrega Final - API Productos y Carritos

Servidor Node.js + Express. Persistencia principal en **MongoDB**. Vistas con **Handlebars**, actualización en tiempo real con **Socket.io**. Endpoints para productos (con filtros, paginación y orden) y para carritos (con populate).

## Requisitos

- Node.js
- npm
- **MongoDB** (local o remoto)

## Formato de entrega

- Link al repositorio de GitHub **sin la carpeta `node_modules`** (ya está en `.gitignore`).

## Cómo arrancar el proyecto

Para ejecutar el proyecto

1. **Requisitos previos:** tener instalados Node.js, npm y MongoDB (local o en la nube).

2. **Clonar el repositorio** (o descargar el código) y **no incluir la carpeta `node_modules`** — ya está en `.gitignore`.

3. **Abrir una terminal** en la raíz del proyecto y entrar a la carpeta del backend:
   ```bash
   cd backend
   ```

4. **Instalar dependencias:**
   ```bash
   npm install
   ```

5. **MongoDB en ejecución:** asegurarse de que MongoDB esté corriendo. Por defecto la app usa `mongodb://localhost:27017/ecommerce`. Si usas otra URL, crear en `backend/` un archivo `.env` (puedes copiar `.env.example`) y definir:
   ```
   MONGO_URI=mongodb://tu-host:27017/ecommerce
   ```

6. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   Debería aparecer en consola algo como: `Servidor escuchando en http://localhost:8080` y `Conectado a MongoDB`.

7. **Probar en el navegador:**
   - **Home:** http://localhost:8080
   - **Productos (paginación y filtros):** http://localhost:8080/products
   - **Detalle de producto:** http://localhost:8080/products/:pid (reemplazar `:pid` por un ID de producto)
   - **Ver un carrito:** http://localhost:8080/carts/:cid (primero crear un carrito con `POST /api/carts` y usar ese `cid`)
   - **Productos en tiempo real:** http://localhost:8080/realtimeproducts

Si el puerto 8080 está ocupado, la aplicación intentará usar 8081 automáticamente.

## API

### Productos

- **GET /api/products** — Lista con paginación y filtros.
  - Query: `limit` (default 10), `page` (default 1), `sort` (`asc`|`desc` por precio), `query` (filtro: `category:valor` o `status:true`), `category`, `status`.
  - Respuesta: `{ status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink }`.
- **GET /api/products/:pid** — Un producto.
- **POST /api/products** — Crear producto.
- **PUT /api/products/:pid** — Actualizar producto.
- **DELETE /api/products/:pid** — Eliminar producto.

### Carritos

- **POST /api/carts** — Crear carrito.
- **GET /api/carts/:cid** — Carrito con productos poblados (referencia a Product).
- **POST /api/carts/:cid/product/:pid** — Agregar producto al carrito.
- **DELETE /api/carts/:cid/products/:pid** — Quitar un producto del carrito.
- **PUT /api/carts/:cid** — Actualizar todos los productos del carrito (body: `{ products: [...] }`).
- **PUT /api/carts/:cid/products/:pid** — Actualizar solo cantidad (body: `{ quantity: n }`).
- **DELETE /api/carts/:cid** — Vaciar el carrito (eliminar todos los productos).

## Vistas

- **/** — Home (lista de productos).
- **/products** — Productos con paginación, filtros y orden; enlace a detalle y botón “Agregar al carrito”.
- **/products/:pid** — Detalle del producto (descripción, precio, categoría, etc.) y botón “Agregar al carrito”.
- **/carts/:cid** — Carrito específico; solo se listan los productos de ese carrito (poblados).
- **/realtimeproducts** — Productos en tiempo real vía WebSocket.
