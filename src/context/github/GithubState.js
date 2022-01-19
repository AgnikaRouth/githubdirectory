import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import{
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../Types'

let githubClientId
let githubClientSecret

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else{
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}


const GithubState = props =>{
    const initialState ={
        users:[],
        user:{},
        repos: [],
        loading: false
    }

    //dispatch type to reducer
    const[state, dispatch] = useReducer(GithubReducer, initialState)

    //Search Users

    const searchUsers = async text =>{
        setLoading()
    
        const res= await axios
        .get(`https://api.github.com/search/users?q=${text}&client_id=${
          githubClientId}$client_secret=${githubClientSecret}`)
        
        //reducer will put the dispatch objects of such type and payload 
        //to the state and components
        
        dispatch({ 
            type: SEARCH_USERS,
            payload: res.data.items
        })
        
        //setLoading is false in githubReducer
        
    }
    

    //Get Single User
    const getUser = async (username) =>{
        
        setLoading()
    
        const res= await axios
        .get(`https://api.github.com/users/${username}?client_id=${githubClientId}$client_secret=${
          githubClientSecret}`)
        
          dispatch({
              type:GET_USER,
              payload: res.data
          })
      }

    //Get Repos

    const getUserRepos = async (username) =>{
        setLoading(true)
    
        const res= await axios
        .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
          githubClientId}$client_secret=${
          githubClientSecret}`)
        
        dispatch({
            type: GET_REPOS,
            payload: res.data,
            loading: false
        })
        
    }

    //Clear Users
    const clearUsers =() => dispatch({ type: CLEAR_USERS})
    //Set Loading
    //reducer will catch the type(of the objct)
    const setLoading = () => dispatch({ type: SET_LOADING})

    //users, etc (anything we want to be available to the entire app,
    //value->prop, wrap the whole app with context provider-> props.children
    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState