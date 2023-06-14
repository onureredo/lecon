import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faHome,
  faBell,
  faEnvelope,
  faFeather,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <footer>
        <div
          id='mobile-button'
          className='fixed bottom-0 left-0 right-0 bg-rouge bg-opacity-80 backdrop-blur-sm sm:hidden text-white border-t-2 rounded-t-md border-night-shade'
        >
          <ul className='flex justify-around items-center py-4 mb-4 sm:hidden text-white border-t-2 rounded-t-md border-night-shade'>
            <li className='sm:hidden'>
              <Link href='/'>
                <FontAwesomeIcon icon={faHome} size='xl' />
              </Link>
            </li>
            <li className='sm:hidden'>
              <Link href=''>
                <FontAwesomeIcon icon={faSearch} size='xl' />
              </Link>
            </li>
            <li className='sm:hidden'>
              <FontAwesomeIcon icon={faFeather} size='xl' />
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
