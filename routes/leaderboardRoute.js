const express = require('express')
const router  = express.Router()
const User = require('../models/User')

router.get('/', (req,res)=> {
    User.find({}, (err, allUsers)=> {
        if (err) throw err 
        res.render('leaderboard', {allUsers})
    }).sort({points: -1})
})
module.exports = router