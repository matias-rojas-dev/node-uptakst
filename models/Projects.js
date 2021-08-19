const slug = require('slug')
const shortid = require('shortid');

const Sequelize = require('sequelize');

const { INTEGER, STRING } = Sequelize;

const db = require('../config/db');

// https://sequelize.org/master/manual/model-basics.html

const Projects = db.define('projects', { // table project
    id: {
        type: INTEGER, // int
        primaryKey: true,           // pk
        autoIncrement: true,
    },
    nombre: STRING,
    url: STRING,
}, {
    hooks: {
        beforeCreate(project) {
            const url = slug(project.nombre).toLowerCase(); // dinamic url

            project.url = `${url}-${shortid.generate()}`

        }
    }
});

module.exports = Projects