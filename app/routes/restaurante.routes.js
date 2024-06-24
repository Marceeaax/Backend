module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.put("/:id", restaurante.update);
    router.delete("/:id", restaurante.delete);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    app.use('/api/restaurante', router);
};