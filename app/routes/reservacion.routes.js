const reservacion = require("../controllers/reservaciondao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", reservacion.create);
    router.put("/:id", reservacion.update);
    router.delete("/:id", reservacion.delete);
    router.post("/filter", reservacion.filterReservaciones);
    router.post("/libres", reservacion.mesasLibres);
    router.post("/ocupadas", reservacion.mesasOcupadas);
    router.post("/lista", reservacion.listaReservaciones);
    router.get("/:id", reservacion.getReservacionByID);
    app.use('/api/reservacion', router);
};