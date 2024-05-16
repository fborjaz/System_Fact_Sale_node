// src/routes/factura_routes.js
import { Router } from 'express';
import facturaController from '../controllers/facturaController.js';

const router = Router();

router.get('/', facturaController.listarFacturas);
// ... (otras rutas para facturas)

export default router;
