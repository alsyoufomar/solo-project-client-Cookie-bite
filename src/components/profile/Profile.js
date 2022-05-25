import { useState, useEffect, React } from 'react';
import './style.css';

const Profile = () => {
  const [user, setUser] = useState({});

  const url = 'http://localhost:5000/user/profile';

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setUser(res.user);
      });
  }, []);
  if (!user.profile) return <></>;
  return (
    <div className='profile'>
      <div className='profile__image'>
        <img src={user.profile.avatarUrl} alt='' />
      </div>
      <div className='profile__info'>
        <div className='profile__naming'>
          <div className='profile__firstname'>
            <label htmlFor='firstName'>firstName</label>
            <input
              type='text'
              placeholder='First Name'
              name='firstName'
              value={user.profile.firstname}
            />
          </div>
          <div className='profile__lastname'>
            <label htmlFor='lastName'>lastName</label>
            <input
              type='text'
              placeholder='Last Name'
              name='lastName'
              value={user.profile.lastname}
            />
          </div>
        </div>
        <div className='profile__contact'>
          <div className='profile__email'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={user.email}
            />
          </div>
          <div className='profile__phone'>
            <label htmlFor='phone'>phone</label>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              value={user.profile.phone}
            />
          </div>
        </div>
        <div className='profile__bio'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={user.username}
          />
          <label htmlFor='bio'>bio</label>
          <textarea value={user.profile.bio} placeholder='Bio' name='bio' />
        </div>
        <i className='big-guy fa-solid fa-cookie-bite'></i>
      </div>
    </div>
  );
};

export default Profile;
