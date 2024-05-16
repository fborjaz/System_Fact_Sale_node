// src/routes/producto_routes.js
import { Router } from 'express';
import productoController from '../controllers/productoController.js';

const router = Router();

router.get('/', productoController.listarProductos);
// ... (otras rutas para productos)

export default router;
