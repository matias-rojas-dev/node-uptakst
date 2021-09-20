const passport = require('passport');

// http://www.passportjs.org/packages/passport-local/
exports.authUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'

})