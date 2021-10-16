const express = require('express')
const router = express.Router()
const passport = require('passport')
const {ensureAuthenticated,forwardAuthenticated} = require('../config/auth')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')
router.get('/', forwardAuthenticated,(req,res)=> {
    res.render('index')
})

router.get('/register',forwardAuthenticated,(req,res)=>{
    res.render('register')
})

router.get('/login',forwardAuthenticated,(req,res)=>{
    res.render('login')   
})

router.post('/register',(req,res)=>{      
    const {fullname, username,email,password,password2} = req.body
    let errors = []
    if(password.length < 6){
        errors.push({msg: "Password don't match character length"})
    }
    if(password !== password2){
        errors.push({msg:"Passwords don't match"})
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            fullname,
            username,
            email,
            password,
            password2
        })
    }   
    else{
        User.findOne({
            email: email,
            username:username
        })
        .then(
            user=>{
                if(user){
                    errors.push({msg:'User is already registered'})
                    res.render('register',{
                        errors,
                        fullname,
                        username,
                        email,
                        password,
                        password2
                    })
                }
                else{
                    const new_User = new User({
                        fullname,
                        username,
                        email,
                        password
                    })
                    bcryptjs.genSalt(16,(err,salt)=>{
                        bcryptjs.hash(new_User.password,salt,(err,hash)=>{
                            if (err) throw err;
                            new_User.password = hash
                            new_User.save()
                            .then(
                                console.log('User is registered'),
                                res.redirect('/login')
                            )
                            .catch(err=>{
                                console.log(err)
                            })
                        })
                    })
                }
            }
        )
    }
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req,res,next)
})
router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})
module.exports=router