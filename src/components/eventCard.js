export default function EventCard(props) {
  const { card } = props;
  return (
    <li className='event'>
      <div className='event--info'>
        <div className='event__image'>
          <img src={card.image} alt={card.title} />
        </div>
        <div className='event__date'>
          <i className='fa-solid fa-calendar-day'></i>
          {card.date}
        </div>
        <div className='event__title'>
          <i className='fa-solid fa-location-dot'></i>
          {card.bigTitle}
        </div>
      </div>
      <a
        className='event__btn'
        href={card.url}
        rel='noreferrer'
        target='_blank'>
        visit website
      </a>
    </li>
  );
}
