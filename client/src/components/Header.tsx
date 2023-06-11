import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@/context/AuthContext';
import { Login } from './Login';
import Image from 'next/image';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

export const Header: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const openLoginDialog = () => {
    setLoginOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <header className='sticky top-0 z-50 flex justify-between items-center py-2 px-6 bg-rouge backdrop-blur-sm bg-opacity-80 text-white border-b-4 border-night-shade sm:hidden xxs:w-full'>
        <div id='sidebar'>
          <button
            className='text-white focus:online-none z-50'
            // onClick={handleToggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>
        </div>
        <div id='lecon-logo'>
          <Image
            className='object-fit'
            src={'https://i.ibb.co/BZbw1Q7/lecon.png'}
            draggable={false}
            height={36}
            width={36}
            alt='letscon logo'
          />
        </div>
        <div id='login-logout'>
          {user ? (
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} size='lg' />
            </button>
          ) : (
            <button className='rounded-full' onClick={openLoginDialog}>
              <FontAwesomeIcon icon={faRightToBracket} size='lg' />
            </button>
          )}
          {isLoginOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='p-4 rounded-lg max-w-lg max-h-full overflow-hidden'>
                <Login handleClose={closeLoginDialog} />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
