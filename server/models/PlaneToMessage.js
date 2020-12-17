const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  plane: { type: Array },
  message: { type: String },
  time: { type: String}
})

module.exports = mongoose.model('PlaneToMessage', schema)