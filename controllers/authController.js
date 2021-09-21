const passport = require('passport');

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