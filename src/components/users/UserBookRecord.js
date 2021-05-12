import React ,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';

const UserBookRecord = ({ match }) => {

    const habitsContext = useContext(HabitsContext);

    const { getBookRecord, book_record, user } = habitsContext;

    useEffect( () => {
        getBookRecord(match.params.userId, match.params.bookId);
    },[]);

    return (
        <div>
            
            <p>
                <Link to={ `/user/${ match.params.userId }` } className='btn btn-light'>Back to Library</Link>
            </p>
            <p>User first name :  { user.firstName }</p>
            <p>User last name :  { user.lastName }</p>
            <p>User username :  { user.userName }</p>
            <p>UserBookRecord { match.params.userId } - { match.params.bookId }</p>

            {
                book_record && (
                    book_record.map(record => (
                        <div key={record.id}>
                            <p>Day: {record.day}</p>
                            <p>Number of pages read: {record.pages}</p>
                        </div>
                    ))
                )
            }
        </div>
    )

}

export default UserBookRecord;