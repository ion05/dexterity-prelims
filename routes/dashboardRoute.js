const express=  require('express')
const router = express.Router()
const {ensureAuthenticated,forwardAuthenticated} = require('../config/auth')
router.get('/',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user.name,
        id : req.user.id
    })
})

router.get('/profile/:id',ensureAuthenticated,(req,res)=>{
    let id = req.user.id
    res.render('profile')
})

module.exports = router 