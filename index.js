const express = require('express');
const routes = require('./routes');
const path = require('path');
// crear una app 
const app = express();

// load statics folders
app.use(express.static('public'))

// enable pug
app.set('view engine', 'pug');

// add the views folder
app.set('views', path.join(__dirname, './views'))
// req: request to server
// res: server responde
app.use('/', routes());

app.listen(3000);