import { useState, useEffect, React } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

const ViewProfile = ({ dark }) => {
  const [user, setUser] = useState({});
  const params = useParams();
  console.log(params);
  const url = `http://localhost:5000/user/profile/${params.id}`;

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
        setUser(res.user);
      });
  }, []);

  if (!user.profile) return <></>;

  return (
    <div className={dark ? 'profile--dark' : 'profile'}>
      <div className='profile__image'>
        <img src={user.profile.avatarUrl} alt='' />
      </div>
      <div className='profile__info'>
        <div
          className={
            dark ? 'profile__naming--view--dark' : 'profile__naming--view'
          }>
          {user.profile.firstname + ' ' + user.profile.lastname}
        </div>
        <div
          className={
            dark ? 'profile__username--view--dark' : 'profile__username--view'
          }>
          {user.username}
        </div>
        <p
          className={
            dark ? 'profile__contact--view--dark' : 'profile__contact--view'
          }>
          Contact
        </p>
        <div
          className={
            dark ? 'profile__email--view--dark' : 'profile__email--view'
          }>
          {user.email}
        </div>
        <div
          className={
            dark ? 'profile__phone--view--dark' : 'profile__phone--view'
          }>
          {user.profile.phone}
        </div>
        <p
          className={
            dark
              ? 'profile__bio--title--view--dark'
              : 'profile__bio--title--view'
          }>
          Bio
        </p>
        <div
          className={dark ? 'profile__bio--view--dark' : 'profile__bio--view'}>
          {user.profile.bio}
        </div>
        <i className='big-guy fa-solid fa-cookie-bite'></i>
      </div>
    </div>
  );
};

export default ViewProfile;
