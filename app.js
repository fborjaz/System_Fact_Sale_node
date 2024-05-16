import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './src/routes/user_routes.js';
import clienteRoutes from './src/routes/cliente_routes.js'; // Corregir la importación
import bodyParser from 'body-parser'; // Agregar body-parser para manejar datos de formularios

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de las vistas
app.set('views', join(__dirname, 'src', 'views')); // Cambiar la ruta a 'views'
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, 'src', 'interfaces')));

// Middleware para analizar datos de formularios (POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Si también vas a recibir datos en formato JSON

// Middleware para las rutas
app.use('/', userRoutes);
app.use('/clientes', clienteRoutes);

// Manejo de errores (404 Not Found)
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// Manejo de errores (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor');
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3002;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
