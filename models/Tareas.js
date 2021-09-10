const { Sequelize } = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects')
const Tareas = db.define('tarea', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
})
// Relate both tables with a Foreing Key. In MySQL we use JOIN - https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html
Tareas.belongsTo(Projects)
//Projects.hasMany(Tareas)

module.exports = Tareas;