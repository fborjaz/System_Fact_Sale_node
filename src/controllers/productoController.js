import fs from 'fs/promises';
import path from 'path';
import Producto from '../models/Producto.js';

const productosFilePath = path.resolve('src/data/productos.json');

// ... (funciones readProductosFromFile y writeProductosToFile similares a las de clienteController.js)

const productoController = {
  listarProductos: async (req, res) => {
    const productos = await readProductosFromFile();
    res.render('productos', { productos });
  },

  // ... (otros métodos: mostrarFormularioCrear, crearProducto, mostrarProducto, mostrarFormularioEditar, editarProducto, eliminarProducto)
};

export default productoController;
