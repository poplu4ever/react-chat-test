import React,{Component} from 'react'
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types'


class AvatarSelector extends Component{
    static PropTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v=>({ //返回的是一个对象
             icon:require(`../img/${v}.png`),
             text:v
        }))
        
        const getHeader = this.state.text?(<div>
                                            <span>已选择头像</span>
                                            <img src={this.state.icon} alt=''/>
                                           </div>)
                                         :<div>请选择头像</div> 
        return ( 
            <div>
            {getHeader}
            <Grid 
                data={avatarList} 
                columnNum={5}
                onClick={elm=>{
                    this.setState(elm)                      
                    this.props.selectAvatar(elm.text)
                }}/>    
                头像选择
            </div>
        )
    }
}

export default AvatarSelector