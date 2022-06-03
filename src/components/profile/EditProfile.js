import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

const EditProfile = ({ dark }) => {
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

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
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        console.log('test1', res);
        setUser(res.user);
      });
  }, []);

  function handleChangeUser(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        profile: {
          ...prevFormData.profile,
          [name]: value,
        },
      };
    });
  }

  const handleSave = async (e) => {
    e.preventDefault();

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(user),
    };
    fetch(`http://localhost:5000/user/profile`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok && res.error) {
          setErrMessage(res.error);
          setPopup(true);
        } else {
          navigate('/profile');
        }
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  if (!user.profile) return <></>;

  return (
    <div className={dark ? 'profile--dark' : 'profile'}>
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
      <div className='profile__image'>
        <img src={user.profile.avatarUrl} alt='' />
        <label
          className={
            dark ? 'profile__image--label--dark' : 'profile__image--label'
          }
          htmlFor='firstName'>
          Avatar URL
        </label>
        <input
          type='text'
          placeholder='Avatar URL'
          name='avatarUrl'
          value={user.profile.avatarUrl}
          onChange={handleChange}
          className={
            dark ? 'profile__image--input--dark' : 'profile__image--input'
          }
        />
      </div>
      <form
        onSubmit={handleSave}
        className={dark ? 'profile__info--dark' : 'profile__info'}>
        <div className={dark ? 'profile__naming--dark' : 'profile__naming'}>
          <div className='profile__firstname'>
            <label htmlFor='firstName'>First name</label>
            <input
              type='text'
              placeholder='First Name'
              name='firstname'
              value={user.profile.firstname}
              onChange={handleChange}
            />
          </div>
          <div className='profile__lastname'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              placeholder='Last Name'
              name='lastname'
              value={user.profile.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={dark ? 'profile__contact--dark' : 'profile__contact'}>
          <div className='profile__email'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={user.email}
              onChange={handleChangeUser}
            />
          </div>
          <div className='profile__phone'>
            <label htmlFor='phone'>phone</label>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              value={user.profile.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={dark ? 'profile__bio--dark' : 'profile__bio'}>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={user.username}
            onChange={handleChangeUser}
          />
          <label htmlFor='bio'>bio</label>
          <textarea
            value={user.profile.bio}
            onChange={handleChange}
            placeholder='Bio'
            name='bio'
          />
        </div>
        <i className='big-guy fa-solid fa-cookie-bite'></i>
        <button className={dark ? 'profile__edit--dark' : 'profile__edit'}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
