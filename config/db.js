const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'varials.env' })

// Option 2: Passing parameters separately (sqlite)
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
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