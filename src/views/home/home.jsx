import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperComponent from '../../components/swiper/swiperComp'
import './home.less'
import GoodsItem from '../../components/goodsComp/goodsItem'

class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling=this.scrolling.bind(this)
    }
    toSearch(){
        let {history} = this.props;
        history.push('/index/search')
    }
    render(){
        return <div id="home" onScroll={this.scrolling} ref="scroller">
            <div ref="doc">
            <header>
               <a href="#"><img src="/src/static/images/a_03.jpg" alt=""/></a>
               <a href="#"><input type="text" placeholder="请输入您想要购买的商品"onFocus={this.toSearch}/></a>
               <a href="#"><i className="iconfont icon-home"></i>我的店铺</a>
               <a href="#"><i className="iconfont icon-cart"></i>消息</a>
           </header>
            <div>
                <SwiperComponent></SwiperComponent>
            </div>
            <div className="home-cat ks-clear">
                <dl>
                    <dt><img src={require("../../static/images/c_03.jpg")}/></dt>
                    <dd>家乡味道</dd>
                </dl>
                <dl>
                    <dt><img src={require("../../static/images/d_03.jpg")}/></dt>
                    <dd>进口食品</dd>
                </dl>
                    <dl>
                    <dt><img src={require("../../static/images/e_03.jpg")}/></dt>
                    <dd>家乡味道</dd>
                </dl>
                <dl>
                    <dt><img src={require("../../static/images/f_03.jpg")}/></dt>
                    <dd>进口食品</dd>
                </dl>
                    <dl>
                    <dt><img src={require("../../static/images/c_03.jpg")}/></dt>
                    <dd>家乡味道</dd>
                </dl>
                <dl>
                    <dt><img src={require("../../static/images/d_03.jpg")}/></dt>
                    <dd>进口食品</dd>
                </dl>
                    <dl>
                    <dt><img src={require("../../static/images/e_03.jpg")}/></dt>
                    <dd>家乡味道</dd>
                </dl>
                <dl>
                    <dt><img src={require("../../static/images/f_03.jpg")}/></dt>
                    <dd>进口食品</dd>
                </dl>
            </div>
            <div className="goods-list ks-clear">
                {
                    this.state.goodslist.map((item,index) =>{
                            return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                    })
                        
                }
                
            </div>
                <p className="last" ref="last">已经到底啦</p>
            </div>
        </div>
    }
    componentDidMount(){
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodslist:JSON.parse(res).data.data
            })
        })
        //scrollTop+windowHeight=documentHeight
    }
    scrolling(){
        let {last} = this.refs
        if(this.state.channel_id>9){
            last.style.display="block"
        };
        if(!this.state.caniquery) return;
        let {scroller,doc} = this.refs
        let st=scroller.scrollTop ;
        let sw=scroller.offsetHeight;
        let dh = doc.offsetHeight;
        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            console.log("满足条件,请求数据")
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} =this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
             .then(res=>{
                 console.log(goodslist)
                this.setState({
                    goodslist:[...goodslist,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
        
    }
}
export default Home