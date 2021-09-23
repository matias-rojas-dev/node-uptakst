const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

const { user, password, host, port } = emailConfig;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
        user: user, // generated ethereal user
        pass: password, // generated ethereal password
    },
});

let mailOptions = {
    from: 'upTask <no-reply@uptask.com>',
    to: 'correo@correo.com',
    subject: 'Password reset',
    text: 'Hola',
    html: '<h1>Hola</h1>'
};

transporter.sendMail(mailOptions)