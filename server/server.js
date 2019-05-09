const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const app = express()

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    // console.log('user login')
    socket.on('sendmsg',function(data){
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            // console.log(doc)
            io.emit('receMsg', Object.assign({},doc._doc)) //mogoose的一种数据展示形式，_doc返回doc中所有数据
        })
    })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.get('/', function(req,res){
    res.send('<h1>Hi This is a info</h1>')
})

server.listen(9093,function(){
    console.log('Node app runs here at port 9093')
}) 