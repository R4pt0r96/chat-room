import { Link } from 'react-router-dom';
import { chatRooms } from '../data/chatRooms';
import './styles.css';

const Landing = () => {
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <ul className='chat-room-list'>
        {chatRooms.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`} className='li'>
            <li>{room.title}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export { Landing };
