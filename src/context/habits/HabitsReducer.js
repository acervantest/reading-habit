import {
    FETCH_USERS,
    FETCH_USER_DETAIL,
    FETCH_BOOK_RECORD,
    TOGGLE_CREATE_BOOK_MODAL,
    TOGGLE_CREATE_USER_MODAL,
    TOGGLE_DELETE_USER_MODAL
} from '../types';

 const HabitsReducer = (state, action) => {
    switch(action.type){
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case FETCH_USER_DETAIL:
            return {
                ...state,
                user: action.payload
            }
        case FETCH_BOOK_RECORD:
            return {
                ...state,
                book_record: action.payload
            }
        case TOGGLE_CREATE_BOOK_MODAL:
            return {
                ...state,
                create_book_modal: !state.create_book_modal
            }
        case TOGGLE_CREATE_USER_MODAL:
            return {
                ...state,
                create_user_modal: !state.create_user_modal
            }
        case TOGGLE_DELETE_USER_MODAL:
            return {
                ...state,
                delete_user_modal: !state.delete_user_modal
            }  
        default:
            return state;
    }
}

export default HabitsReducer;