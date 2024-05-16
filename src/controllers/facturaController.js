// src/controllers/facturaController.js
import fs from 'fs/promises';
import path from 'path';
import Factura from '../models/Factura.js';

const facturasFilePath = path.resolve('src/data/facturas.json');

// ... (funciones readFacturasFromFile y writeFacturasToFile similares a las de clienteController.js)

const facturaController = {
  listarFacturas: async (req, res) => {
    const facturas = await readFacturasFromFile();
    res.render('facturas', { facturas });
  },

  // ... (otros métodos: mostrarFormularioCrear, crearFactura, mostrarFactura, mostrarFormularioEditar, editarFactura, eliminarFactura)
};

export default facturaController;
