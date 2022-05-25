import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Thread() {
  const params = useParams();
  const [thread, setThread] = useState([]);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/replies/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('the thread', res);
        setThread(res.foundThread);
        setReplies(res.foundThread.reply);
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
      body: JSON.stringify({ content: reply }),
    };

    fetch(`http://localhost:5000/reply/${params.id}`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log('created reply', res.createdReply);
        if (!res.error) {
          setReplies([...replies, res.createdReply]);
          setReply('');
        }
      })
      .catch((err) => console.log('the error message!', err.message));
  };

  function handleChange(event) {
    const { value } = event.target;
    setReply(value);
  }

  console.log('replies', replies);

  if (!replies) return <></>;

  return (
    <div className='thread'>
      <div className='main-thread'>
        <h1>{thread.title}</h1>
        <p>{thread.content}</p>
      </div>
      <i className='big-guy fa-solid fa-cookie-bite'></i>
      <ul className='reply-list'>
        {replies.map((card) => {
          return (
            <li key={card.id} card={card} className='reply-item'>
              <h2>{card.content}</h2>
              <p className='user-name'>{card.user.username}</p>
            </li>
          );
        })}
      </ul>
      {localStorage.getItem('isLoggedIn') && (
        <form onSubmit={handleCreateThread} className='reply-create'>
          <input
            type='text'
            placeholder='Reply'
            onChange={handleChange}
            name='reply'
            value={reply}
          />
          <button className='add-thread'>
            <i className='fa-solid fa-cookie-bite'></i>
          </button>
        </form>
      )}
    </div>
  );
}

export default Thread;
