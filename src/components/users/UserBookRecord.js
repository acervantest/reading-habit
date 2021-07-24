import React ,{ useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const backButtonStyle = { marginBottom: '1.5rem' }

const recordContainerStyle = { textAlign: 'left' }

const recordStyle = { 
    display: 'flex',
    marginBottom: '1.5rem'  
}

const backIconStyle = { marginRight: '0.5rem' }

const GoBackButton = ({ goTo, userId }) => {
    return (
        <Button variant="light" style={backButtonStyle} onClick={ () => goTo(`/user/${ userId }`) }>   
            <span> <i className="fas fa-arrow-left" style={backIconStyle}></i> </span> 
            Back
        </Button>
    )
}

const BookInfo = ({ user, userId, bookId, bookTitle }) => {
    return (
        <div style={recordStyle}>    
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{ user.firstName } { user.lastName } </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ user.userName }</Card.Subtitle>
                    <Card.Text>
                    UserBookRecord { userId } - { bookId } - { bookTitle }
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

const BookRecords = ({ book_record }) => {
    return (
       <div> {
            book_record && ( book_record.map( record => (
                <Card style={{ width: '15rem', marginBottom: '0.5rem'  }} key={ record.id }>
                    <Card.Body>
                        <Card.Title>{ record.day }</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Number of pages read: { record.pages }</Card.Subtitle>
                    </Card.Body>
                </Card>
                ))
            )}
       </div> 
    )
}

const UserBookRecord = ({ match }) => {

    const history = useHistory();

    const { getBookRecord, book_record, user } = useContext(HabitsContext);

    const { userId, bookId , bookTitle } = match.params;

    useEffect( () => { getBookRecord(userId, bookId) }, []);

    const goTo = (path) => { history.push(path); }

    return (
        <div style={recordContainerStyle}> 
            
            <GoBackButton goTo={ goTo } userId={ userId } />

            <BookInfo  
                user={ user } 
                userId={ userId } 
                bookId={ bookId } 
                bookTitle={ bookTitle }
            />

            <BookRecords book_record={ book_record } />
        </div>
    )
}

export default UserBookRecord;