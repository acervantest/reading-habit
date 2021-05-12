import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { id, firstName, lastName, userName } }) => {
    return (
        <div>
            <div >{ firstName }</div> 
            <div >{ lastName }</div> 
            <div >{ userName }</div> 
            <div>
                <Link to={ `/user/${ id }` } >More</Link>    
            </div> 
        </div> 
    )
}

export default UserItem;