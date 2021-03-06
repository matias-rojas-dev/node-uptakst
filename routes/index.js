const express = require('express');
// express.Router(): 
const router = express.Router();

const { body } = require('express-validator/check');

// controllers
const {
    addTask,
    changeTaskState,
    deleteTask
} = require('../controllers/tareasController')

const {
    projectsHome,
    projectsNosotros,
    projectsFormulario,
    projectsNuevo,
    projectByUrl,
    editForm,
    updateProject,
    deteleProject
} = require('../controllers/projectsControllers');

const {
    formCreateAccount,
    createAccount,
    formLogin,
    resetPassword,
    confirmAccount,
} = require('../controllers/usuariosController');

const {
    authUser,
    userIsAuthenticated,
    logout,
    sendToken,
    resetPasswordWithToken,
    updatePassword
} = require('../controllers/authController')

module.exports = function () {
    router.get('/',
        userIsAuthenticated,
        projectsHome
    );

    router.get('/nosotros', projectsNosotros);

    router.get('/nuevo-proyecto',
        userIsAuthenticated,
        projectsFormulario
    ); // this react with get method

    router.post('/nuevo-proyecto',
        userIsAuthenticated,
        body('nombre').not().isEmpty().trim().escape(),
        projectsNuevo
    ); // this react with post method


    router.get('/projects/:url',
        userIsAuthenticated,
        projectByUrl
    );

    //Update the project
    router.get('/project/edit/:id',
        userIsAuthenticated,
        editForm
    );

    router.post('/nuevo-proyecto/:id',
        userIsAuthenticated,
        body('nombre').not().isEmpty().trim().escape(),
        updateProject
    ); // this react with post method

    // delete project
    router.delete('/projects/:url',
        userIsAuthenticated,
        deteleProject
    );

    // task
    router.post('/projects/:url',
        userIsAuthenticated,
        addTask
    );

    // change status task
    router.patch('/tareas/:id',
        userIsAuthenticated,
        changeTaskState
    );

    // delete task
    router.delete('/tareas/:id', deleteTask)

    //users
    router.get('/crear-cuenta', formCreateAccount)
    router.post('/crear-cuenta', createAccount)

    //login
    router.get('/iniciar-sesion', formLogin)
    router.post('/iniciar-sesion', authUser)

    // logout
    router.get('/cerrar-sesion', logout)

    // reset Password
    router.get('/restablecer', resetPassword);
    router.post('/restablecer', sendToken);
    router.get('/restablecer/:token', resetPasswordWithToken);
    router.post('/restablecer/:token', updatePassword);

    // confirm account
    router.get('/confirmar/:mail', confirmAccount)

    return router;
}