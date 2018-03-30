import React,{Component} from 'react'
import './index.less'
import '../../static/css/reset.css'
import '../../static/font/iconfont.css'
import $http from "../../utils/http"
import RouterWraper from '../../components/routeWraper';
import { NavLink } from 'react-router-dom';
class Index extends Component{
    render(){
        let {routes} = this.props;
        return <div id="box" className='box'>
           <section>
               <RouterWraper routes={routes}></RouterWraper>
           </section>
           <footer>
                <ul>
                    <li>
                        <NavLink to={{pathname:"/index/home"}} activeClassName="tab-active">
                            <span><i className="iconfont icon-home"></i></span>
                            <span>首页</span>
                        </NavLink>
                    </li>
                    <li>
                         <NavLink to={{pathname:"/index/catagory"}} activeClassName="tab-active">
                            <span><i className="iconfont icon-fenlei"></i></span>
                            <span>分类</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{pathname:"/index/cart"}} activeClassName="tab-active">
                            <span><i className="iconfont icon-cart"></i></span>
                            <span>购物车</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{pathname:"/index/mine"}} activeClassName="tab-active">
                            <span><i className="iconfont icon-gaiicon"></i></span>
                            <span>我的</span>
                        </NavLink>
                    </li>

                </ul>
           </footer>
        </div>
    }
    componentDidMount(){
        $http.get("/server/test.json","")
        .then(data=>{console.log(data)})
        
    }
}
export default Index