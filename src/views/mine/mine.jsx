import React,{Component} from 'react'
import './mine.less'
import {connect} from 'react-redux'
import mapStateToProps from './state'
let img1 = require('../../static/images/b.jpg')
class Mine extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
        this.toSetting=this.toSetting.bind(this)
        this.toDeliveryList=this.toDeliveryList.bind(this)
    }
    render(){
        let {userInfo} = this.props;
        console.log(userInfo)
        let {data} = this.state;
        return <div id="mine">
            <header>
                <h3><span className="iconfont icon-shezhi" onClick={this.toSetting}></span>我的717商城</h3>
                <p><img src={img1} alt=""/></p>
                <p className="cname">吴美红</p>
            </header>
            <section>
                <p><span className="iconfont icon-wodedianpu"></span>我的店铺</p>
                <div className="icon">
                    <a href="#">
                        <i className="iconfont icon-ziyuan"></i>
                        <span>代付款</span>
                    </a>
                     <a href="#">
                        <i className="iconfont icon-daishouhuo"></i>
                        <span>代发货</span>
                    </a>
                     <a href="#">
                        <i className="iconfont icon-zhanghuyue"></i>
                        <span>代付款</span>
                    </a>
                     <a href="#">
                        <i className="iconfont icon-wodekefu"></i>
                        <span>售后</span>
                    </a>
                     <a href="#">
                        <i className="iconfont icon-wodedingdan"></i>
                        <span>我的订单</span>
                    </a>
                </div>
                <div className="qita">
                    <p>
                        <i className="iconfont icon-zhanghuyue"></i> 账户余额
                    </p>
                    <p onClick={this.toDeliveryList}>
                        <i className="iconfont icon-dizhi"></i> 地址管理
                    </p>
                    <p>
                        <i className="iconfont icon-wodekefu"></i> 我的客服
                    </p>
                </div>
                <div className="hot">
                    <h1>热门推荐</h1>
                    <div className="photo"  key="index">
                        {
                            data.map((item,index)=>{
                                return <dl key={index}>
                                    <dt><img src={item.img} alt=""/></dt>
                                    <dd>{item.info}</dd>
                                </dl>
                            })
                        }
                    </div>
                    
                </div>
            </section>
        </div>
    }
    componentDidMount(){
        fetch('/server/myfamily.json').then(res=>res.json()).then(res=>{
           this.setState({
               data:res
           })
        })
    }
    toSetting(){
        this.props.history.push('/setting')
    }
    toDeliveryList(){
         this.props.history.push('/deliveryList')
    }
}
export default connect(mapStateToProps)(Mine)