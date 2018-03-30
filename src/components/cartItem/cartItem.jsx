import React,{Component} from 'react'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'

class CartItem extends Component{
    constructor(){
        super()
        this.toggleSelect= this.toggleSelect.bind(this)
    }
    render(){
        let {toggleSelect,updateCount,item} = this.props
        return (
                 <li>
                            <p>
                                <span onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}}className={'iconfont '+(item.selected==0?"":"icon-shezhi")}></span>
                            </p>
                            <dl>
                                <dt><img src={"http://www.lb717.com/"+item.obj_data}/></dt>
                                <dd>
                                    <p>{item.goods_name}</p>
                                    <p>X{item.count}</p> 
                                    <p>
                                        <span>￥{item.discount_price}</span>
                                        <span>
                                            <button onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</button>
                                            <b>{item.count}</b>
                                            <button onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</button>
                                        </span>
                                    </p>
                                </dd>
                            </dl>
                    </li>
        )
    }
    toggleSelect(){
        let {selectedClass} = this.state
        console.log(selectedClass)
    }
}
export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)