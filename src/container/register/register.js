import React,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
    state=>state,
    {register}
)
class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'boss'
        }
        this.register = this.register.bind(this)
    }
    
    register(){
//        console.log(this.state)
        this.props.register(this.state) 
        console.log(this.props)
    }
    
    handleChange(key,value){
        this.setState({
            [key]:value})
    }

    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/>:null}
                <Logo />
                <h2>注册页</h2>
                <WingBlank/>
                    <List>
                        {this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.handleChange('user',v)}
                            >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v=>this.handleChange('pwd',v)}
                            >密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v=>this.handleChange('repeatpwd',v)}
                            >确认密码</InputItem>
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange={v=>this.handleChange('type','genius')}
                            >牛人</RadioItem>
                        <RadioItem 
                            checked={this.state.type ==='boss'}
                            onChange={v=>this.handleChange('type',"boss")}
                            >BOSS</RadioItem>
                    </List>
                        <Button onClick={this.register} type='primary'>注册</Button>
            </div>       
        )
    }
}

export default Register