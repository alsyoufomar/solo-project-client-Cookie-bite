import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import './style.css';
const host = process.env.REACT_APP_API_URL;

const Forum = ({ dark }) => {
  const [data, setData] = useState([]);
  const emptyThraed = { title: '', content: '' };
  const [threadData, setThreadData] = useState(emptyThraed);

  useEffect(() => {
    fetch(`${host}/threads`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleCreateThread = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(threadData),
    };

    fetch(`${host}/thread`, options)
      .then((res) => {
        if (!res.ok) throw Error('could not fetch the data from the source');
        return res.json();
      })
      .then((res) => {
        console.log('create thread', res.data);
        if (!res.error) {
          setData([res.data, ...data]);
          setThreadData(emptyThraed);
        }
      })
      .catch((err) => console.log('the error message!', err.message));
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setThreadData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function dateTimetoRelativeTime(datetime) {
    let postTime = new Date(datetime);
    let currentTime = new Date();
    return formatDistance(postTime, currentTime, { addSuffix: true });
  }

  if (!data) return <></>;

  return (
    <div className={dark ? 'forum--dark' : 'forum'}>
      {localStorage.getItem('isLoggedIn') && (
        <form
          onSubmit={handleCreateThread}
          className={dark ? 'thread-create--dark' : 'thread-create'}>
          <input
            type='text'
            placeholder='Title'
            onChange={handleChange}
            name='title'
            value={threadData.title}
            className={
              dark ? 'thread-create__title--dark' : 'thread-create__title'
            }
          />
          <textarea
            cols={10}
            rows={5}
            value={threadData.content}
            placeholder={`What's wrong mate?`}
            onChange={handleChange}
            name='content'
            className={
              dark ? 'thread-create__content--dark' : 'thread-create__content'
            }
          />
          <button className='add-thread'>
            <i className='fa-solid fa-cookie-bite'></i>
          </button>
        </form>
      )}
      <i className='big-guy fa-solid fa-cookie-bite'></i>
      <ul className='thread-list'>
        {data.map((card) => {
          return (
            <Link to={`/forum/${card.id}`}>
              <li
                key={card.id}
                card={card}
                className={dark ? 'thread-item--dark' : 'thread-item'}>
                <div className='title-container'>
                  <h1>{card.title}</h1>
                </div>
                <div className='content-container'>
                  <Link to={`/profile/${card.userId}`}>
                    <p className={dark ? 'user-thread--dark' : 'user-thread'}>
                      Created by {card.user.username}
                    </p>
                  </Link>
                  {card.reply && (
                    <p>
                      {card.reply.length > 0
                        ? card.reply.length + ' Reply(s)'
                        : 'No replies yet'}
                    </p>
                  )}
                  <p className={dark ? 'date--dark' : 'date'}>
                    {dateTimetoRelativeTime(card.createdAt)}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Forum;
