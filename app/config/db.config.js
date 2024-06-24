module.exports = {
    HOST: "postgresdb",
    PORT: 5432,
    USER: "postgres",
    PASSWORD: "luis",
    DB: "bdpwb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
