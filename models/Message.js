const mongoose = require('mongoose')
const reqString = {type: String , required:true}

const MessageSchema = new mongoose.Schema({
    msg: reqString, 
    username: reqString
}, {timestamps:true})

const Message = mongoose.model('Message', MessageSchema )
module.exports = Message