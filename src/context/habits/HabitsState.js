import React , { useReducer } from 'react';
import HabitsContext from './HabitsContext';
import HabitsReducer from './HabitsReducer';
import {
    FETCH_USERS
} from '../types';

const HabitsState = props => {
    
    const initialState = {
        users: []
    }

    const [state, dispatch] = useReducer(HabitsReducer, initialState);

    const getUsers = () => {
        const users = [
            {
                id: 1,
                firstName: 'userFirstName',
                lastName: 'userLastName',
                username: 'UserOne'
            },
            {
                id: 2,
                firstName: 'userFirstName',
                lastName: 'userLastName',
                username: 'UserTwo'
            },
            {
                id: 3,
                firstName: 'userFirstName',
                lastName: 'userLastName',
                username: 'UserThree'
            },{
                id: 4,
                firstName: 'userFirstName',
                lastName: 'userLastName',
                username: 'UserFour'
            }
        ]; 

        dispatch({
            type: FETCH_USERS,
            payload: users
        })
    }   

    return <HabitsContext.Provider
        value={{
            users: state.users,
            getUsers
        }}
    >
        {props.children}
    </HabitsContext.Provider>
}

export default HabitsState;

