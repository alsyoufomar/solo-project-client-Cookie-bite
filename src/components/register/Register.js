import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Register = () => {
  const emptyUser = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    avatarUrl: '',
    bio: '',
    phone: '',
  };
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
          type='email'
          placeholder='Email'
          onChange={handleChange}
          name='email'
          value={user.email}
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
          type='text'
          placeholder='First name'
          onChange={handleChange}
          name='firstname'
          value={user.firstname}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Last name'
          onChange={handleChange}
          name='lastname'
          value={user.lastname}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Avatar URL'
          onChange={handleChange}
          name='avatarUrl'
          value={user.avatarUrl}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Bio'
          onChange={handleChange}
          name='bio'
          value={user.bio}
          autoComplete='off'
        />
        <input
          type='text'
          placeholder='Phone'
          onChange={handleChange}
          name='phone'
          value={user.phone}
          autoComplete='off'
        />
        <button className='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default Register;
