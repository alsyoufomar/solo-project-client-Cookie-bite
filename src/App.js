import './styles/App.css';
import Nav from './components/nav';
import Home from './components/home';
import Events from './components/events';
import Forum from './components/forum';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/forum' element={<Forum />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

