import React, { Fragment } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Users from '../users/Users';

const Home = () => (
    <Fragment>
        <Jumbotron>
            <h1>Welcome to your personal reading tracker!</h1>
            <p>
                This is a simple way to keep track of your reading progress, get statistics on how many books 
                you are reading every certain time, how many pages you are reading every day and even more important,
                one simple and fun way to keep you motivated to read daily.
            </p>
            <p>
                <Button variant="primary">Add a new user</Button>
            </p>
        </Jumbotron>
        <Users />
    </Fragment>
)

export default Home;