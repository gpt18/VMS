const mongoose = require('mongoose')

 const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            default: 'volunteer',
            required: true,
        },
        
    }, 
    { timestamps: true }
 );

const User = mongoose.model('User', userSchema);

module.exports = User;