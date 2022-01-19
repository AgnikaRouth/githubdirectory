import React, { useContext} from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users = () => {

    //initialize githubContext object
    const githubContext = useContext(GithubContext)
    
    const { loading, users } = githubContext //destructure
    if(loading){
        return(
            <div>
              <img src={ Spinner } alt="loading"/>
            </div>
        )
    }
    else{
        return (
            <div style={userStyle}>
               {users.map(user => (
                   <UserItem key={user.id} user={user}/> //passing in props
               ))} 
            </div>
        );

    }
        
}

const userStyle= {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users
