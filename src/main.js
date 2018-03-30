import React,{Component} from "react"
import ReactDOM from 'react-dom'
console.log(process.env)
import {Provider} from 'react-redux'
import store from './store/store'

import router from './router/router.config'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import RouterWraper from './components/routeWraper'
import "./static/css/reset.css"
import "./static/css/common.css"
import './static/css/goodsItem.less'

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Switch>
       <Redirect exact from="/" to="/index/home"></Redirect>
       <RouterWraper routes={router.routes}></RouterWraper>
    </Switch>
</BrowserRouter>
</Provider>,document.querySelector("#root"))
