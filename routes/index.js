const express = require('express');
// express.Router(): 
const router = express.Router();

// controllers
const { projectsHome, projectsNosotros, projectsFormulario, projectsNuevo } = require('../controllers/projectsControllers')

module.exports = function () {
    router.get('/', projectsHome);
    router.get('/nosotros', projectsNosotros);
    router.get('/nuevo-proyecto', projectsFormulario); // this react with get method
    router.post('/nuevo-proyecto', projectsNuevo); // this react with post method
    return router;
}