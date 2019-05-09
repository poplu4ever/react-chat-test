import React,{Component} from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'


@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:''
        }
    }
    
    onChange(key,value){
         this.setState({
            [key]:value    
         })
    }
    
    selectAvatar(avatarName){
        this.setState({
            avatar:avatarName
        })
    }
    
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={imgName=>{
                        this.setState({
                            avatar:imgName
                    })
            }}
                ></AvatarSelector>
                <InputItem onChange={v=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem 
                    onChange={v=>this.onChange('desc',v)}
                    title='个人简介'
                    row={3}
                    autoHeight>
                </TextareaItem>
                <Button 
                    onClick={()=>{
                        this.props.update(this.state)     
                    }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo