import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({user:{id,firstName,lastName,username}}) => {
    return (
        <div>
            <div >{firstName}</div> 
            <div >{lastName}</div> 
            <div >{username}</div> 
            <div>
                <Link to={`/user/${id}`} >More</Link>    
            </div> 
        </div> 
    )
}

export default UserItem;