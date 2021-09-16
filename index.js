const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./helpers/helpers');

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

// load statics folders
app.use(express.static('public'))

// enable pug
app.set('view engine', 'pug');

// add the views folder
app.set('views', path.join(__dirname, './views'))

// use var dump https://www.geeksforgeeks.org/php-var_dump-function/
app.use((req, res, next) => {
    // get the function to send it to the whole app
    res.locals.varDump = helpers.varDump;
    next(); // next middleware
})

// middleware example
app.use((req, res, next) => {
    const date = new Date();
    res.locals.year = date.getFullYear();
    next();
})

// enable body parser to read files form
app.use(express.urlencoded({ extended: true }))

// req: request to server
// res: server responde
app.use('/', routes());

app.listen(3000);