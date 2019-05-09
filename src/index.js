import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux' 
import thunk from 'redux-thunk'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import reducers from './reducers'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

import './index.css'

//初始化redux调试工具
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevTools
))
    
ReactDom.render(

    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat/:user' component={Chat}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')

)