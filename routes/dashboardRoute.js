const express=  require('express')
const router = express.Router()
const {ensureAuthenticated,forwardAuthenticated} = require('../config/auth')
const User = require('../models/User')
const Carpool = require('../models/Carpool')

router.get('/',ensureAuthenticated,(req,res)=>{
    const username = req.user.username
    Carpool.find({giver: {$ne: username}}).then((results)=> {
        console.log(results)
        res.render('dashboard',{
            user: req.user,
            carpools: results
        })
    })
    
})

router.get('/profile/:id',ensureAuthenticated, async (req,res)=>{
    let id = req.params.id
    User.findOne({"id":id}).then((result)=> {
        res.render('profile', {user:result})
    })
    
})

module.exports = router 