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

exports.readtask = (req, res) => {
  const taskId = req.params.id;
  Todos.findById(taskId).exec((error, task) => {
    if (error || !task) {
      return res.status(400).json({
        error: "Task not found"
      })
    }
    task.email = undefined;
    res.json(task);
  })
}

exports.todoupdate = (req, res) => {
  const {_id, title, description, status} = req.body;
  console.log(_id, title, description, status);
  Todos.findOne({_id: _id}, (error, task) => {
    if (error || !task) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    if (!title) {
      return res.status(400).json({
        error: "Name is required"
      })
    } else {
      task.title = title;
    }
    if (!description) {
      return res.status(400).json({
        error: "Description is required"
      })
    } else {
      task.description = description;
    }
    task.status = status;
    task.save((error, updatedtask) => {
      if (error) {
        // console.log("task update failed");
        return res.status(400).json({
          error: "Task update failed"
        })
      }
      res.json(updatedtask);
    });
  })
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
