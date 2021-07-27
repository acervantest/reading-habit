import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import UserDetail from './components/users/UserDetail';
import UserBookRecord from './components/users/UserBookRecord';
import HabitsState from './context/habits/HabitsState';
import AlertState from './context/alerts/AlertsState';
import Alerts from './components/layout/Alerts';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <HabitsState>
      <AlertState>
      <Router>
      <div className='container'>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route path='/user/:userId' component={ UserDetail } />
          <Route path='/userBook/:bookTitle/:userId/:bookId' component={ UserBookRecord } />
        </Switch>
      </div>
      </Router>
      </AlertState>
    </HabitsState>
  );
}

export default App;
