import React,{Component} from 'react'
import './catagory.less'
import $http from '../../utils/http'

//import ListItem from '../../components/catagoryComp/catagorylist'
class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0,
            data:[]    
        }
    }
    render(){
        let catList=['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        let {data} = this.state;
        return <div id="catagory">
            <header><input type="text" placeholder="搜你想搜的"/></header>
            <div className="catagory-wrap ks-clear">
                <div className="left-side">
                    <ul>
                       {
                           catList.map((item,index)=>{
                               return <li className={this.state.activeIndex==index?'active':""} key={index} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                           })
                       }
                    </ul>
                </div>
                <div className="right-side">
                    {
                        data.map((file,ind) =>{
                            return <dl key={ind}>
                                <dt><img src={file.images}/></dt>
                                <dd>{file.tit}</dd>
                            </dl>
                        })
                    }
                </div>
            </div>
           
        </div>
    }
    componentDidMount(){
         $http.get('/mobile/Category/categorySon',{id:1}).then(res =>{
            this.setState({
                data:res.category_list
            })
        })
    }
    toggleActive(idx){
        this.setState({
            activeIndex:idx
        })
        $http.get('/mobile/Category/categorySon',{id:idx+1}).then(res =>{
            this.setState({
                data:res.category_list
            })
        })
    }

}
export default Catagory