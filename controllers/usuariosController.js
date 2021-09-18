const Usuarios = require('../models/Usuarios')

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        nombrePagina: 'Crear cuenta en upTask'
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