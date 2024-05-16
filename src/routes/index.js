import { Router } from 'express';
import userRoutes from './user_routes.js';
import clienteRoutes from './cliente_routes.js';
import productoRoutes from './producto_routes.js';
import facturaRoutes from './factura_routes.js';

const router = Router();

router.use('/', userRoutes);
router.use('/clientes', clienteRoutes);
router.use('/productos', productoRoutes);
router.use('/facturas', facturaRoutes);

router.use((req, res, next) => {
  res.status(404).render('error', { mensaje: 'Ruta no encontrada' });
});

export default router;
