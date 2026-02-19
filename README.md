# Entrega N° 1 - API Productos y Carritos

Servidor Node.js + Express para gestionar productos y carritos de compra. Persistencia en archivos JSON. Vistas con **Handlebars** y actualización en tiempo real con **Socket.io**.

## Requisitos

- Node.js
- npm

## Cómo ejecutar y ver el proyecto

1. **Abrir terminal** en la carpeta del proyecto (donde está `backend`).

2. **Entrar a la carpeta backend e instalar dependencias** (solo la primera vez):
   ```bash
   cd backend
   npm install
   ```

3. **Si el puerto 8080 ya está en uso** (error `EADDRINUSE`):
   - Cierra la terminal donde tengas otro servidor corriendo, o
   - En PowerShell, liberar el puerto:
     ```powershell
     netstat -ano | findstr :8080
     taskkill /PID <número_última_columna> /F
     ```

4. **Iniciar el servidor**:
   ```bash
   npm start
   ```
   Debe aparecer: `Servidor escuchando en http://localhost:8080`

5. **Abrir en el navegador**:
   - **Home (lista de productos):** [http://localhost:8080](http://localhost:8080)
   - **Productos en tiempo real (WebSocket):** [http://localhost:8080/realtimeproducts](http://localhost:8080/realtimeproducts)

## Vistas (Handlebars)

- **http://localhost:8080** — Home: lista de productos (vista estática).
- **http://localhost:8080/realtimeproducts** — Productos en tiempo real: misma lista actualizada vía WebSocket al crear o eliminar productos. Incluye formulario para agregar y botón para eliminar.

## API

- **http://localhost:8080/api/products** — CRUD de productos (GET, POST, PUT, DELETE).
- **http://localhost:8080/api/carts** — Carritos (POST, GET, POST product to cart).

