import {
    FETCH_USERS,
    FETCH_USER_DETAIL,
    FETCH_BOOK_RECORD,
    SHOW_BOOK_MODAL,
    HIDE_BOOK_MODAL
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
        case SHOW_BOOK_MODAL:
            return {
                ...state,
                book_modal: true
            }
        case HIDE_BOOK_MODAL:
            return {
                ...state,
                book_modal: false
            }
        default:
            return state;
    }
}

export default HabitsReducer;