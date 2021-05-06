import './App.css';
import Home from './components/pages/Home';
import HabitsState from './context/habits/HabitsState';

const App = () => {
  return (
    <HabitsState>
      <div className='container'>
        <h1>Reading Habits App</h1>
        <Home />
      </div>
    </HabitsState>
  );
}

export default App;
