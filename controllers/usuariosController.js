const Usuarios = require('../models/Usuarios')

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        nombrePagina: 'Crear cuenta en upTask'
    })
};

exports.formLogin = (req, res) => {
    const { error } = res.locals.mensajes
    console.log(error)
    res.render('login', {
        nombrePagina: 'Iniciar sesión en upTask',
        error: error
    })
};

exports.createAccount = async (req, res) => {
    //read data
    const { email, password } = req.body;
    try {
        //create user
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(errorText => errorText.message)) // uniter of errors
        res.render('createAccount', {
            nombrePagina: 'Crear cuenta en upTask',
            messages: req.flash(), // object was sequelize return
            email,
            password
        })
    }

}

exports.resetPassword = (req, res) => {
    res.render('resetPassword', {
        nombrePagina: 'Restablecer contraseña'
    })
}