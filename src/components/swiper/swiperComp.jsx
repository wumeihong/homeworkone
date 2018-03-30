import React,{Component} from 'react'
import Swiper from 'swiper'
import "swiper/dist/css/swiper.css"

let img1 = require('../../static/images/b_02.jpg')

class SwiperComponent extends Component{
    render(){
        return <div className="swiper-container" ref="scDom">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={img1} alt=""/></div>
                <div className="swiper-slide"><img src={img1} alt=""/></div>
                <div className="swiper-slide"><img src={img1} alt=""/></div>
                <div className="swiper-slide"><img src={img1} alt=""/></div>
                <div className="swiper-slide"><img src={img1} alt=""/>></div>
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true,
            time:1000
        })
    }
}
export default SwiperComponent