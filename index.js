const express = require('express')
const ejs = require('ejs')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const http = require('http')
const {Server} = require('socket.io');
const User = require('./models/User')
const Message = require('./models/Message')

const app = express()
const server = http.createServer(app);
const io = new Server(server)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "static")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//sessions
app.use(session({
    secret : process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

const PORT = 5000 || process.env.PORT
const mongoURI = `mongodb+srv://ion05:${process.env.MONGO_PASS}@cluster0.s9rpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(String(mongoURI), {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result)=> {
    console.log('Connected to mongoDB')
    server.listen(PORT, err=> {
        console.log(`App running on ${PORT}`);
        if (err) throw err
    })
}).catch((err)=>console.log(err))


// Socket stuff

io.on('connection', (socket)=> {
    let userName = ""
    console.log('a user connected')
    socket.on('user_connect', (username)=> {
        userName = username
        
    })
    socket.on('chat message', (msg)=> {
        // let totalmsg = `
        // Sender:  ${userName} Msg: ${msg}
        // `
        let totalmsg = {
            sender: userName,
            msg: msg
        }
        io.emit('chat message', totalmsg)
        const newMessage = new Message({
            msg: msg,
            username: userName
        })
        newMessage.save().then((result)=> {
            console.log('message saved')
        })
        
    })
    socket.on('disconnect', ()=> {
        console.log('a user disconnected')
    })
})


const indexRoute = require('./routes/indexRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const leaderboardRoute = require('./routes/leaderboardRoute')
const carpoolRoute = require('./routes/carpoolRoute')
const chatRoute = require('./routes/chatRoute')

app.use('/', indexRoute)
app.use('/dashboard',dashboardRoute)
app.use('/carpool', carpoolRoute)
app.use('/leaderboard', leaderboardRoute)
app.use('/chat', chatRoute)
app.get('*',(req,res)=>{
    res.send('404')
})