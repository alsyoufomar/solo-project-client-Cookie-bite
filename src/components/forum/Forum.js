import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import './style.css';

const Forum = () => {
  const [data, setData] = useState([]);
  const emptyThraed = { title: '', content: '' };
  const [threadData, setThreadData] = useState(emptyThraed);

  useEffect(() => {
    fetch(`http://localhost:5000/threads`)
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

    fetch('http://localhost:5000/thread', options)
      .then((res) => res.json())
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

  console.log('my threads', data);
  console.log('thread form', threadData);

  return (
    <div className='forum'>
      <form onSubmit={handleCreateThread} className='thread-create'>
        <input
          type='text'
          placeholder='Title'
          onChange={handleChange}
          name='title'
          value={threadData.title}
          className='thread-create__title'
        />
        <textarea
          cols={10}
          rows={5}
          value={threadData.content}
          placeholder={`What's wrong mate?`}
          onChange={handleChange}
          name='content'
          className='thread-create__content'
        />
        <button className='add-thread'>
          <i className='fa-solid fa-cookie-bite'></i>
        </button>
      </form>
      <i className='big-guy fa-solid fa-cookie-bite'></i>
      <ul className='thread-list'>
        {data.map((card) => {
          return (
            <Link to={`/forum/${card.id}`}>
              <li key={card.id} card={card} className='thread-item'>
                <div className='title-container'>
                  <h1>{card.title}</h1>
                </div>
                <div className='content-container'>
                  <p className='user-thread'>{card.user.username}</p>
                  {card.reply && (
                    <p>
                      {card.reply.length > 0
                        ? card.reply.length + ' Reply(s)'
                        : 'No replies yet'}
                    </p>
                  )}
                  <p className='date'>
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
