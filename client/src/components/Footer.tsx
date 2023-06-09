import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Login } from './Login';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faHome,
  faBell,
  faEnvelope,
  faFeather,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openLoginDialog = () => {
    setLoginOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginOpen(false);
  };
  return (
    <>
      <footer>
        <div id='mobile-button'>
          <ul className='z-50 fixed bottom-0 left-0 right-0 bg-rouge bg-opacity-50 backdrop-blur-sm flex justify-around items-center py-4 mb-4 sm:hidden text-white border-t-2 rounded-t-md border-night-shade'>
            <li className='sm:hidden'>
              <Link href='/'>
                <FontAwesomeIcon icon={faHome} size='xl' />
              </Link>
            </li>
            <li className='sm:hidden'>
              <Link href=''>
                <FontAwesomeIcon icon={faUser} size='xl' />
              </Link>
            </li>
            <li className='sm:hidden'>
              {user ? (
                <FontAwesomeIcon
                  icon={faFeather}
                  size='xl'
                  // onClick={handleOpenTweetPostModal}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faFeather}
                  size='xl'
                  onClick={openLoginDialog}
                />
              )}
            </li>
            <li className='sm:hidden'>
              <Link href='/notifications'>
                <FontAwesomeIcon icon={faBell} size='xl' />
              </Link>
            </li>
            <li className='sm:hidden'>
              <Link href='/messages'>
                <FontAwesomeIcon icon={faEnvelope} size='xl' />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
