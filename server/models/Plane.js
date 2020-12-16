const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    IP: { type: String },
    type: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    altitude: { type: Number },
    speed: { type: Number },
    verticalSpeed: { type: Number },
    state: { type: String },

    battery: { type: Number }
})

module.exports = mongoose.model('Plane', schema)