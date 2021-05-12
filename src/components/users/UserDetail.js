import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HabitsContext from '../../context/habits/HabitsContext';

const UserDetail = ({ match }) => {

    const habitsContext = useContext(HabitsContext);

    const { getUserDetail, user } = habitsContext;
    
    if(user.books !== null){
        console.log(`UserDetail: ${JSON.stringify(user.books)}`)
    }
    

    useEffect( () => {
        getUserDetail(match.params.userId);
    },[]);

    return (
        <div>
            <Link to='/' className='btn btn-light'>Back to Home</Link>
            <p>User Id:  { user.id }</p>
            <p>User first name :  { user.firstName }</p>
            <p>User last name :  { user.lastName }</p>
            <p>User username :  { user.userName }</p>
            <p>Books : </p>
           
            {
                user.books &&  (
                    user.books.map( book => (
                        <div key={book.id}>
                            <p>Title: 
                                <Link to={`/userBook/${user.id}/${book.id}`} className='btn btn-light'>{ book.title }</Link>
                            </p>
                            <p>{book.description}</p>
                            <p>{book.totalPages}</p>
                            <p>{book.bookRating}</p>
                            <p>{book.category.categoryName}</p>
                            <p>{book.author.firstName}</p>
                            <p>{book.author.middleName}</p>
                            <p>{book.author.lastName}</p>
                            <p>{book.author.about}</p>

                        </div>
                    ))
                )
            }  
            
        </div>
    )
}

export default UserDetail;
