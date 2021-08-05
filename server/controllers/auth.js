// Controllers
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const expressJwt = require('express-jwt');

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
    // console.log('SIGNUP EMAIL SENT', sent);
    return res.json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    });
  })
  .catch(err => {
    // console.log('SIGNUP EMAIL SENT ERROR', err);
    return res.json({ message: err.message });
  });
}

exports.accountActivation = (req, res) => {
  const {token} = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (error, decoded) => {
      if (error) {
        // console.log('JWT verify in account activation error ', error);
        return res.status(401).json({
          error: 'Expired link, Signup again'
        })
      }

      const { name, email, password } = jwt.decode(token);
      const user = new User({name, email, password})
      user.save((error, user) => {
        if (error) {
          // console.log('Save user in account activation error ', error);
          return res.status(401).json({
            error: 'Error saving user in database. Try signup again.'
          });
        }
        return res.json({
          message: 'Signup sucess. Please Sign in'
        })
      })
    })
  } else {
    return res.json({
      message: 'Something went wrong. Try again.'
    })
  }
}

exports.signin = (req, res) => {
  const {email, password} = req.body;

  // check if user exit
  User.findOne({email}).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'user with that email does not exist'
      })
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match'
      })
    }
    // generate a token and send it to client for valid user sign in
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    const {_id, name, email, role} = user;
    return res.json({
      token,
      user: {_id, name, email, role}
    })
  })
}

// middleware protecting API calls
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256']
})

exports.adminMiddleware = (req, res, next) => {
  User.findById({_id: req.user._id}).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup"
      })
    }
    if (user.role === 'admin') {
      return res.status(400).json({
        error: "Access resorce. Access denied."
      })
    }

    req.profile = user;
    next();
  })
}
