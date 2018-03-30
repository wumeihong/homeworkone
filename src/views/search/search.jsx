import React,{Component} from 'react'
import {connect} from 'react-redux'
import './search.less'
class Search extends Component{
    constructor(){
        super()
        this.state={
            historylist:[]
        }
        this.toSearch=this.toSearch.bind(this)
        this.toResult=this.toResult.bind(this )
        this.clearHistory=this.clearHistory.bind(this)
        this.testSaga=this.testSaga.bind(this)
        this.Back=this.Back.bind(this)
    }
    render(){
        let {historylist} = this.state;
        let {goodList} = this.props;
        console.log(goodList)
        return <div id="search">
            <header><i className="iconfont icon-shezhi" onClick={this.Back}></i><input type="text" ref="keyWords" placeholder="搜你想搜的"/><button onClick={this.toSearch}>搜索</button></header>
            <section className="recent-search">
                <p>最近搜索  <span onClick={this.clearHistory} className="iconfont icon-shanchu"></span></p>
                {
                    historylist.length==0?<p className="no">暂无搜索记录...</p>: <ul className="ks-clear">
                    {this.state.historylist.map((item,index)=>{
                        return <li  key={index}  onClick={()=>{this.toResult(item)}}>{item}</li>
                    })}
                </ul>
                
                }
               
            </section>
            <section className="common-search">
                <p>大家都在搜</p>
                <ol className="ks-clear">
                    <li onClick={this.testSaga}>点我测试saga中间件</li>
                     <li>巧克力</li>
                      <li>鸡蛋</li>
                       <li>牛肉</li>
                        <li>羊肉</li>
                </ol>
                <p>通过saga请求的数据,将异步转同步,并且渲染结果:{goodList.data && goodList.data.data[0].goods_name}</p>
            </section>
        </div>
    }
    toSearch(){
       if(!this.refs.keyWords.value) return;
       let keyWords=this.refs.keyWords.value;
       let ls =localStorage;
       if(ls.getItem('SearchHistory')){
            let shArr = JSON.parse(ls.getItem('SearchHistory'))
            if(shArr.indexOf(keyWords)>-1) return;
            shArr.push(keyWords)
            ls.setItem('SearchHistory',JSON.stringify(shArr))
       }else{
           ls.setItem('SearchHistory',JSON.stringify([keyWords]))
       }
       this.props.history.push('/index/result',{
        key_words:keyWords
       })
       
    }
    toResult(keyWords){
         this.props.history.push('/index/result',{
        key_words:keyWords
       })
    }
    componentDidMount(){
        if(localStorage.getItem('SearchHistory')){
            this.setState({
                historylist:JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory');
        this.setState({
            historylist:[]
        })
    }
    testSaga(){
        this.props.dispatch({
            type:"GET_GOODS_LIST"
        })
    }
    Back(){
        this.props.history.push('/index/home')
    }

}
export default connect(function(state){
    return {
       goodList:state.goods_list
    }
})(Search)