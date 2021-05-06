import {
    FETCH_USERS
} from '../types';

 const HabitsReducer = (state, action) => {
    switch(action.type){
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}

export default HabitsReducer;