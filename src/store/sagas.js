import {takeEvery,takeLatest} from 'redux-saga'
//takeEvery是每一个函数都执行，执行多次，但是takeLatest只会执行最后一次的
import {DELIVERY_LIST,DELIVERY_LIST_ERR} from '../store/reducers.js'
import {call,put} from 'redux-saga/effects'
import $http from '../utils/http'
import {getCookie} from '../utils/utils'
//saga就是generator函数
//worker saga
 function* fetchData(){
     //使用call去请求数据  call(fn,param)即fn(param)
     //实现异步转同步
     
    try{
         let res= yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
        //saga中替代dispatch来触发action的函数
        yield put({
            type:"TEST_SAGA",
            data:JSON.parse(res)
        })
    }catch(err){
        yield put({
            type:"TEST_SAGA_ERROR",
            data:err
        })
    }
 }

 function *fetchDelivery(){
     try{
         let res = yield call($http.post,'/user/Mail/list',{token:getCookie('token')});
         yield put({
                type:DELIVERY_LIST,
                data:index
         })
            
     }
    catch(err){
       
        yield put({
            type: DELIVERY_LIST_ERR,
            data:res
        })
     }
 }
function* editDelivery(action){
     try{
         let res = yield call($http.post,'/user/Mail/editlist',{token:getCookie('token'),index:action.data});
         yield put({
                type:EDIT_DELIVERY_INFO,
                data:res
         })
            
     }
    catch(err){
        console.log(err)
        yield put({
            type:EDIT_DELIVERY_LIST_ERR,
            data:res
        })
     }
}
//watcher saga
function* watchFetch(){
    yield takeEvery(['GET_GOODS_LIST'],fetchData)
}
function* watchDelivery(){
    yield takeEvery(['GET_DELIVERY_LIST'],fetchDelivery)
}
function* watchEditDelivery(){
    yield takeEvery(['EDIT_DELIVERY'], editDelivery)
}

export default function* rootSaga(){
    //监听每一个type为GET_GOODS_LISTde action
    yield [watchFetch(),watchDelivery(),watchEditDelivery()]
}

