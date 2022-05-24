import './styles/App.css';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Events from './components/event/Events';
import Forum from './components/forum/Forum';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Thread from './components/forum/Thread';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState('Location');
  const [formData, setFormData] = useState({
    name: '',
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <div className='App'>
      <Nav />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                setLocation={setLocation}
                location={location}
                setFormData={setFormData}
                formData={formData}
                setDate={setDate}
                date={date}
              />
            }
          />
          <Route
            path='/events'
            element={
              <Events
                setLocation={setLocation}
                location={location}
                setFormData={setFormData}
                formData={formData}
                setDate={setDate}
                date={date}
              />
            }
          />
          <Route path='/forum' element={<Forum />} />
          <Route path='/forum/:id' element={<Thread />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

