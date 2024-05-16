// src/routes/user_routes.js
import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';

const router = Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index');
});

// Ruta para el menú principal
router.get('/menu', (req, res) => {
  res.render('Menu');
});

// Rutas para clientes (CRUD)
// Estas rutas llamarán a los métodos en el controlador clienteController
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/crear', clienteController.mostrarFormularioCrear);
router.post('/clientes', clienteController.crearCliente);
router.get('/clientes/:id', clienteController.mostrarCliente);
router.get('/clientes/:id/editar', clienteController.mostrarFormularioEditar);
router.post('/clientes/:id/editar', clienteController.editarCliente);
router.get('/clientes/:id/eliminar', clienteController.eliminarCliente);

export default router;
