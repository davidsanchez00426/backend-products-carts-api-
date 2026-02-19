import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import exphbs from 'express-handlebars';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Servidor HTTP (necesario para Socket.io)
const server = createServer(app);
const io = new Server(server);

// Hacer io disponible en las rutas (para emitir desde POST/DELETE)
app.set('io', io);

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas de vistas (home y realtimeproducts)
app.use('/', viewsRouter);

function startServer(port) {
  server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const alt = port === 8080 ? 8081 : port + 1;
      console.warn(`Puerto ${port} en uso. Usando http://localhost:${alt}`);
      startServer(alt);
    } else {
      throw err;
    }
  });
}

startServer(PORT);
