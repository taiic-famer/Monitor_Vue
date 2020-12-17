const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  plane: { type: Array },
  mission: { type: String },
  description: { type: String },
  url: { type: String },
})

module.exports = mongoose.model('PlaneToMission', schema)