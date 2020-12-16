const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: { type: String },
    description: { type: String }

})

module.exports = mongoose.model('Message', schema)