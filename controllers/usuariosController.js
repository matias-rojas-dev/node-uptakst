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
        res.render('createAccount', {
            nombrePagina: 'Crear cuenta en upTask',
            errors: error.errors // object was sequelize return
        })
    }

}