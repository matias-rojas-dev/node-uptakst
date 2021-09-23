const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');

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
        res.redirect('/restablecer');
    }

    // user exists
    getUserByEmail.token = crypto.randomBytes(20).toString('hex');
    getUserByEmail.expiryTokenTime = Date.now() + 3600000 // one hour;

    // save to DB
    await getUserByEmail.save();

    // url the reset - https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Host
    const resetUrl = `http://${req.headers.host}/restablecer/${getUserByEmail.token}`;

    console.log(resetUrl)


}

exports.resetPasswordWithToken = async (req, res) => {
    const userWithTokenFilter = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    if (!userWithTokenFilter) {
        req.flash('error', 'No válido');
        res.redirect('/restablecer')
    }

    res.render('newPassword', {
        nombrePagina: 'Restablecer contraseña'
    })
}

exports.updatePassword = async (req, res) => {
    const user = await Usuarios.findOne({
        where: {
            // verify 1) token by url = token db - 2) expiry time
            token: req.params.token,
            expiryTokenTime: {
                [Op.gte]: Date.now()
            }
        }
    })

    if (!user) {
        req.flash('error', 'No válido');
        res.redirect('/restablecer');
    }

    // reset token and expiry
    user.token = null;
    user.expiryTokenTime = null;

    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    await user.save();
    req.flash('correcto', 'Contraseña cambiada con éxito');
    res.redirect('/iniciar-sesion');

}