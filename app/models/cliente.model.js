module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {

        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cedula: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        apellido: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    return Cliente;
};