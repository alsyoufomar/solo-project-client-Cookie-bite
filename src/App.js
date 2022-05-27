import './styles/App.css';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Events from './components/event/Events';
import Forum from './components/forum/Forum';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Thread from './components/forum/Thread';
import Bookmark from './components/bookmark/Bookmark';
import About from './components/about/About';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState('Location');
  const [formData, setFormData] = useState({
    name: '',
  });
  const [dark, setDark] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <div className='App'>
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                dark={dark}
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
                dark={dark}
                setLocation={setLocation}
                location={location}
                setFormData={setFormData}
                formData={formData}
                setDate={setDate}
                date={date}
              />
            }
          />
          <Route path='/forum' element={<Forum dark={dark} />} />
          <Route path='/forum/:id' element={<Thread dark={dark} />} />
          <Route path='/signup' element={<Register dark={dark} />} />
          <Route path='/login' element={<Login dark={dark} />} />
          <Route path='/profile' element={<Profile dark={dark} />} />
          <Route path='/bookmark' element={<Bookmark dark={dark} />} />
          <Route path='/about' element={<About dark={dark} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

