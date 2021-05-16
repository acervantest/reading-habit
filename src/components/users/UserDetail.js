import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserDetail = ({ match }) => {

    const history = useHistory();

    const habitsContext = useContext(HabitsContext);

    const { getUserDetail, user } = habitsContext;

    useEffect( () => {
        getUserDetail(match.params.userId);
    },[]);

    const goTo = (path) => { history.push(path); }

    return (
        <div style={userDetailContainerStyle} >
            
            <Button variant="dark" style={backButtonStyle} onClick={ () => goTo(`/`) }>   
                <span>
                    <i className="fas fa-arrow-left" style={backIconStyle}></i>
                </span> 
                Back
            </Button>
            
            <div style={userDetailStyle}>    
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i class="fas fa-user-circle"></i> { user.firstName } { user.lastName } </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <span style={usernameStyle}>Username: </span>{ user.userName }
                        </Card.Subtitle>
                        
                    </Card.Body>
                </Card>
            </div>
            <div style={booksStyle}>
            {
                user.books &&  (
                    user.books.map( book => (
                        <div key={book.id} >
                            <Card>
                            <Card.Header><i class="fas fa-book"></i> { book.title }</Card.Header>
                            <Card.Body>
                                
                                <Card.Text>
                                    <p>{book.description}</p>
                                    
                                    <p>{book.category.categoryName}</p>
                                    <p>{book.author.firstName} {book.author.middleName} {book.author.lastName}</p>
                                    
                                </Card.Text>
                                <Button variant="secondary" onClick={ () => goTo(`/userBook/${book.title}/${user.id}/${book.id}`) }>   
                                    <i class="fas fa-chart-line" style={bookIconStyle}></i>
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
    marginBottom: '1.5rem' 
}

const bookIconStyle = { marginRight:'0.5rem' }

const backButtonStyle = { marginBottom: '1.5rem' }

const backIconStyle = { marginRight: '0.5rem' } 

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
