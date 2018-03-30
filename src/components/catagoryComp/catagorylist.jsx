import React,{Component} from 'react'
import './catagorylist.less'
import Lazyload from 'react-lazyload'

class ListItem extends Component{
    render(){
        let {data,idx} = this.props
        
        return <div id="catagorywrap">
            <dl className="list-item" onClick={this.goToDetail}>
                <dt><Lazyload><img src={data.images} alt=""/></Lazyload></dt>
                <dd>
                    <p>{data.title}</p>
                </dd>
            </dl>
        </div> 
        
    }
    componentDidMount(){
        this.setState({
            img:this.props.data.images
        })
    }
}
export default ListItem