const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  plane: { type: Array },
  image: { type: String },
  url: { type: String },
  time: { type: String}
})

module.exports = mongoose.model('PlaneToImage', schema)