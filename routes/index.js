const express = require('express');
// express.Router(): 
const router = express.Router();

const { body } = require('express-validator/check');

// controllers
const {
    projectsHome,
    projectsNosotros,
    projectsFormulario,
    projectsNuevo,
    projectByUrl,
    editForm,
} = require('../controllers/projectsControllers')

module.exports = function () {
    router.get('/', projectsHome);
    router.get('/nosotros', projectsNosotros);
    router.get('/nuevo-proyecto', projectsFormulario); // this react with get method

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        projectsNuevo
    ); // this react with post method

    router.get('/projects/:url', projectByUrl);

    //Update the project
    router.get('/project/edit/:id', editForm);


    return router;
}