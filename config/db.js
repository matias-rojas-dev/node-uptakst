const { Sequelize } = require('sequelize');


// Option 2: Passing parameters separately (sqlite)
const db = new Sequelize('uptasknode', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: false,
    define: {
        timestamp: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db