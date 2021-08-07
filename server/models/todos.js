const mongoose = require('mongoose');
 
const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 250
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    status: {
      type: String,
      default: 'open'
    },
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Todos', todosSchema);