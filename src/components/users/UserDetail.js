import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';
import AlertsContext from '../../context/alerts/AlertsContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useInput, useCheckbox } from '../../CustomHooks/useInput';

const bookIconStyle = { marginRight:'0.5rem' }

const backButtonStyle = { marginBottom: '1.5rem' }

const backIconStyle = { marginRight: '0.5rem' } 

const addIconStyle = { marginRight: '0.5rem' }

const userDetailContainerStyle = { textAlign:'left' }

const usernameStyle = { 
    color: '#212529', 
    fontStyle: 'bolder'
}

const booksStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2rem'
}

const userDetailStyle = { 
    display: 'flex', 
    justifyContent: 'center',
    marginBottom: '1.5rem' 
}

const GoBackButton = ({ goTo }) => {
    return (
        <Button variant="light" style={backButtonStyle} onClick={ () => goTo(`/`) }>   
            <span>
                <i className="fas fa-arrow-left" style={backIconStyle}></i>
            </span> 
            Back
        </Button>
    )
}

const CreateBookModal = ({ create_book_modal, toggleCreateBookModal, createBook, userId, setAlert }) => {
    
    const { value: bookTitle, bind: bindBookTitle, reset: resetBookTitle } = useInput('');
    const { value: bookDescription, bind: bindBookDescription, reset: resetBookDescription } = useInput('');
    const { value: bookCurrent, bind: bindBookCurrent, reset: resetBookCurrent } = useCheckbox(false);
    const { value: bookPages, bind: bindBookPages, reset: resetBookPages } = useInput(0);
    const { value: bookCategory, bind: bindBookCategory, reset: resetBookCategory } = useInput('');
    const { value: bookAuthorName, bind: bindAuthorName, reset: resetAuthorName } = useInput('');
    const { value: bookAuthorMiddleName, bind: bindAuthorMiddleName, reset: resetAuthorMiddleName } = useInput('');
    const { value: bookAuthorLastName, bind: bindAuthorLastName, reset: resetAuthorLastName } = useInput('');
    const { value: bookAuthorAbout, bind: bindAuthorAbout, reset: resetAuthorAbout } = useInput('');

    const createNewBook = (e) => {
        
        e.preventDefault();

        createBook(userId, {
            title: bookTitle,
            description: bookDescription,
            totalPages: bookPages,
            bookRating: 0,
            category: {
                categoryName: bookCategory
            },
            author: {
                firstName: bookAuthorName,
                middleName: bookAuthorMiddleName,
                lastName: bookAuthorLastName,
                about: bookAuthorAbout 
            }
        }).catch( err => {
            setAlert(err.response.data.message, 'danger');
        });

        toggleCreateBookModal();

        resetBookTitle();
        resetBookDescription();
        resetBookCurrent();
        resetBookPages();
        resetBookCategory();
        resetAuthorName();
        resetAuthorMiddleName();
        resetAuthorLastName();
        resetAuthorAbout();
    }

    return (
        <Modal show={ create_book_modal } onHide={ toggleCreateBookModal } animation={ false }>
            <Modal.Header closeButton>
            <Modal.Title>Start Reading New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={ createNewBook }>

                <Form.Group controlId="formBookTitle">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control size="sm" type="text" { ...bindBookTitle } placeholder="Enter Title" />
                </Form.Group>

                <Form.Group controlId="formBookDescription">
                    <Form.Label>Book Description</Form.Label>
                    <Form.Control as="textarea" { ...bindBookDescription } rows={2} />
                </Form.Group>
                
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" { ...bindBookCurrent } label="Currently reading" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formBookPages">
                        <Form.Label>Number of pages</Form.Label>
                        <Form.Control size="sm" { ...bindBookPages } type="text" placeholder="Enter Pages" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBookCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindBookCategory } placeholder="Enter Category" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formAuthorName">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindAuthorName } placeholder="Enter Author Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAuthorMiddleName">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindAuthorMiddleName } placeholder="Enter Middle Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAuthorLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="sm" type="text" { ...bindAuthorLastName } placeholder="Enter Last Name" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formAuthorAbout">
                    <Form.Label>Author About</Form.Label>
                    <Form.Control as="textarea" { ...bindAuthorAbout } rows={2} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={ toggleCreateBookModal }>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

const UserInfo = ({ user, toggleCreateBookModal, toggleEditUserModal, toggleDeleteUserModal }) => {
    return (
        <div style={userDetailStyle}>    
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><i className="fas fa-user-circle"></i> { user.firstName } { user.lastName } </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <span style={usernameStyle}>Username: </span>{ user.userName }
                    </Card.Subtitle>
                    <Button variant="primary" onClick={ toggleCreateBookModal }>   
                        <span>
                            <i className="far fa-plus-square" style={addIconStyle}></i>
                        </span> 
                        Start Reading
                    </Button>
                    <Button variant="secondary" onClick={ toggleEditUserModal }>   
                        <span>
                            <i className="" style={addIconStyle}></i>
                        </span> 
                        Edit User
                    </Button>
                    <Button variant="danger" onClick={ toggleDeleteUserModal }>   
                        <span>
                            <i className="fas fa-minus-square" style={addIconStyle}></i>
                        </span> 
                        Delete User
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

const DeleteUserModal = ({ user, delete_user_modal, toggleDeleteUserModal, deleteUser, userId, goTo  }) => {

    const removeUser = () => {
        deleteUser(userId);
        toggleDeleteUserModal();
        goTo(`/`)
    }

    return (
        <Modal show={ delete_user_modal } onHide={ toggleDeleteUserModal } animation={ false }>
            <Modal.Header closeButton>
            <Modal.Title>{`Delete User ${ user.firstName }`} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`You are about to delete ${ user.firstName }, click confirm to remove user.`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={ removeUser }>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={ toggleDeleteUserModal }>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal> 
    )
}

const UpdateUserModal = ({ toggleModal, showModal, editUser, user }) => {

    const { value: firstName, bind: bindFirstName } = useInput(user.firstName);
    const { value: lastName, bind: bindLastName } = useInput(user.lastName);
    const { value: userName, bind: bindUserName } = useInput(user.userName);

    const updateUser = (e) => {
        
        e.preventDefault();

        editUser({
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            userName: userName
        });

        toggleModal();
    }

    return (
        <Modal show={ showModal } onHide={ toggleModal } animation={ false }>
            <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={ updateUser }>

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
                <Button variant="secondary" onClick={ toggleModal }>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const BookCollection = ({ user: { id, books }, goTo }) => {
    return (
        <div style={booksStyle}> {
            books && ( books.map( book => (
                <div key={book.id} >
                    <Card>
                    <Card.Header><i className="fas fa-book"></i> { book.title }</Card.Header>
                    <Card.Body>
                        <p><span>Description: { book.description }</span></p>
                        <p><span>Category: { book.category }</span></p>
                        <p><span>Author: { book.author.firstName } { book.author.middleName } { book.author.lastName }</span></p>
                    <Button variant="light" onClick={ () => goTo(`/userBook/${ book.title }/${ id }/${ book.id }`) } tag="div">   
                        <i className="fas fa-chart-line" style={ bookIconStyle } tag="div"></i>
                        { book.title }  
                    </Button>
                    </Card.Body>
                    </Card>     
                </div> ))
            ) } 
        </div> 
    )
}

const UserDetail = ({ match }) => {

    const history = useHistory();

    const { 
        delete_user_modal,
        getUserDetail, 
        user, 
        create_book_modal, 
        toggleCreateBookModal,
        createBook,
        toggleDeleteUserModal,
        deleteUser,
        update_user_modal,
        toggleEditUserModal,
        updateUser
     } = useContext(HabitsContext);

    const { setAlert } = useContext(AlertsContext);

    const { userId } = match.params;

    useEffect( () => getUserDetail(userId), []);

    const goTo = path => history.push(path);

    return (
        <div style={userDetailContainerStyle} >
            
            <GoBackButton goTo={ goTo } />                
            
            <UserInfo
                user={ user }
                toggleCreateBookModal={ toggleCreateBookModal }
                toggleEditUserModal={ toggleEditUserModal }
                toggleDeleteUserModal={ toggleDeleteUserModal }
            />

            <DeleteUserModal 
                delete_user_modal={ delete_user_modal } 
                toggleDeleteUserModal={ toggleDeleteUserModal } 
                user={ user }  
                deleteUser={ deleteUser }
                userId={ userId }
                goTo={ goTo }
            /> 

            <CreateBookModal 
                create_book_modal={ create_book_modal } 
                toggleCreateBookModal={ toggleCreateBookModal }
                createBook={  createBook }
                userId={ userId }
                setAlert={ setAlert }
            />

            <UpdateUserModal 
                toggleModal={ toggleEditUserModal }
                showModal={ update_user_modal }
                editUser={ updateUser }
                user={ user }
            />

             <BookCollection user={ user } goTo={ goTo } /> 
        </div>
    )
}

export default UserDetail;
