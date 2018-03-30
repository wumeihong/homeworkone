import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import{Redirect} from 'react-router-dom'
import {getCookie} from '../utils/utils'
function isLogin(){
   return !!getCookie('token')
}
class RouterWraper extends Component{
    render(){
        //这个是从外界传进来的 封装这个组件就是为了方便调用，传不同的routes
         const {routes} = this.props
        return routes.map((item,index)=>{
                return <Route path={item.path} exact={item.exact} key={index} render={(location)=>{
                        return item.authorization && !isLogin()?<Redirect to={{pathname:'/loggin',state:{from:item.path}}}></Redirect>:<item.component {...location} routes={item.children}></item.component>
                    }}></Route>
            })
    }
}
export default RouterWraper
