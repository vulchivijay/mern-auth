// Controllers
const Todos = require('./../models/todos');

exports.todos = (req, res) => {
  const userEmail = req.params.email;
  Todos.find({email: userEmail}, function (error, todos) {
    if (error || !todos) {
      return res.status(400).json({
        error: "todos not found"
      })
    }
    res.send(todos);
  });
}

exports.todoupdate = (req, res) => {
  // const { title, description, email} = req.body;
  
}

exports.addtodo = (req, res) => {
  const {title, description, status, email} = req.body;
  const todo = new Todos({title, description, status, email})
  todo.save((error, todo) => {
    if (error) {
      return res.status(401).json({
        error: 'error saving todo in database. Try again.'
      });
    }
    return res.json({
      message: 'todo added'
    })
  })
}
