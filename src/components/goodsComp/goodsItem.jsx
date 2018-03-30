import React,{Component} from 'react'
import $http from'../../utils/http'
import Lazyload from 'react-lazyload'
import {getCookie} from '../../utils/utils'
import {T} from 'react-toast-mobile'
import Toast from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'
import {connect}  from 'react-redux'
import {ADD_CART} from './../../store/reducers'
class Placeholder extends Component{
    render(){
        return <img src={require('../../static/images/c_03.jpg')}alt=""/>
    }
}

class GoodsItem extends Component{
     constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let {data} = this.props;
        return <dl className="goods-item" onClick={()=>{this.toDetail(data.goods_id)}}>
            {/*debounce={100} 这是让图片有延迟一点的时间再显示请求来的图片,一开始是用默认的图片 这个属性是加在palceholder 里面的，不加也可以，placrholder 所在的父元素上面，一定要有overflow:auto;这个属性 */}
            <dt><Lazyload overflow once height={'100%'} placeholder={<Placeholder></Placeholder>}><img src={"http://www.lb717.com"+data.obj_data} alt=""/></Lazyload></dt>
            <dd>
                <p className="goods-detail">{data.goods_name}</p>
                <p><span className="goods-price">{data.discount_price}</span><span onClick={this.addCart} className="iconfont icon-cart"></span></p>
                <Toast/>
            </dd>
        </dl>
    }
    addCart(e){
        e.stopPropagation()//这是为了阻止在点击购物车的时候。跳转到详情页,通过冒泡来阻止
        let {data} =this.props
        if(getCookie('token')){
             $http.post('/user/Cart/addCart',{
                goods_id:data.goods_id,
                goods_info:data, 
                token:getCookie('token')
             })
            .then((res)=>{
                console.log(res)
                if(res==1){
                  T.notify('购物车添加成功')
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            selected:0
                        }
                    })
                }else{
                    T.notify(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:2000,
                        className:"test"
                    })
                    let {history,location} = this.props
                    history.push('/loggin',{
                        from:location.pathname
                    })
                }
                
            })
        }else{
            let {history,location} = this.props
            history.push('/loggin',{
                from:location.pathname
            })
        }
       
        console.log(document.cookie)//这个是可以在控制台看到token数据
    }
    toDetail(goods_id){
        console.log(goods_id)
        this.props.history.push('/detail?goods_id='+goods_id,{
            goods_id:goods_id
        })
        
    }

}
export default connect(null)(GoodsItem)