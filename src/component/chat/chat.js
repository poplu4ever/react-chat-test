import React,{Component} from 'react'
import io from 'socket.io-client'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recMsg,readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../util";
import {getEmoji} from "../../util";
// import Item from "antd-mobile/es/popover/Item";

//因为跨域所以要进行设置
const socket = io('ws://localhost:9093')


@connect(
    state=>state,
    {getMsgList,sendMsg,recMsg,readMsg}
)
class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[],
            emojiShow:false
        }
    }

    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recMsg()
        }
    }

    //在离开聊天页面的时候触发消除未读数量的方法
    componentWillUnmount(){
        const to = this.props.match.params.user//每次打开chat页面，获得当前聊天对象的id
        this.props.readMsg(to)//
    }

    //修复emoji显示的问题
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    handleSubmit() {
        // socket.emit('sendmsg',{text:this.state.text})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        // console.log(from,to,msg)
        this.props.sendMsg(from,to,msg)
        this.setState({text:''})

    }


    render(){
        // console.log(this.props)

        const emoji = getEmoji()

        const userid = this.props.match.params.user //获得聊天对象的id
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }

        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid) //对显示的聊天信息根据聊天id进行过滤
        return(
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>


                {chatmsgs.map(d=>{
                    const avatar = require(`../img/${users[d.from].avatar}.png`)
                    return d.from === userid?(
                        <List key={d._id}>
                            <Item
                               thumb={avatar}
                            >{d.content}</Item>
                        </List>
                    ):(
                        <List key={d._id}>
                            <Item
                                extra={<img src={avatar}/>}
                                className='chat-me'>{d.content}</Item>
                        </List>
                    )
                })}
                <div className ='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{
                                            this.setState({
                                                emojiShow:!this.state.emojiShow
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😀</span>
                                    <span onClick={() => {
                                        this.handleSubmit()
                                    }}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.emojiShow?
                        <Grid
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text + el.text
                                })
                            }}
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                        />:null}
                </div>
            </div>
        )
    }
}

export default Chat