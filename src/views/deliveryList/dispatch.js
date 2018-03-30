import {DELIVERY_LIST} from '../../store/reducers'
import {getCookie} from '../../utils/utils'
import $http from '../../utils/http'

export default function mapDispatch(dispatch){
    return {
        getDelivery(){
            dispatch({
                type:'GET_DELIVERY_LIST'
            })
        },
        toEditDelivery(index){
            dispatch({
                type:"EDIT_DELIVERY",
                data:index                
            })
        }
    }
}
