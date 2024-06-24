const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'app', 'public')));

app.get("/", (req, res) => {
    res.json({ message: "Tp Backend - Segunda Parcial" });
});

// Configurar la ruta para servir index.html en /reservamesas
app.get("/reservamesas", (req, res) => {
    console.log("Serving /reservamesas");
    res.sendFile(path.join(__dirname, 'app', 'public', 'reservamesas.html'));
});

// Configurar la ruta para servir listareservas.html en /listareservas
app.get("/listareservas", (req, res) => {
    console.log("Serving /listareservas");
    res.sendFile(path.join(__dirname, 'app', 'public', 'listareservas.html'));
});

const PORT = process.env.PORT || 9090;

require("./app/routes/cliente.routes")(app);
require("./app/routes/restaurante.routes")(app);
require("./app/routes/mesa.routes")(app);
require("./app/routes/reservacion.routes")(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}: http://localhost:${PORT}/.`);
});
