import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = ({ dark }) => {
  const emptyUser = { username: '', password: '' };
  const [user, setUser] = useState({ emptyUser });
  const [errMessage, setErrMessage] = useState('');
  const [popup, setPopup] = useState(false);
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
        if (!res.ok && res.error) {
          setErrMessage(res.error);
          setPopup(true);
        } else {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('isLoggedIn', true);
          console.log('logged in');
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={dark ? 'login-page--dark' : 'login-page'}>
      {popup && (
        <div className='err__popup'>
          <div onClick={() => setPopup(false)} className='err__exit'>
            X
          </div>
          <i class='err__triangle fa-solid fa-triangle-exclamation'></i>
          <br />
          {errMessage}
        </div>
      )}
      <form
        className={dark ? 'login-form--dark' : 'login-form'}
        onSubmit={handleLogin}>
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
        <button className={dark ? 'submit--dark' : 'submit'}>Login</button>
      </form>
    </div>
  );
};

export default Login;
