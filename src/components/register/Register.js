import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Register = () => {
  const emptyUser = { username: '', password: '', email: '' };
  const [user, setUser] = useState({ emptyUser });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const url = 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    fetch(`${url}/user/register`, options)
      .then((res) => res.json())
      .then((res) => {
        navigate('/login');
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  return (
    <div className='registration-page'>
      <form className='signup-form' onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Username'
          onChange={handleChange}
          name='username'
          value={user.username}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          onChange={handleChange}
          name='password'
          value={user.password}
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='Email'
          onChange={handleChange}
          name='email'
          value={user.email}
          autoComplete='off'
        />
        <button className='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default Register;
