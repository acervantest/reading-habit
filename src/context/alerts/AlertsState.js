import React, { useReducer } from 'react';
import AlertsContext from './AlertsContext'; 
import AlertsReducer from './AlertsReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {

    const initialState = null;

    const [state, dispatch] = useReducer(AlertsReducer, initialState);

    const setAlert = (msg, type) => {
        
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        });
        
        setTimeout( () => dispatch({ type: REMOVE_ALERT }), 5000);
    }

    return( 
    <AlertsContext.Provider
        value = {{
            alert: state,
            setAlert
        }}
    >
        {props.children}
    </AlertsContext.Provider>
    );
}

export default AlertState;