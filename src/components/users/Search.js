import React, { useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search =() => {

    //initialize GithubContext
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    
    const [text, setText] = useState('') //put default value for text

    
    const onChange = e => setText(e.target.value) //just pass the value to text via setText
   
    const onSubmit = e =>
    {
         e.preventDefault()
         if(text === ''){
            alertContext.setAlert('Please enter something', 'light')
         } else {
             //searchUsers is a part of GithubContext
            githubContext.searchUsers(text) 
            setText('') //once the search is done, set the text to nothing
         }
         
    }

        return (
            <div>
                <form onSubmit={onSubmit} className='form'>
                    <input type="text" 
                    name="text"  //name as text, can be used as a key
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange} 

                    />
                    <input type="submit" 
                    value="Search" 
                    className='btn btn-dark btn-block'

                    />

                </form>
                {githubContext.users.length > 0 && (
                    <button
                        className="btn btn-light btn-block"
                        onClick={githubContext.clearUsers}>Clear</button>
                )}
               
            </div>
        )
}
export default Search
