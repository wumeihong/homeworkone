const jwt = require('jsonwebtoken')
const http = require('http');
const querystring = require("querystring")
const fs = require('fs')
const _= require('lodash')
function queryApi(url, methods, params) {
    return new Promise((resolve,reject) => {
        let data = "";
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                //console.log(`响应主体: ${chunk}`);
                data += chunk
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if (methods.toLowerCase()=="post") {
            request.write(querystring.stringify(params))
        }
        request.end()
    })

}
module.exports = function (app) {
    //注册接口
         app.post('/user/register', function (req, res) {
            console.log(req.body)
            let user = fs.readFileSync('user.json', {encoding: "utf-8"})
            user = JSON.parse(user);
            user.push(req.body)
            fs.writeFile('user.json', JSON.stringify(user), function () {
                res.end(JSON.stringify({"success": 1, "info": "注册成功"}))
            })

        })

    //登录接口
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', {encoding: "utf-8"})
        user = JSON.parse(user);
        let login = req.body
        let resInfo = {
            success: 0,
            info: "用户名或密码错误",
            token: ''
        }
        user.forEach(item => {
            if (item.username == login.username && item.password == login.password) {
                resInfo.success = 1;
                resInfo.info = "登录成功";
                resInfo.user={
                    name:user.name,
                    time:new Date().toLocaleTimeString(),
                    nickName:"吴美红"
                }
            }
        });
        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, "1511", {expiresIn: 60*60})
        }
        res.end(JSON.stringify(resInfo))
    })

    //商品列表接口

    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryApi('/mall/index/getGoodsChannel',"post",req.body)
        .then((data)=>{
            res.end(data)
        })
    })
    //添加购物车
    app.post('/user/Cart/addCart', function (req, res) {
        console.log(req.body)
        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                console.log(err)
                res.end(JSON.stringify({info: "登录过期，请重新登录", name: err.TokenExpiredError}))
            } else {
                console.log(decoded)
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + "/cart_info.json", {encoding: "utf-8"}))
                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username];
                    let flag = false//新加商品
                    recordList.forEach((item,index) =>{
                         if(item.goods_id==req.body.goods_info.goods_id){
                             if(item.count<=1){
                                 item.count=1
                             }else{
                                ++item.count
                             }
                            
                             
                             flag=true//重复商品
                         }
                    })
                    if(!flag){
                        let record = req.body.goods_info;
                        record.count=1;
                        record.selected=0;
                        cartInfo[decoded.username].push(record)
                    }
                } else {
                    let record = req.body.goods_info
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username] = [record]
                }
                
                fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartInfo),function(){
                    res.end("1")
                })
               
            }

        })
    })

    //分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        let data = JSON.parse(fs.readFileSync(__dirname + "/list.json", {encoding: "utf-8"}))
        data.list.map((item,ind) =>{
        if(item.id==req.query.id){
            res.end(JSON.stringify(item))
        }
        })
    })
    //默认数据渲染购物车列表登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList',function(req,res){
        console.log(req.body)
        jwt.verify(req.body.token,'1511',(err,decoded) =>{
            if(err){
                res.end(JSON.stringify({
                    info:"登录过期,请重新登录",
                    detail:err.TokenExpiredError,
                    error:1
                }))
            }else{
              console.log(decoded.username)
               if(err){
                    res.json(error)
                }else{
                    let goodsRecord=JSON.parse(fs.readFileSync("./cart_info.json"),{ encoding: "utf-8" })
                    res.json(goodsRecord[decoded.username])
                }
            
            }
        })
    })
     
    //删除购物车列表
    app.post('/user/Cart/delGoods',function(req,res){
        console.log(req.body)
        let cartRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}))
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let cartList = cartRecord[decoded.username];
               let deGoods= _.remove(cartList,function(item){
                    return req.body.selectedID.indexOf(item.goods_id)>-1
                })
                  fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartRecord),function(){
                    res.end("1")
                })
                res.json({
                    success:1,
                    info:"删除成功",
                    delGoods:deGoods,
                    leftGoods:cartList
                })
            }
        })
    })

    //新加邮寄地址
    app.post('/user/Mail/addNew',function(req,res){
       jwt.verify(req.body.token,'1511',function(err,decoded){
            delete req.body.token
           if(err){
              
               res.json(err)
           }else{
              
               let user = decoded.username;
                let delivery = JSON.parse(fs.readFileSync('./delivery.json',{encoding:"utf-8"}))
                console.log(delivery[user])
                if(delivery[user]){
                     delivery[user].push(req.body)
                }else{
                     delete req.body.token
                      delivery[user]=[req.body]
                }
                fs.writeFile('./delivery.json',JSON.stringify(delivery),function(err){
                    if(err){
                         res.json(err)
                    }else{
                         res.json({
                             success:"1",
                             info:"地址添加成功"
                         })
                    }
                })
               
           }
       })
       
    })
    //获取邮寄地址列表
    app.post('/user/Mail/list',function(req,res){

        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let list =  JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
                let deliveryList=list[decoded.username]
               res.json(deliveryList)
            }
        })
       
    })
    //删除邮寄地址列表
     app.post('/user/Mail/deletelist',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let list =  JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
                let deliveryList=list[decoded.username]
                deliveryList.splice(req.body.token,1)
               res.json(deliveryList)
            }
        })
       
    })
    //编辑邮寄地址
     app.post('/user/Mail/editlist',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let list =  JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
                let deliveryList=list.splice(req.body.index,1)
               res.json(deliveryList)
            }
        })
       
    })
}