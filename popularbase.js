const axios = require('axios');

const restaurantes = [
    {
        "nombre": "Lido Bar",
        "direccion": "Palma e/ Chile y Nuestra Señora de la Asunción, Asunción"
    },
    {
        "nombre": "Sukiyaki",
        "direccion": "Av. España 2028, Asunción"
    },
    {
        "nombre": "Lo de Osvaldo",
        "direccion": "Teniente 1ro. Morales 1024, Asunción"
    },
    {
        "nombre": "Paulista Grill",
        "direccion": "San Martín y Roque Centurión Miranda, Asunción"
    },
    {
        "nombre": "Tierra Colorada",
        "direccion": "Malutin 263, Asunción"
    },
    {
        "nombre": "Talleyrand",
        "direccion": "Aviadores del Chaco 2050, Asunción"
    },
    {
        "nombre": "Piegari",
        "direccion": "Av. Santa Teresa, Asunción"
    },
    {
        "nombre": "Hard Rock Cafe",
        "direccion": "Aviadores del Chaco 3210, Asunción"
    },
    {
        "nombre": "La Cabrera",
        "direccion": "San Martin 1234, Asunción"
    },
    {
        "nombre": "Il Mangiare",
        "direccion": "Mariscal López 1023, Asunción"
    }
];

const clientes = [
    {
        "cedula": "4815401",
        "nombre": "Lujan",
        "apellido": "Caceres"
    },
    {
        "cedula": "4669759",
        "nombre": "Marcelo",
        "apellido": "Aguayo"
    },
    {
        "cedula": "5415807",
        "nombre": "Denis",
        "apellido": "Gimenez"
    }
];

const apiUrlRestaurantes = 'http://localhost:9090/api/restaurante/';
const apiUrlMesas = 'http://localhost:9090/api/mesa/';
const apiUrlClientes = 'http://localhost:9090/api/cliente/';

async function createRestaurant(restaurante) {
    try {
        const response = await axios.post(apiUrlRestaurantes, restaurante);
        console.log(`Restaurante ${restaurante.nombre} creado: `, response.data);
        return response.data.id; // Devuelve el ID del restaurante creado
    } catch (error) {
        console.error(`Error creando el restaurante ${restaurante.nombre}: `, error.message);
        return null;
    }
}

async function createTable(restauranteId, piso, nombre, x, y) {
    const mesa = {
        nombre: nombre,
        capacidad: Math.floor(Math.random() * 4) + 2, // Capacidad aleatoria entre 2 y 5
        planta: piso,
        x: x,
        y: y,
        RestauranteId: restauranteId
    };
    try {
        const response = await axios.post(apiUrlMesas, mesa);
        console.log(`Mesa ${mesa.nombre} creada en el restaurante ID ${restauranteId}: `, response.data);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message.includes('unique constraint')) {
            // Si hay un error de restricción única, reintentar con nuevas coordenadas
            const newX = Math.floor(Math.random() * 7) - 3;
            const newY = Math.floor(Math.random() * 7) - 3;
            await createTable(restauranteId, piso, nombre, newX, newY);
        } else {
            console.error(`Error creando la mesa ${mesa.nombre} en el restaurante ID ${restauranteId}: `, error.message);
        }
    }
}

async function createClient(cliente) {
    try {
        const response = await axios.post(apiUrlClientes, cliente);
        console.log(`Cliente ${cliente.nombre} ${cliente.apellido} creado: `, response.data);
    } catch (error) {
        console.error(`Error creando el cliente ${cliente.nombre} ${cliente.apellido}: `, error.message);
    }
}

async function populateRestaurantsAndTables() {
    for (const restaurante of restaurantes) {
        const restauranteId = await createRestaurant(restaurante);
        if (restauranteId) {
            const pisos = Math.floor(Math.random() * 3) + 1; // Número aleatorio de pisos entre 1 y 3
            let mesaIndex = 1;
            for (let piso = 1; piso <= pisos; piso++) {
                const mesas = Math.floor(Math.random() * 3) + 3; // Número aleatorio de mesas entre 3 y 5
                for (let i = 1; i <= mesas; i++) {
                    const x = Math.floor(Math.random() * 7) - 3;
                    const y = Math.floor(Math.random() * 7) - 3;
                    await createTable(restauranteId, piso, `Mesa ${mesaIndex}`, x, y);
                    mesaIndex++;
                }
            }
        }
    }
}

async function populateClients() {
    for (const cliente of clientes) {
        await createClient(cliente);
    }
}

async function populateDatabase() {
    await populateRestaurantsAndTables();
    await populateClients();
}

populateDatabase();
