const express=  require('express')
const router = express.Router()
const {ensureAuthenticated,forwardAuthenticated} = require('../config/auth')
const User = require('../models/User')
const Carpool = require('../models/Carpool')

router.get('/',ensureAuthenticated,(req,res)=>{
    let username = req.user.username
    let todayDate = Date.now()
    Carpool.find({giver: {$ne: username}, recievers: {$ne: username}, date: {$gt: todayDate}}).then((results)=> {
        res.render('dashboard',{
            user: req.user,
            username,
            carpools: results
        })
    })
    
})

router.get('/profile/:id',ensureAuthenticated, async (req,res)=>{
    let id = req.params.id
    const user = await User.findOne({"_id":id})
    const carpoolAccepted = await Carpool.find({recievers: {$in: [req.user.username]}})
    const carpoolListed = await Carpool.find({giver: req.user.username})
    res.render('profile', {user, carpoolAccepted, carpoolListed})
    
})

module.exports = router 
