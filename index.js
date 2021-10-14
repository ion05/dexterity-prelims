const express = require('express')
const ejs = require('ejs')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "static")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 5000 || process.env.PORT
const mongoURI = `mongodb+srv://ion05:${process.env.MONGO_PASS}@cluster0.s9rpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(String(mongoURI), {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result)=> {
    console.log('Connected to mongoDB')
    app.listen(PORT, err=> {
        console.log(`App running on ${PORT}`);
        if (err) throw err
    })
}).catch((err)=>console.log(err))



const indexRoute = require('./routes/indexRoute')

app.use('/', indexRoute)