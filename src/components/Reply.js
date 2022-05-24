import { useState, useEffect, React } from 'react';

import './style.css';

const Reply = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    //   },
    // };

    fetch(`http://localhost:5000/replies/1`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setData(res.data);
      });
  }, []);

  console.log('my threads', data);
  return (
    <div className='thread'>
      <ul className='reply-list'>
        {data.map((card) => {
          return (
            <li key={card.id} card={card} className='reply-item'>
              <h1>{card.title}</h1>
              <p>{card.content}</p>
            </li>
          );
        })}
        <li className='reply-item__create'>Reply</li>
      </ul>
    </div>
  );
};

export default Reply;
