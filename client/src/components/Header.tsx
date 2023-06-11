import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const openLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className='sticky top-0 flex justify-between items-center py-2 px-6 bg-rouge backdrop-blur-sm bg-opacity-80 text-white border-b-4 border-night-shade sm:hidden xxs:w-full'>
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
            <button className='rounded-full' onClick={openLogin}>
              <FontAwesomeIcon icon={faRightToBracket} size='lg' />
            </button>
          )}
        </div>
      </header>
    </>
  );
};
