import './style.css';

function About({ dark }) {
  return (
    <div className={dark ? 'about--dark' : 'about'}>
      <i className='big-guy fa-solid fa-cookie-bite'></i>
      <p id='paragraph'>
        Cookie bite is a website that makes holiday planning easier for youth.
        The mission of cookie bite is to make people's lives easier by
        collecting all available events on one website. Cookie bite strives to
        provide its users with a fast, easy-to-use platform where they can finds
        fun and exciting events in their area.
      </p>
      <p id='paragraph'>
        Cookie bite was founded by a "Omar Alsyouf" who wanted to make it easier
        for others to plan their holidays. Alsyouf was frustrated by how
        difficult it was for him to find the best holiday events around him, so
        he decided to create his own website that would allow users to easily
        search through thousands of events near them.
      </p>
      <p id='paragraph'>
        Alsyouf designed the site with user experience as his top priority,
        making it easy for people to quickly find what they want without having
        to go through extra steps or fill out lengthy forms. Cookie bite also
        offers users the ability to save events so they can refer back later on
        if they need more information or want more details about what they're
        looking at before committing themselves fully into attending the event
        itself!
      </p>
    </div>
  );
}

export default About;
