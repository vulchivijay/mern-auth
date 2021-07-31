// Controllers
exports.signup = (req, res) => {
  console.log('Signup body :', req.body);
  res.json({
    data: 'you hit sign up end point !'
  })
};

