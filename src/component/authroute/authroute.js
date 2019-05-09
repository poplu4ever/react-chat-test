import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends Component{
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        console.log(this.props)

        if(publicList.indexOf(pathname)>-1){
            return null
        }
        console.log(this.props.history)
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status===200){
                    if(res.data.code===0){
                        //有登陆信息
                        console.log("有消息")
                        this.props.loadData(res.data.data)
                    }else{ 
                        this.props.history.push('/login')}
                }
        })
        //是否登陆
        //现在的url地址 
        //用户身份的type 身份是boss还是牛人
        //用户是否信息完善（完善头像）
    }
    
    render(){
        return null
    }
}

export default AuthRoute