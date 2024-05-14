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
app.use(express.static(join(__dirname, 'src', 'interfaces')));

// Middleware para las rutas
app.use('/', indexRoutes);

// Manejo de errores
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
