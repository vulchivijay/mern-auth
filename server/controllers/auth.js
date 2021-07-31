// Controllers
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Account activation link`,
    html: `
      <p>Please use the following link to activate your account</p>
      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
      <hr/>
      <p>This email may contain sensetive information</p>
      <p>${process.env.CLIENT_URL}</p>`
  }
  sgMail.send(emailData).then(sent => {
    // console.log('Signup mail sent', sent);
    return res.json({
      message: `Email has been sent to ${email}. Follow the instructions to activate your account`
    })
  })
  .catch(error => {
    // console.log('Signup email sent error :', error);
    return res.json({
      message: error.message
    })
  })
}
