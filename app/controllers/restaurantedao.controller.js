const db = require("../models");
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };

    Restaurante.create(restaurante)
        .then(data => {
            console.log("Creado RESTAURANTE exitosamente con los siguientes datos: " +
                "nombre: " + restaurante.nombre +
                ", direccion: " + restaurante.direccion);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear el restaurante con nombre: " + restaurante.nombre + ". Error: " + err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear el restaurante."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id)
        .then(data => {
            if (data) {
                console.log("Obtenido RESTAURANTE exitosamente con el id: " + id);
                res.send(data);
            } else {
                console.log("No encontrado el restaurante con id: " + id + ". Error: " + err.message);
                res.status(404).send("No encontrado");
            }
        })
        .catch(err => {
            console.log("Error al obtener el restaurante con id: " + id + ". Error: " + err.message);
            res.status(500).send({
                message: "Error al encontrar el restaurante con id=" + id
            });
        });
};


exports.findAll = (req, res) => {
    Restaurante.findAll().then(data => {
        console.log("Obtenido todos los RESTAURANTES exitosamente");
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todos los restaurantes" + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al obtener todos los restaurantes"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {restaurante: {[Op.iLike]: `%${nombre}%`}} : null;
    Restaurante.findAll({where: condition})
        .then(data => {
            console.log("Obtenido los RESTAURANTES exitosamente con el nombre: " + nombre);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al obtener los restaurantes con nombre: " + nombre + ". Error: " + err.message);
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener el restaurante."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    }
    console.log("Id del restaurante a actualizar: " + id);
    console.log("Restaurante a actualizar: " + JSON.stringify(restaurante));

    Restaurante.update(restaurante, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado RESTAURANTE exitosamente con los siguientes datos: " +
            "nombre: " + restaurante.nombre +
            ", direccion: " + restaurante.direccion);
        res.send(data);
    }).catch(err => {
        console.log("Error al actualizar el restaurante con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al actualizar el restaurante con id: " + id
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Restaurante.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado RESTAURANTE exitosamente con el id: " + id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar el restaurante con id: " + id + ". Error: " + err.message);
        res.status(500).send("Error al eliminar el restaurante con id: " + id);
    });
}

