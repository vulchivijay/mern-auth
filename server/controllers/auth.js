// Controllers
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signup = (req, res) => {
  const { name, email, password} = req.body;
  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken!'
      })
    }
  })

  const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'});

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  let emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Account activation link',
    html: `
    <h2>Please use the following link to activate your account</h2>
    <a href="${process.env.CLIENT_URL}/auth/activate/${token}">${process.env.CLIENT_URL}/auth/activate/${token}</a>
    <hr/>
    <p>This email may contain sensetive information</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  };

  transporter
  .sendMail(emailData)
  .then(sent => {
    console.log('SIGNUP EMAIL SENT', sent);
    return res.json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    });
  })
  .catch(err => {
    console.log('SIGNUP EMAIL SENT ERROR', err);
    return res.json({ message: err.message });
  });
}
