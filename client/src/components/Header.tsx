import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@/context/AuthContext';
import { Login } from './Login';
import { Sidebar } from './Sidebar';
import Image from 'next/image';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

export const Header: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const openLoginDialog = () => {
    setLoginOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginOpen(false);
    router.push('/');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className='sticky z-50 top-0 flex justify-between items-center py-2 px-6 bg-rouge backdrop-blur-sm bg-opacity-50 text-white border-b-4 border-night-shade sm:hidden xxs:w-full'>
        <div id='sidebar' className='h-full'>
          <button
            className='text-white focus:outline-none'
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {user && user.profileImage ? (
              <Image
                className='object-cover rounded-full'
                src={user.profileImage}
                alt='User Avatar'
                draggable={false}
                height={36}
                width={36}
              />
            ) : null}
          </button>
        </div>
        <div
          className={`fixed top-0 bottom-0 left-0 bg-rouge text-white w-16 sm:w-64 transform-gpu transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        <div id='lecon-logo' className=''>
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
              <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
            </button>
          ) : (
            <button className='rounded-full' onClick={openLoginDialog}>
              <FontAwesomeIcon icon={faRightToBracket} size='xl' />
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
