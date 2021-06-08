import React ,{ useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserBookRecord = ({ match }) => {

    const history = useHistory();

    const habitsContext = useContext(HabitsContext);

    const { getBookRecord, book_record, user } = habitsContext;

    useEffect( () => {
        getBookRecord(match.params.userId, match.params.bookId);
    },[]);

    const goTo = (path) => { history.push(path); }

    return (
        <div style={recordContainerStyle}> 
            <Button variant="light" style={backButtonStyle} onClick={ () => goTo(`/user/${ match.params.userId }`) }>   
                <span> <i className="fas fa-arrow-left" style={backIconStyle}></i> </span> 
                Back
            </Button>
            <div style={recordStyle}>    
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{ user.firstName } { user.lastName } </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{ user.userName }</Card.Subtitle>
                        <Card.Text>
                        UserBookRecord { match.params.userId } - { match.params.bookId }
                        {match.params.bookTitle}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            {
                book_record && (
                    book_record.map(record => (
                        <Card style={{ width: '15rem', marginBottom: '0.5rem'  }} key={record.id}>
                            <Card.Body>
                                <Card.Title>{record.day}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Number of pages read: {record.pages}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    ))
                )
            }
        </div>
    )
}

const backButtonStyle = { marginBottom: '1.5rem' }

const recordContainerStyle = { textAlign: 'left' }

const recordStyle = { 
    display: 'flex',
    marginBottom: '1.5rem'  
}

const backIconStyle = { marginRight: '0.5rem' }

export default UserBookRecord;