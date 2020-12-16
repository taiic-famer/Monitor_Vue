const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    num: { type: Number },
    title: { type: String },
    url: { type: String },
    path: { type: String },
    description: { type: String },
    size: { type: Number }
})

module.exports = mongoose.model('Image', schema)