const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendValidationEmail = (user) => {
  transporter
    .sendMail({
      from: `"Arquitectura de Servidores" <${email}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to Arquitectura de Servidores', // Subject line
      html: `
                <h1>Welcome to Arquitectura de Servidores</h1>
                <p>Activate your account</p>
                <a href="http://localhost:8000/api/users/${user.id}/activate">Click here</a>
              `,
    })
    .then(() => {
      console.log(`email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};