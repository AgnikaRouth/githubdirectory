import React, { useReducer } from "react";
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import{
    SET_ALERT,
    REMOVE_ALERT
} from '../Types'


const AlertState = props =>{
    const initialState = null

    //dispatch type to reducer
    const[state, dispatch] = useReducer(AlertReducer, initialState)

    //Set Alert
    const setAlert= ( msg, type) =>{
        dispatch({
            type: SET_ALERT,
            payload: { msg, type}
        })
    
        setTimeout( () => dispatch({ type: REMOVE_ALERT}), 5000) //disappear alert after 5s
      }
    



    //users, etc (anything we want to be available to the entire app,
    //value->prop, wrap the whole app with context provider-> props.children
    return <AlertContext.Provider
        value={{
           alert: state,
           setAlert
        }}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState