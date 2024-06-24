module.exports = (sequelize, Sequelize) => {
    const Reservacion = sequelize.define("Reservacion", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        horaInicio: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        horaFin: {
            type: Sequelize.BIGINT,
            allowNull: false
        }

    });
    return Reservacion;
};