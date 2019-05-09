import React,{Component} from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
        
    componentDidMount(){
        this.props.getUserList('genius')
    }
    
    render(){
        console.log('Boss页面',this.props)
        return(
            <UserCard userList={this.props.userList}></UserCard>
        )
    }

}

export default Boss