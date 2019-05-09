import React,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state,
    {login}
)
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    
    handleLogin(){
        this.props.login(this.state)
    }
    
    register(){ 
        console.log(this.props)
        this.props.history.push('/register')
    }
    
    handleChange(key,value){
        this.setState({
            [key]:value})
    }
    
    render(){
        return(
            <div>
            {(this.props.user.redirectTo&&this.props.user.redirectTo!=='/login')?<Redirect to={this.props.user.redirectTo}/>:null}
                <Logo />
                <h2>登陆页</h2>    
                <WingBlank>
                    <List>   
                    {this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace/> 
                        <InputItem
                            onChange={v=>this.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type='primary'>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>       
        )
    }
}

export default Login