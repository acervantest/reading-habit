import React , { useReducer } from 'react';
import HabitsContext from './HabitsContext';
import HabitsReducer from './HabitsReducer';
import axios from 'axios';
import {
    FETCH_USERS,
    FETCH_USER_DETAIL,
    FETCH_BOOK_RECORD
} from '../types';

const HabitsState = props => {
    
    const initialState = {
        users: [],
        user: {},
        book_record: []
    }

    const [state, dispatch] = useReducer(HabitsReducer, initialState);

    const getUsers = async () => {

        const users = await axios.get('http://localhost:8080/api/users'); 
        
        dispatch({
            type: FETCH_USERS,
            payload: users.data
        })
    }   

    const getUserDetail = async userId => {

        const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
        
        dispatch({
            type: FETCH_USER_DETAIL,
            payload: res.data
        })
    }

    const getBookRecord = async (userId, bookId) => {
        const res = await axios.get(`http://localhost:8080/api/pages/${userId}/${bookId}`);
        
        dispatch({
            type: FETCH_BOOK_RECORD,
            payload: res.data
        })
    }

    return <HabitsContext.Provider
        value={{
            users: state.users,
            user: state.user,
            book_record: state.book_record,
            getUsers,
            getUserDetail,
            getBookRecord
        }}
    >
        {props.children}
    </HabitsContext.Provider>
}

export default HabitsState;

