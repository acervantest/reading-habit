import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ match }) => {
    return (
        <div>
            <Link to='/' className='btn btn-light'>Back to Home</Link>
            User Id:  { match.params.userId }
        </div>
    )
}

export default UserDetail;
