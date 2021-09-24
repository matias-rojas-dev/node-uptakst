const Usuarios = require('../models/Usuarios');
const sendEmailUtil = require('../handlers/email');

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        nombrePagina: 'Crear cuenta en upTask'
    })
};

exports.formLogin = (req, res) => {
    const { error } = res.locals.messages
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

        // create URL to confirm the account
        const confirmUrl = `http://${req.headers.host}/confirmar/${email}`;


        // create the user object
        const user = {
            email
        }

        // send email
        await sendEmailUtil.sendEmail({
            user: user,
            subject: 'Confirma tu cuenta upTask',
            confirmUrl: confirmUrl,
            file: 'confirmAccount'
        });

        // redirect to user
        req.flash('correcto', 'Enviamos un correo para que confirmes tu cuenta');
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
};

// change the account state (defaultValue: 0)
exports.confirmAccount = async (req, res) => {
    const user = await Usuarios.findOne({
        where: { email: req.params.mail }
    });

    if (!user) {
        req.flash('error', 'Cuenta no válida');
        res.redirect('/crear-cuenta')
    }

    user.active = 1;
    await user.save();

    req.flash('correcto', 'Cuenta activada, inicia sesión');
    res.redirect('/iniciar-sesion')
}