import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useInput, useCheckbox } from '../../CustomHooks/useInput';

const UserDetail = ({ match }) => {

    const history = useHistory();

    const habitsContext = useContext(HabitsContext);

    const { userId } = match.params;
    
    const { 
        getUserDetail, 
        user, 
        book_modal, 
        bookModalShow, 
        bookModalClose,
        addBook
     } = habitsContext;

    useEffect( () => {
        getUserDetail(userId);
    },[]);

    const goTo = (path) => { history.push(path); }

    const { value: bookTitle, bind: bindBookTitle, reset: resetBookTitle } = useInput('');
    const { value: bookDescription, bind: bindBookDescription, reset: resetBookDescription } = useInput('');
    const { value: bookCurrent, bind: bindBookCurrent, reset: resetBookCurrent } = useCheckbox(false);
    const { value: bookPages, bind: bindBookPages, reset: resetBookPages } = useInput(0);
    const { value: bookCategory, bind: bindBookCategory, reset: resetBookCategory } = useInput('');
    const { value: bookAuthorName, bind: bindAuthorName, reset: resetAuthorName } = useInput('');
    const { value: bookAuthorMiddleName, bind: bindAuthorMiddleName, reset: resetAuthorMiddleName } = useInput('');
    const { value: bookAuthorLastName, bind: bindAuthorLastName, reset: resetAuthorLastName } = useInput('');
    const { value: bookAuthorAbout, bind: bindAuthorAbout, reset: resetAuthorAbout } = useInput('');

    const createBook = (e) => {
        e.preventDefault();

        const newBook = {
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
        }

        addBook(userId, newBook);
        bookModalClose();

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
        <div style={userDetailContainerStyle} >
            
            <Button variant="dark" style={backButtonStyle} onClick={ () => goTo(`/`) }>   
                <span>
                    <i className="fas fa-arrow-left" style={backIconStyle}></i>
                </span> 
                Back
            </Button>
            
            <div style={userDetailStyle}>    
                <Card className="text-center" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="fas fa-user-circle"></i> { user.firstName } { user.lastName } </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span style={usernameStyle}>Username: </span>{ user.userName }
                        </Card.Subtitle>
                        <Button variant="dark" onClick={ bookModalShow }>   
                            <span>
                                <i className="far fa-plus-square" style={addIconStyle}></i>
                            </span> 
                            New Book
                        </Button>
                    </Card.Body>
                </Card>
            </div>
                       
            <Modal show={book_modal} onHide={bookModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={createBook}>

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
                <Button variant="secondary" onClick={bookModalClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
                
            
            <div style={booksStyle}>
            {
                user.books &&  (
                    user.books.map( book => (
                        <div key={book.id} >
                            <Card>
                            <Card.Header><i className="fas fa-book"></i> { book.title }</Card.Header>
                            <Card.Body>
                                
                                <Card.Text>
                                  
                                    <p>Description: { book.description }</p>
                                    <p>Category: { book.category }</p>
                                    <p>Author: { book.author.firstName } { book.author.middleName } { book.author.lastName }</p>
                                   
                                </Card.Text>
                                <Button variant="secondary" onClick={ () => goTo(`/userBook/${book.title}/${user.id}/${book.id}`) }>   
                                    <i className="fas fa-chart-line" style={ bookIconStyle }></i>
                                    { book.title }  
                                </Button>
                            </Card.Body>
                            </Card>     
                        </div>
                    ))
                )
            }  
            </div>  
        </div>
    )
}

const userDetailContainerStyle = { textAlign:'left' }

const userDetailStyle = { 
    display: 'flex', 
    justifyContent: 'center',
    marginBottom: '1.5rem' 
}

const bookIconStyle = { marginRight:'0.5rem' }

const backButtonStyle = { marginBottom: '1.5rem' }

const backIconStyle = { marginRight: '0.5rem' } 

const addIconStyle = { marginRight: '0.5rem' }

const usernameStyle = { 
    color: '#212529', 
    fontStyle: 'bolder'
}

const booksStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2rem'
}

export default UserDetail;
