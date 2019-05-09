import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state=>state
)
class Msg extends Component{
    getLast(arr){
        return arr[arr.length-1]
    }

    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id //获得当前登陆用户的id
        const userinfo = this.props.chat.users//获得所有注册用户的信息

        console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        console.log('查看分组',msgGroup)

        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })//将对象的属性组合成数组，并排序
        //按照聊天用户分组，根据chatid

        console.log('查看分组类',chatList)
        return(
            <div>
                    {chatList.map(v=>{
                        console.log(v)
                        const lastItem = this.getLast(v)
                        const targetId = lastItem.from === userid?lastItem.to:lastItem.from
                        const unreadNum = v.filter(v=>!v.read&&v.to===userid).length

                        const name = userinfo[targetId]?userinfo[targetId].name:"null"//验证用户名是否存在
                        const avatar = userinfo[targetId]?userinfo[targetId].avatar:"null"//验证用户名是否存在

                        return(
                            <List
                                key={lastItem._id}
                            >
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${avatar}.png`)}
                                    arrow="horizontal"
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>
                                </Item>
                            </List>

                        )
                    })}
            </div>
        )
    }
}


export default Msg