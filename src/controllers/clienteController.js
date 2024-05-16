import fs from 'fs/promises';
import path from 'path';
import Cliente from '../models/Cliente.js';

const clientsFilePath = path.resolve('src/data/clients.json');

async function readClientsFromFile() {
  try {
    const data = await fs.readFile(clientsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de clientes:', error);
    return [];
  }
}

async function writeClientsToFile(clients) {
  try {
    const jsonClients = JSON.stringify(clients, null, 2);
    await fs.writeFile(clientsFilePath, jsonClients, 'utf8');
  } catch (error) {
    console.error('Error al escribir en el archivo de clientes:', error);
    throw error;
  }
}

const clienteController = {
  listarClientes: async (req, res) => {
    const clientes = await readClientsFromFile();
    res.render('main', { clientes });
  },

  mostrarFormularioCrear: (req, res) => {
    res.render('regclientes');
  },

  crearCliente: async (req, res) => {
    const { nombre, apellido, dni, tipo, descuento, card, limit } = req.body;

    if (!nombre || !apellido || !dni || !tipo) {
      return res.status(400).send('Faltan datos obligatorios');
    }

    try {
      const nuevoCliente = new Cliente(nombre, apellido, dni, tipo, descuento, card, limit);
      let clientes = await readClientsFromFile();
      clientes.push(nuevoCliente);
      await writeClientsToFile(clientes);
      res.redirect('/clientes');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar el cliente');
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
      res.status(404).send('Cliente no encontrado');
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
