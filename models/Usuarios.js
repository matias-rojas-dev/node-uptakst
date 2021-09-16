const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Projects');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate(usuarios) {
            usuarios.password = bcrypt.hashSync(usuarios.password, bcrypt.genSaltSync(10))
        }
    }
}

);

// Each users can create their projects and create more than one
Usuarios.hasMany(Proyectos)

module.exports = Usuarios;