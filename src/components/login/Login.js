import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const emptyUser = { username: '', password: '' };
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

  const handleLogin = async (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:5000/user/login', options)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('isLoggedIn', true);
        console.log('logged in');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
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
        <button className='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
