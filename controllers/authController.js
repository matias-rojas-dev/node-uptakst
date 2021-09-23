const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
// http://www.passportjs.org/packages/passport-local/
exports.authUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'

})


exports.userIsAuthenticated = (req, res, next) => {
    // user is athenticate
    if (req.isAuthenticated()) {
        return next();
    }


    // user is not authenticate
    return res.redirect('/iniciar-sesion')
}

// logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

// create a token is user is valid
exports.sendToken = async (req, res) => {
    const { email: userEmail } = req.body;

    const getUserByEmail = await Usuarios.findOne({
        where: { email: userEmail }
    });

    if (!getUserByEmail) {
        req.flash('error', 'No existe esa cuenta');
        res.render('resetPassword', {
            nombrePagina: 'Restablecer contraseña',
            messages: req.flash()
        })
    }

    // user exists
    const token = crypto.randomBytes(20).toString('hex');
    const expiryTokenTime = Date.now() + 3600000 // one hour;


}