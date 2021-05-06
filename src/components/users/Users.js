import React , { useContext, useEffect } from 'react';
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
                    <div key={user.id}>
                        <div >{user.firstName}</div> 
                        <div >{user.lastName}</div> 
                        <div >{user.username}</div> 
                    </div> 
                ))
            }
            </div>
        </div>
    )
}

export default Users;