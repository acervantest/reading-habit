import React , { useReducer } from 'react';
import HabitsContext from './HabitsContext';
import HabitsReducer from './HabitsReducer';
import axios from 'axios';
import {
    FETCH_USERS,
    FETCH_USER_DETAIL,
    FETCH_BOOK_RECORD,
    TOGGLE_CREATE_BOOK_MODAL,
    TOGGLE_CREATE_USER_MODAL,
    TOGGLE_DELETE_USER_MODAL,
    TOGGLE_UPDATE_USER_MODAL
} from '../types';

const HabitsState = props => {
    
    const initialState = {
        users: [],
        user: {},
        book_record: [],
        create_book_modal: false, 
        create_user_modal: false,
        update_user_modal: false,
        delete_user_modal: false
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

    const createBook = async (userId, newBook) => {
        const res = await axios.post(
            `http://localhost:8080/api/users/${userId}/`,
            newBook
        ).catch(err => {
            return Promise.reject(err); 
        });

        dispatch({
            type: FETCH_USER_DETAIL,
            payload: res.data
        })
    }

    const createUser = async newUser => {
        
        await axios.post(`http://localhost:8080/api/users`, newUser);

        getUsers();
    }

    const deleteUser = async userId => {
        await axios.delete(`http://localhost:8080/api/user/${userId}`);
        getUsers();
    }

    const updateUser = async updateUser => {
        const res = await axios.put(`http://localhost:8080/api/users`, updateUser);
        getUserDetail(res.data.id);
    }

    const toggleCreateBookModal = () => {
        dispatch({
            type: TOGGLE_CREATE_BOOK_MODAL
        })
    }

    const toggleCreateUserModal = () => {
        dispatch({
            type: TOGGLE_CREATE_USER_MODAL
        })
    }

    const toggleEditUserModal = () => {
        dispatch({
            type: TOGGLE_UPDATE_USER_MODAL
        })
    }

    const toggleDeleteUserModal = () => {
        dispatch({
            type: TOGGLE_DELETE_USER_MODAL
        })
    }

    return <HabitsContext.Provider
        value={{
            users: state.users,
            user: state.user,
            book_record: state.book_record,
            create_book_modal: state.create_book_modal,
            create_user_modal: state.create_user_modal,
            delete_user_modal: state.delete_user_modal,
            update_user_modal: state.update_user_modal,
            getUsers,
            getUserDetail,
            getBookRecord,
            createBook,
            createUser,
            toggleCreateBookModal,
            toggleCreateUserModal,
            toggleEditUserModal,
            toggleDeleteUserModal,
            deleteUser,
            updateUser
        }}
    >
        { props.children }
    </HabitsContext.Provider>
}

export default HabitsState;

