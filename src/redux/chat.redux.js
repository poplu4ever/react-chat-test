import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')


const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    users:{},
    unread:0,
}

/*Reducer Function*/

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.to === action.userid?1:0 //判断是否属于我方收到的信息
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,num} = action.payload
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from===v.from?true:v.read})) ,unread:state.unread-num}
        default:
            return state
    }
}

/*Operation Function*/

export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    console.log(res) //查看res的数据结构
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msg,res.data.users,userid))
                }
            })
    }
}


export function readMsg(from){
    return (dispatch, getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user._id
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgRead({from,userid,num:res.data.num}))
                }
            })
    }
}

export function recMsg(){
    return (dispatch,getState)=>{
        socket.on('receMsg',function(data){
            console.log('返回值:',data)
            const userid = getState().user._id
            console.log('当前登陆为:',userid)
            dispatch(msgRece(data,userid))
        })
    }
}


export function sendMsg(from,to,msg){
    console.log(from,to,msg)
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
}

/*Action Creator*/

/*
* @variable
* from:当前聊天对象的ID
* userid:当前登陆用户的ID
* num:被修改的未读消息数量
* */
function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}

function msgRece(msg,userid){
    return {userid,type:'MSG_RECV',payload:msg}
}

function msgList(msgs,users,userid){
    return {type:'MSG_LIST',payload:{msgs,users,userid}}
}