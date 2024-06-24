const db = require("../models");
const Mesa = db.Mesa;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const mesa = {
        nombre: req.body.nombre,
        x: req.body.x,
        y: req.body.y,
        planta: req.body.planta,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId

    };

    Mesa.create(mesa)
        .then(data => {
            console.log("Creado MESA exitosamente con los siguientes datos: " +
                "nombre: " + mesa.nombre +
                ", x: " + mesa.x +
                ", y: " + mesa.y +
                ", planta: " + mesa.planta +
                ", capacidad: " + mesa.capacidad +
                ", restauranteID: " + mesa.RestauranteId);
            res.send(data);
        })
        .catch(err => {
            console.log("Error al crear la mesa con nombre: " + mesa.nombre + ". Error: " + err.message);
            res.status(500).send({
                message:
                    err.message || "Error al crear mesa."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id
    const mesa = {
        nombre: req.body.nombre,
        x: req.body.x,
        y: req.body.y,
        planta: req.body.planta,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId
    }
    Mesa.update(mesa, {
        where: {
            id: id
        }
    }).then(data => {
        console.log("Actualizado MESA exitosamente con los siguientes datos: " +
            "nombre: " + mesa.nombre +
            ", x: " + mesa.x +
            ", y: " + mesa.y +
            ", planta: " + mesa.planta +
            ", capacidad: " + mesa.capacidad +
            ", restauranteID: " + mesa.RestauranteId);
        res.send(data);
    }).catch(err => {
        console.log("Error al modificar la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al modificar la mesa con id: " + id
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Mesa.destroy({
        where: {
            id: id
        }
    }).then(data => {
        console.log("Eliminado la MESA exitosamente con el id: " + id);
        res.status(204).send();
    }).catch(err => {
        console.log("Error al eliminar la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send("Error al eliminar el mesa con id: " + id);
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id).then(data => {
        if (data) {
            console.log("Obtenido MESA exitosamente con el id: " + id)
            res.send(data);
        } else {
            console.log("No encontrado MESA con el id: " + id)
            res.status(404).send("Not found");
        }
    }).catch(err => {
        console.log("Error al obtener la mesa con id: " + id + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al obtener mesa con id=" + id
        });
    });
};


exports.findAll = (req, res) => {
    Mesa.findAll().then(data => {
        console.log("Obtenido todas las MESAS exitosamente")
        res.send(data);
    }).catch(err => {
        console.log("Error al obtener todas las mesas" + ". Error: " + err.message);
        res.status(500).send({
            message: "Error al obtener las mesas"
        });
    });
}


exports.findByNombre = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {mesa: {[Op.iLike]: `%${nombre}%`}} : null;
    Mesa.findAll({where: condition})
        .then(data => {
            console.log("Obtenido MESAS exitosamente con el nombre: " + nombre)
            res.send(data);
        })
        .catch(err => {
            console.log("Error al obtener la mesa con nombre: " + nombre + ". Error: " + err.message);
            res.status(500).send({
                message:
                    err.message || "Error al obtener las mesas con nombre: " + nombre
            });
        });
};
