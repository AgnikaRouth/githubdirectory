import { SET_ALERT, REMOVE_ALERT } from '../Types'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default(state, action)=>{
    switch(action.type){
        case SET_ALERT:
            return action.payload
        case REMOVE_ALERT:
            return null
        default:
            return state
    }
}