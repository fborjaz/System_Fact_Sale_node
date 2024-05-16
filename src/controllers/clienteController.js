import fs from 'fs/promises';
import path from 'path';
import Cliente from '../models/Cliente.js';

const clientsFilePath = path.resolve('src/data/clients.json');

// Funciones auxiliares para leer y escribir clientes en el archivo
async function readClientsFromFile() {
  try {
    const data = await fs.readFile(clientsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de clientes:', error);
    return []; // Retornar un arreglo vacío si hay error
  }
}

async function writeClientsToFile(clients) {
  try {
    const jsonClients = JSON.stringify(clients, null, 2); // Formato legible
    await fs.writeFile(clientsFilePath, jsonClients, 'utf8');
  } catch (error) {
    console.error('Error al escribir en el archivo de clientes:', error);
    throw error; // Propagar el error para que pueda ser manejado en otro lugar
  }
}

const clienteController = {
  listarClientes: async (req, res) => {
    try {
      const clients = await readClientsFromFile();
      console.log('Clientes leídos:', clients);
      res.render('main', { clients }); // Pasar el arreglo 'clients'
    } catch (error) {
      console.error('Error al listar clientes:', error);
      res.status(500).render('error', { mensaje: 'Error al obtener la lista de clientes' });
    }
  },

  mostrarFormularioCrear: (req, res) => {
    res.render('regclientes');
  },

  crearCliente: async (req, res) => {
    const { nombre, apellido, dni, tipo, descuento, card, limit } = req.body;

    // Validación de datos
    if (!nombre || !apellido || !dni || !tipo) {
      return res.status(400).render('regclientes', {
        error: 'Faltan datos obligatorios',
        cliente: req.body
      });
    }

    if (tipo === 'regular' && (isNaN(parseFloat(descuento)) || descuento < 0 || descuento > 100)) {
      return res.status(400).render('regclientes', {
        error: 'Descuento inválido para cliente regular (debe ser un número entre 0 y 100)',
        cliente: req.body
      });
    }

    if (tipo === 'vip' && (isNaN(parseFloat(limit)) || limit < 10000 || limit > 20000)) {
      return res.status(400).render('regclientes', {
        error: 'Límite de crédito inválido para cliente VIP (debe estar entre 10000 y 20000)',
        cliente: req.body
      });
    }

    // Normalizar los datos del formulario
    const clienteData = { nombre, apellido, dni, tipo };
    if (tipo === 'regular') {
      clienteData.descuento = parseFloat(descuento);
      clienteData.card = card === 'on';
    } else if (tipo === 'vip') {
      clienteData.limit = parseFloat(limit);
      delete clienteData.card; // Eliminar la propiedad 'card' para clientes VIP
    }

    try {
      const nuevoCliente = new Cliente(clienteData.nombre, clienteData.apellido, clienteData.dni, clienteData.tipo, clienteData.descuento, clienteData.card, clienteData.limit);
      let clientes = await readClientsFromFile();
      clientes.push(nuevoCliente);
      await writeClientsToFile(clientes);
      res.redirect('/clientes');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al guardar el cliente' });
    }
  },

  mostrarCliente: async (req, res) => {
    const id = req.params.id;
    const clientes = await readClientsFromFile();
    const cliente = clientes.find(c => c.dni === id);

    if (cliente) {
      res.render('cliente_detalle', { cliente });
    } else {
      res.status(404).render('error', { mensaje: 'Cliente no encontrado' });
    }
  },

  mostrarFormularioEditar: async (req, res) => {
    const id = req.params.id;
    const clientes = await readClientsFromFile();
    const cliente = clientes.find(c => c.dni === id);

    if (cliente) {
      res.render('editar_cliente', { cliente });
    } else {
      res.status(404).render('error', { mensaje: 'Cliente no encontrado' });
    }
  },

  editarCliente: async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let clientes = await readClientsFromFile();

    const index = clientes.findIndex(c => c.dni === id);

    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...updatedData };
      await writeClientsToFile(clientes);
      res.redirect('/clientes');
    } else {
      res.status(404).render('error', { mensaje: 'Cliente no encontrado' });
    }
  },

  eliminarCliente: async (req, res) => {
    const id = req.params.id;
    let clientes = await readClientsFromFile();

    clientes = clientes.filter(c => c.dni !== id);
    await writeClientsToFile(clientes);
    res.redirect('/clientes');
  }
};

export default clienteController;
