const Usuarios = require('../models/Usuarios')

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        nombrePagina: 'Crear cuenta en upTask'
    })
};

exports.createAccount = (req, res) => {
    //read data
    const { email, password } = req.body;

    //create user
    Usuarios.create({
        email,
        password
    })
        .then(() => {
            res.redirect('/iniciar-sesion')
        })
}