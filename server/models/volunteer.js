const mongoose = require('mongoose')

const volSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    joinedNgo: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})



module.exports = mongoose.model('Volunteer', volSchema)