import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
const host = process.env.REACT_APP_API_URL;

const Register = ({ dark }) => {
  const emptyUser = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirm_password: '',
  };
  const [user, setUser] = useState(emptyUser);
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    fetch(`${host}/user/register`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok && res.error) {
          if (res.error === '"confirm_password" must be [ref:password]') {
            console.log('Confirm the password please');
            setErrMessage('Confirm the password please');
            setPopup(true);
          } else {
            setErrMessage(res.error);
            setPopup(true);
          }
        } else {
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  return (
    <div className={dark ? 'registration-page--dark' : 'registration-page'}>
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
        className={dark ? 'signup-form--dark' : 'signup-form'}
        onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Username'
          onChange={handleChange}
          name='username'
          value={user.username}
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
          type='password'
          placeholder='Password'
          onChange={handleChange}
          name='password'
          value={user.password}
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Confirm password'
          onChange={handleChange}
          name='confirm_password'
          value={user.confirm_password}
          autoComplete='off'
        />
        <button className={dark ? 'submit--dark' : 'submit'}>Sign up</button>
      </form>
    </div>
  );
};

export default Register;
