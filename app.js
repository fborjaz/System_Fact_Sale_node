import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './src/routes/user.routes.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de las vistas
app.set('views', join(__dirname, 'src', 'interfaces', 'html'));
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Middleware para las rutas de la API
app.use('/api', indexRoutes);

// Middleware para manejar errores específicos de las rutas
app.use('/api', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Hubo un error en la ruta de la API' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor');
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3002;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
