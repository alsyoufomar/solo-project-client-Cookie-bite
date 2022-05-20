import './styles/App.css';
import Nav from './components/nav/nav';
import Home from './components/home/home';
import Events from './components/event/events';
import Forum from './components/forum';
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
        </Routes>
      </main>
    </div>
  );
}

export default App;

