const mongoose = require('mongoose')
const reqString = {type:String , required:true}
const nonReqString = {type:String, required:false}
const reqDate = {type:Date, required:true}
const reqNumber = {type:Number, required:true}
const nonReqArray = {type:Array, required:true}
const reqBoolean = {type:Boolean, required:true}

const CarpoolSchema = new mongoose.Schema({
    "giver": reqString,
    "recievers": nonReqArray,
    // "date": reqDate, 
    "date": reqString,
    "nopeople": reqNumber,
    "description": nonReqString,
    "origin": reqString,
    "destination": reqString,
    "regular": reqBoolean
}, {timestamps:true})

const Carpool = mongoose.model('Carpool', CarpoolSchema)
module.exports = Carpool