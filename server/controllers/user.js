const User = require('./../models/user')

exports.readuser = (req, res) => {
  console.log("body ", req.body);
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

exports.updateuser = (req, res) => {
  // console.log(req.user, req.body);
  const {name, password} = req.body;
  User.findOne({_id: req.user._id}, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required"
      })
    } else {
      user.name = name;
    }
    if (password) {
      if(password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long"
        })
      } else {
        user.password = password;
      }
    }
    user.save((error, updateduser) => {
      if (error) {
        console.log("user update failed");
        return res.status(400).json({
          error: "User update failed"
        })
      }
      console.log('updateduser ', updateduser);
      updateduser.hashed_password = undefined;
      updateduser.salt = undefined;
      updateduser.createdAt = undefined;
      updateduser.updatedAt = undefined;
      res.json(updateduser);
    });
  })

}