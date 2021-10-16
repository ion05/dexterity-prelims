const express = require('express')
const router = express.Router()
const Carpool = require('../models/Carpool')
const {ensureAuthenticated} = require('../config/auth')
const User = require('../models/User')

router.get('/create', ensureAuthenticated, (req, res)=> {
    res.render('carpool_create')
})

router.post('/create', ensureAuthenticated, (req,res)=> {
    console.log(req.body)
    const {date, nopeople, description, origin,regular, destination, } = req.body
    const giver = req.user.fullname
    let regBol = false 
    if (regular == "on") {
        regBol = true
    } 
    const newCarpool = new Carpool({
        giver:giver,
        date:date,
        nopeople:nopeople,
        origin:origin,
        destination:destination,
        regular:regBol
    })
    newCarpool.save().then((result)=> {
        console.log('Added New Carpool')
        res.redirect('/dashboard')
    })
})
router.post('/accept', async (req,res)=> {
    const id = req.body.id 
    Carpool.findOneAndUpdate({"_id":id}, {$inc : {"nopeople": -1}, $push : {"recievers": req.user.username}}).then((result)=> {
        const giverUserName = result.giver
        User.findOneAndUpdate({username:giverUserName}, {$inc: {'points': 2}}).then((result)=> {
        res.redirect('/dashboard')
        })
    })
    
    
})

module.exports=router