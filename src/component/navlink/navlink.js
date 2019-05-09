import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

//NavLinkBar不在路由内，需要用withRouter获取路径
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        return(
            <TabBar> 
                {navList.map(v=>( //直接返回值，箭头函数用小括号
                    <TabBar.Item
                        badge={v.path === '/msg'?this.props.unread:0}//显示未读信息数量
                        key={v}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                 ))}
            </TabBar>
        )
    }
}

export default NavLinkBar