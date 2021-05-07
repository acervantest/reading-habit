import React , { useContext, useEffect } from 'react';
import UserItem from './UserItem';
import HabitsContext from '../../context/habits/HabitsContext';


const Users = () => {

    const habitsContext = useContext(HabitsContext);

    const { getUsers, users } = habitsContext; 

    useEffect( () => {
        getUsers()
    },[]);

    return (
        <div>
            <h1>Users Component</h1>
            <div>
            {
                users.map( user => (
                    <UserItem key={user.id} user={user} />
                ))
            }
            </div>
        </div>
    )
}

export default Users;