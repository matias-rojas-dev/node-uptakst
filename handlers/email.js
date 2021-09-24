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

// html 
const generateHtml = (file, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
    return juice(html); //https://www.npmjs.com/package/juice
}

exports.sendEmail = async (options) => {

    const { user, subject, file } = options;

    const html = generateHtml(file, options);
    const text = htmlToText.htmlToText(html);

    let mailOptions = {
        from: 'upTask <no-reply@uptask.com>',
        to: user.email,
        subject: subject,
        text,
        html,
    };

    const sendEmailUtil = util.promisify(transporter.sendMail, transporter);
    return sendEmailUtil.call(transporter, mailOptions)
}


