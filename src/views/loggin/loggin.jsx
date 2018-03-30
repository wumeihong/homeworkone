import React,{Component} from 'react'
import $http from '../../utils/http'
import './loggin.less'
import { connect } from 'react-redux';
import mapDispatchToProps from './dispatch'

class Loggin extends Component{
	constructor(){
		super()
		this.toLogin=this.toLogin.bind(this)
		this.fromRegister=this.fromRegister.bind(this)
	}
	render(){
		return <div className='box'>
			<header className='register_header'>
				<span className='iconfont icon-wodedianpu'></span>
				<span>登录717</span>
				<span onClick={this.fromRegister}>注册</span>
			</header>
			<section className='register_section'>
				<p><i className='iconfont icon-gaiicon'></i><input type="text" placeholder='请您输入手机号' ref='username'/></p>
				<p><i className='iconfont icon-shezhi'></i><input type="password" placeholder='请您输入密码' ref='password'/></p>
				<p className='hide' ref='show'>账号/密码输入错误，请重新输入</p>
				<p><button onClick={this.toLogin}>立即登录</button></p>
			</section>
		</div>
	}
	toLogin(){
		$http.post('/user/login',
		{
			username:this.refs.username.value,
			password:this.refs.password.value
		}).then(res =>{
			console.log(res)
			if (res.success==1){
				//把用户信息存储一份到store中
				this.props.saveUser(res.user);
				//把用户信息存储一份到localStorage中
				localStorage.setItem('user-info',JSON.stringify(res.user))
				//登录成功之后判断跳转的页面
				let from =this.props.location.state?this.props.location.state.from || 'index/home':'/index/home';
				document.cookie='token='+res.token
				this.refs.show.className='hide'
				this.props.history.push(from)
			} else {
				//失败的时候显示
				this.refs.show.className=''
			}
		})
	}
	fromRegister(){
		this.props.history.push('/registers')
	}
}
export default connect(null,mapDispatchToProps)(Loggin)