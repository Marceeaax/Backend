const mesa = require("../controllers/mesadao.controller");
module.exports = app => {
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.put("/:id", mesa.update);
    router.delete("/:id", mesa.delete);
    router.get("/", mesa.findAll);
    router.get("/:id", mesa.findOne);
    app.use('/api/mesa', router);
};