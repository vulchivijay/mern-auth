const User = require('./../models/user')

exports.readuser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json(user);
  })
}