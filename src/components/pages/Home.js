import React, { Fragment, useContext } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Users from '../users/Users';
import HabitsContext from '../../context/habits/HabitsContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useInput } from '../../CustomHooks/useInput';

const Home = () => {
    
    const habitsContext = useContext(HabitsContext);

    const { 
        create_user_modal,
        toggleCreateUserModal,
        createUser
    } = habitsContext;

    const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput('');
    const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput('');
    const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');

    const createNewUser = (e) => {
        
        e.preventDefault();

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName
        }

        createUser(newUser);
        toggleCreateUserModal();
        resetFirstName();
        resetLastName();
        resetUserName();
    }

    return(
        <Fragment>
            <Jumbotron>
                <h1>Welcome to your personal reading tracker!</h1>
                <p>
                    A simple way to keep track of your reading progress, get statistics on how many books 
                    you are reading every certain time, how many pages you are reading every day and even more important,
                    a fun way to keep you motivation to read daily.
                </p>
                <p>
                    <Button variant="primary" onClick={toggleCreateUserModal}>
                        <span>
                            <i className="fas fa-user-plus" style={iconStyle}></i>
                        </span>
                        Create user  
                    </Button>
                </p>
            </Jumbotron>

            <Modal show={ create_user_modal } onHide={ toggleCreateUserModal }>
                <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={ createNewUser }>

                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindFirstName } placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindLastName } placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindUserName } placeholder="Enter User Name" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={ toggleCreateUserModal }>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Users />
        </Fragment>
    )
}

const iconStyle = {
    marginRight:'0.5rem'
}

export default Home;