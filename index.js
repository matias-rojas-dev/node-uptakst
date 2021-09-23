const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./helpers/helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// create the connection to bd
const db = require('./config/db');

// import the model so that will .sync it creates the db
require('./models/Projects')
require('./models/Tareas')
db.sync()
    .then(() => console.log('OK server'))
    .catch(err => console.log(err))

// create an app const
const app = express();

// enable body parser to read files form
app.use(express.urlencoded({ extended: true }))

// load statics folders
app.use(express.static('public'))

// enable pug
app.set('view engine', 'pug');

// add the views folder
app.set('views', path.join(__dirname, './views'))

// add flash messages
app.use(flash())

app.use(cookieParser());

// sessions allow us nave between different pages without login again
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false
}))


// using passport
app.use(passport.initialize());
app.use(passport.session());

// middleware example
//app.use((req, res, next) => {
//    const date = new Date();
//    res.locals.year = date.getFullYear();
//    res.locals.messages = req.flash();
//    res.locals.usuarios = { ...req.user } || null;
//    next();
//})

// use var dump https://www.geeksforgeeks.org/php-var_dump-function/
app.use((req, res, next) => {
    // get the function to send it to the whole app
    res.locals.varDump = helpers.varDump;
    res.locals.messages = req.flash();
    res.locals.usuarios = { ...req.user } || null;
    next(); // next middleware
})



// req: request to server
// res: server responde
app.use('/', routes());

app.listen(3000);