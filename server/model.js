const mongoose = require("mongoose")
const DB_URL = 'mongodb://localhost:27017/imooc-char'

mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        'avatar': {'type': String},
        'desc': {'type': String},
        'title': {'type': String},
        // 如果你是boss 还有两个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'chatid': {'type': String, 'required': true},
        'from': {'type': String, 'required': true},
        'to': {'type': String, 'required': true},
        'read': {'type': Boolean, 'default': false},
        'content': {'type': String, 'required': true, 'default':''},
        'create_time': {'type': Number, 'default': Date.now()}
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports ={
    getModel:function(name){
        return mongoose.model(name)
    }
}