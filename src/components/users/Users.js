import React , { Fragment, useContext, useEffect } from 'react';
import UserItem from './UserItem';
import HabitsContext from '../../context/habits/HabitsContext';

const Users = () => {

    const habitsContext = useContext(HabitsContext);

    const { getUsers, users } = habitsContext; 

    useEffect( () => {
        getUsers()
    },[]);

    return (
        <Fragment>
            <h3 style={h3Style}>
                <span><i className="fas fa-users" style={iconStyle}></i></span>
                Users
            </h3>
            <div style={ usersStyle }>
                {
                    users.map( user => (
                        <UserItem key={user.id} user={user} />
                    ))
                }
            </div>
        </Fragment>
    )
}

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '2rem'
}

const iconStyle = {
    marginRight: '0.5rem'
}

const h3Style = {
    marginBottom: '1.5rem'
}

export default Users;