import React, {Component} from 'react'
import {connect} from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import CartItem from '../../components/cartItem/cartItem'
import './cart.less'

class Cart extends Component {
    constructor(){
         super()
         this.state={
             str:"all",
             edit:"编辑",
             pay:"结算"
         }   
        this.cartEdit=this.cartEdit.bind(this)
        this.toDelGoods=this.toDelGoods.bind(this)
    }
    render() {
        let {cartList,totalCost,selectAll, toggleSelectAll} = this.props
        let {str,edit,pay} = this.state
        console.log(cartList)
        return <div className='box'>
            <header className='shopcar_header'>
                <p>
                    <i className='iconfont icon-xiangzuo'></i>
                </p>
                <p>
                    <span>购物车</span>
                </p>
                <p>
                    <span onClick={this.cartEdit}>{edit}</span>
                    <i className='iconfont icon-xiaoxi'></i>
                </p>
            </header>
            <section>
                <div className='shopcar_content'>
                    <ul>
                        {
                            cartList.map((item,index) => {
                            return <CartItem key={index} item={item}></CartItem>                                 
                            
                        })
            }
                    </ul>
                </div>
            </section>
            <footer>
                <div className='shopcar_bottom'>
                    <div className="selectall" onClick={()=>{
                        this.setState({
                            str:str=="all"?'none':'all'
                        });
                       toggleSelectAll(str)
                        }}>全选<span  className={'iconfont '+(selectAll?'icon-shezhi':"")}></span></div>
                    <div>总价<span>{totalCost}</span><span className="cart-btn" onClick={this.toDelGoods}>{pay}</span></div>
                </div>
            </footer>
        </div>
    }
    componentDidMount() {
       this.props.fetchGoodsList(this.props.history)
    }
    cartEdit(){
        this.setState({
            edit:this.state.edit=="编辑"?"完成":"编辑",
            pay:this.state.pay=="结算"?"删除":"结算"
        })    
    }
    toDelGoods(){
        if(this.state.pay=="结算") return;
        let selectedID=[];
        this.props.cartList.forEach(item=>{
            if(item.selected==1){
                selectedID.push(item.goods_id)
            }
        })
        console.log(selectedID)
        this.props.delCartGoods(selectedID)
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)