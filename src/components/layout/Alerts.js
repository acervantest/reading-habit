import React , { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import AlertsContext from '../../context/alerts/AlertsContext';

const Alerts = () => {
    
    const alertsContext = useContext(AlertsContext);

    const { alert } = alertsContext;

    return (
        alert !== null && (
            <Alert variant={alert.type}>
                 {alert.msg} !
            </Alert>
        )
    )
}

export default Alerts