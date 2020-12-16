const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: { type: String },

})

module.exports = mongoose.model('Category', schema)