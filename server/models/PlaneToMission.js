const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  plane: { type: Array },
  mission: { type: String },
  url: { type: String },
  time: { type: String }
})

module.exports = mongoose.model('PlaneToMission', schema)