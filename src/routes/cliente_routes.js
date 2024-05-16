import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';

const router = Router();

router.get('/', clienteController.listarClientes);
router.get('/nuevo', clienteController.mostrarFormularioCrear);
router.post('/', clienteController.crearCliente);
router.get('/:id', clienteController.mostrarCliente);
router.get('/:id/editar', clienteController.mostrarFormularioEditar);
router.post('/:id/editar', clienteController.editarCliente);
router.get('/:id/eliminar', clienteController.eliminarCliente);

export default router;
