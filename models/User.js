const mongoose = require('mongoose')
const reqString = {type: String, require: true}

const UserSchema = new mongoose.Schema({
    fullname : reqString,
    username: reqString,
    email: reqString,
    password: reqString,
    date:{
        type: Date,
        default: Date.now()
    },
    points: {
        type:Number,
        default: 0
    }
}, {timestamps:true})

const User = mongoose.model('users', UserSchema)

module.exports = User