import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UserItem = ({ user: { id, firstName, lastName, userName } }) => {

    const history = useHistory();

    const goToUserDetail = (path) => {
        history.push(path);
    }

    return (
        <Fragment>
            <Card className="text-center">
            <Card.Header><i class="fas fa-user-circle"></i> { userName } </Card.Header>
            <Card.Body>
                <Card.Title>{ firstName  } { lastName }</Card.Title>
                
                <Button variant="dark" onClick={ () => goToUserDetail(`/user/${ id }`) }>   
                    Go to user
                    <span>
                        <i className="fas fa-arrow-right" style={iconStyle}></i>
                    </span> 
                </Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </Fragment>
    )
    
}

const iconStyle = {
    marginLeft:'0.5rem'
}

export default UserItem;