import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './styles/app.css';
import Nav from './components/nav/nav.js';
import PhoneNav from './components/nav/phonenav.js';
import Home from './components/home/home';
import Events from './components/event/events';
import Forum from './components/forum/forum';
import Register from './components/register/register';
import Login from './components/login/login';
import ViewProfile from './components/profile/viewprofile';
import EditProfile from './components/profile/editprofile';
import MyProfile from './components/profile/myprofile';
import Thread from './components/forum/thread';
import Bookmark from './components/bookmark/bookmark';
import About from './components/about/about';

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
          <Route path='/profile' element={<MyProfile dark={dark} />} />
          <Route path='/profile/:id' element={<ViewProfile dark={dark} />} />
          <Route path='/profile/edit' element={<EditProfile dark={dark} />} />
          <Route path='/bookmark' element={<Bookmark dark={dark} />} />
          <Route path='/about' element={<About dark={dark} />} />
        </Routes>
      </main>
      <PhoneNav dark={dark} setDark={setDark} />
    </div>
  );
}

export default App;
