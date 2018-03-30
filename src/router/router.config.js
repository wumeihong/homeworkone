//一级路由
import Index from '../views/index'
import Detail from '../views/detail'
import Loggin from '../views/loggin'
import Registers from '../views/registers'
import Setting from '../views/setting'
//二级路由
import Home from '../views/home'
import Catagory from '../views/catagory'
import Cart from '../views/cart'
import Mine from '../views/mine'
import Consignee from '../views/consignee'
import DeliveryList from '../views/deliveryList'
import Search from '../views/search'
import Result from '../views/result'


let router={
    routes:[
        {
            path:"/index",
            component:Index,
            //exact:true,
            children:[
                {
                    path:"/index/home",
                    component:Home
                },
                {
                    path:"/index/catagory",
                    component:Catagory
                },
                {
                    path:"/index/cart",
                    component:Cart,
                    authorization:true
                },
                {
                    path:"/index/mine",
                    component:Mine,
                    authorization:true
                },
                {
                    path:"/index/search",
                    component:Search
                },
                {
                    path:"/index/result",
                    component:Result
                }
            ]
        },
        {
            path:"/detail",
            component:Detail
        },
        {
             path:"/loggin",
            component:Loggin
        },
        {
            path:"/registers",
            component:Registers
        },
        {
            path:"/setting",
            component:Setting
        },
        {
            path:"/consignee",
            component:Consignee
        },
        {
            path:"/deliveryList",
            component:DeliveryList
        }

       
    ]
}

export default router