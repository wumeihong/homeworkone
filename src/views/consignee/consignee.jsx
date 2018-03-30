import React,{Component} from 'react'
import './consignee.less'
import propTypes from 'prop-types'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'

class Input extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <input type="text" onChange={this.getVal} placeholder={this.props.placeholder}/>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}
Input.propTypes = {
    onChange:propTypes.func.isRequired
}
class Select extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <select name="" id="" onChange={this.getVal}>
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="天津">天津</option>
            <option value="重庆">重庆</option>
            <option value="江苏">江苏</option>
        </select>
    }
    getVal(e){
        console.log(e.target.value)
        this.props.onChange(e.target.value)
    }
}
class Consignee extends Component{
    constructor(){
        super()
        this.toSave= this.toSave.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.name="";
        this.phone="";
        this.address=""
    }
    render(){
        return (
            <div id="consignee">
                <header>添加邮寄地址</header>
                <section>
                    <Input placeholder="收货人姓名" onChange={(val)=>{this.inputChange('name',val)}}/>
                    <Input placeholder="手机号"  onChange={(val)=>{this.inputChange('phone',val)}}/>
                    <p><Select onChange={(val)=>{this.inputChange('province',val)}}></Select>
                    <Select onChange={(val)=>{this.inputChange('city',val)}}></Select>
                    <Select onChange={(val)=>{this.inputChange('region',val)}}></Select></p>
                     <Input placeholder="详细地址" onChange={(val)=>{this.inputChange('address',val)}}/>
                </section>
                <footer><button onClick={this.toSave}>保存</button></footer>
            </div>
        )
    }
    toSave(){
        console.log("去保存")
        console.log(this.name)
         console.log(this.phone)
          console.log(this.address)
          let reg_exp_name=/([A-Za-z\d\u4e00-\u9fa5]+)$/g;
          let reg_exp_phone=/^1[3578]\d{9}$/;
          if(!reg_exp_name.test(this.name)){
              alert("请输入用户名")
              return;
          }
         if(!reg_exp_phone.test(this.phone)){
            alert("请输入手机号")
            return;
         }
        if(!this.province || !this.city || !this.region){
            alert('请选择省市区')
            return;
        }
        if(!this.address){
            alert("请填写街道")
            return;
        }
        $http.post('/user/Mail/addNew',{
            name:this.name,
            phone:this.phone,
            province:this.province,
            city:this.city,
            region:this.region,
            address:this.address,
            token:getCookie('token')
        }).then((res)=>{
            if(res.success==1){
                this.props.history.replace('/deliveryList')
            }
            console.log(res)
        })
    }
    inputChange(a,b){
        this[a]=b;

    }
}
export default Consignee