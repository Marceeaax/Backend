const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.model.js")(sequelize, Sequelize);
db.Reservacion = require("./reservacion.model")(sequelize, Sequelize);

db.Restaurante.hasMany(db.Mesa, {
    foreignKey: {
        name: 'RestauranteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Mesa.belongsTo(db.Restaurante);

db.Restaurante.hasMany(db.Reservacion, {
    foreignKey: {
        name: 'RestauranteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Restaurante);

db.Mesa.hasMany(db.Reservacion, {
    foreignKey: {
        name: 'MesaId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Mesa);

db.Cliente.hasMany(db.Reservacion, {
    foreignKey: {
        name: 'ClienteId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
db.Reservacion.belongsTo(db.Cliente);

module.exports = db;
