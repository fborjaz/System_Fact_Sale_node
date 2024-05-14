import { Router } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';

const router = Router();
const clientsFilePath = 'src/data/clients.json';

// Configuración de body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Manejo de la ruta GET '/'
router.get('/', (req, res) => {
    res.render('index');
});

// Manejo de la ruta GET '/clientes'
router.get('/client', async (req, res) => {
    try {
        const clients = await readClientsFromFile();
        res.render('main', { clients });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al leer los clientes');
    }
});

// Manejo de la ruta GET '/regclientes'
router.get('/regclientes', (req, res) => {
    res.render('regclientes');
});

// Manejo de la ruta POST '/regclientes'
router.post('/regclientes', async (req, res) => {
    const { nombre, apellido, dni, tipo, descuento, card, limit } = req.body;

    if (!nombre || !apellido || !dni || !tipo) {
        return res.status(400).send('Faltan datos obligatorios');
    }

    try {
        const newClient = { nombre, apellido, dni, tipo, descuento, card, limit };
        let clients = await readClientsFromFile();
        clients.push(newClient);
        await writeClientsToFile(clients);
        res.redirect('/regclientes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el cliente');
    }
});

// Manejo de la ruta GET '/delete/:dni'
router.get('/delete/:dni', async (req, res) => {
    const dni = req.params.dni;
    try {
        let clients = await readClientsFromFile();
        clients = clients.filter(client => client.dni !== dni);
        await writeClientsToFile(clients);
        res.redirect('/regclientes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el cliente');
    }
});

async function readClientsFromFile() {
    const data = await fs.readFile(clientsFilePath, 'utf8');
    return JSON.parse(data);
}

async function writeClientsToFile(clients) {
    const jsonClients = JSON.stringify(clients);
    await fs.writeFile(clientsFilePath, jsonClients, 'utf8');
}

export default router;
