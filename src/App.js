import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import UserDetail from './components/users/UserDetail';
import UserBookRecord from './components/users/UserBookRecord';
import HabitsState from './context/habits/HabitsState';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <HabitsState>
      <Router>
      <div className='container'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route path='/user/:userId' component={ UserDetail } />
          <Route path='/userBook/:userId/:bookId' component={ UserBookRecord } />
        </Switch>
      </div>
      </Router>
    </HabitsState>
  );
}

export default App;
