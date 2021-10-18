const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const Message = require('../models/Message')


router.get('/', ensureAuthenticated, (req,res)=> {
    Message.find({}).then((msgs)=>{
        res.render('chat', {user:req.user, msgs})
    })

    
})


module.exports = router