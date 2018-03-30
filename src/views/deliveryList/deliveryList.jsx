import React,{Component} from 'react'
import './deliveryList.less'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'
import {connect} from 'react-redux'
import  mapDispatchToProps from './dispatch'
import mapStateToProps from './state'

class DeliveryList extends Component{
    constructor(){
        super()
        this.toConsign=this.toConsign.bind(this)
    }
    render(){
        let {deliveryList} = this.props
        console.log(deliveryList)
        return (
            <div id="delivery">
                <header><h1>收货地址</h1></header>
                <section>
                    {deliveryList.length==0?
                        <p>目前没有邮寄地址信息</p>
                        :
                        <ul>
                             {deliveryList.map((item,index) =>{
                                return (
                                    <li key={index}>
                                        <p>{item.name+""+item.phone}</p>
                                        <p>{item.province+item.city+item.region}</p>
                                        <div><span onClick={()=>{this.toEdit(index)}}>编辑</span><span onClick={()=>{this.toEdit(index)}}>删除</span></div>
                                    </li>
                                )
                            })} 
                        </ul>
                    }
                    
                </section>
                <button className="common-btn" onClick={this.toConsign}>添加地址</button>
            </div>
        )
    }
    toConsign(){
        this.props.history.push('./consignee')
    }
    componentWillMount(){
        this.props.getDelivery()
        // $http.post('/user/Mail/list',{token:getCookie('token')}).then(res=>{
        //     let Ores = JSON.parse(res)
        //     console.log(Ores.username)
        //     let reOres = JSON.parse(Ores.data)
        // })
    }
    toEdit(index){
        this.props.toEditDelivery(index)
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(DeliveryList)