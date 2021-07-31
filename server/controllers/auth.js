// Controllers
const User = require('./../models/user');

exports.signup = (req, res) => {
  // console.log('Signup body :', req.body);
  // res.json({
  //   data: 'you hit sign up end point !'
  // })
  const { name, email, password} = req.body;
  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken!'
      })
    }
  })
  let newUser = new User({name, email, password});
  newUser.save((error, success) => {
    if(error) {
      console.log('Signup error: ', error);
      return res.status(400).json({
        error: error
      })
    }
    res.json({
      message: 'Signup success! Please signin.'
    })
  })
};

