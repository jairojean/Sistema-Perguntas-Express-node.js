const Sequelize = require("sequelize");

const connection = new Sequelize('perguntasNode', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = connection;