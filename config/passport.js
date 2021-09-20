const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// ref to the model where we are going to auth
const Usuarios = require('../models/Usuarios');

// local strategy - login with own credentials (user and password)
passport.use(
    new localStrategy(
        // by default passport await a user and password
        {
            // depending on the values we have, we will modify them in this camp
            // we use email and password
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await Usuarios.findOne({
                    where: { email: email }
                })
                // if the password is invalid
                if (!user.verifyPassword(password)) {
                    // password in the form (new) == password in db (hach) ?
                    return done(null, false, {
                        message: 'Contraseña incorrecta'
                    })
                } else {
                    // email and password is ok!
                    return done(null, user)
                }
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
)

// serialize user
passport.serializeUser((user, callback) => {
    callback(null, user)
})

// deserialize user
passport.deserializeUser((user, callback) => {
    callback(null, user)
})

module.exports = passport;