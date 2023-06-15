import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdVerified } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faHashtag,
  faList,
  faBookmark,
  faUser,
  faGear,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  //test
  const { user } = useAuth();
  const sidebarClass = isSidebarOpen
    ? 'translate-x-0 ease-out transition duration-300'
    : '-translate-x-full ease-in transition duration-300';

  return (
    <>
      <nav
        className={`h-screen w-64 pt-4 pl-4 flex flex-col text-white fixed bg-rouge border-r-2 border-r-night-shade overflow-auto transform ${sidebarClass}`}
      >
        <ul className='space-y-8 flex flex-col '>
          <div>
            <li>
              <div id='user' className=''>
                {user && user.profileImage ? (
                  <Image
                    className='object-cover rounded-full'
                    src={user.profileImage}
                    alt='User Avatar'
                    draggable={false}
                    height={36}
                    width={36}
                  />
                ) : (
                  <Image
                    className='object-cover rounded-full'
                    src='https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg='
                    alt='Default User Avatar'
                    draggable={false}
                    width={36}
                    height={36}
                  />
                )}
                {user && (
                  <>
                    <p className='text-md font-semibold mt-2'>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className='text-sm text-gray-500'>@{user.username}</p>
                    <div className='flex mt-1 '>
                      <p className='text-md font-bold'>
                        {user.following.length}
                      </p>
                      <p className='text-md ml-1'>Following</p>
                      <p className='text-md font-bold ml-1'>
                        {user.followers.length}
                      </p>
                      <p className='text-md ml-1 '>Followers</p>
                    </div>
                    {/* <div className='border-b-2 border-gray-500 mt-2'></div> */}
                  </>
                )}
              </div>
            </li>
          </div>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors'>
            <Link href='/'>
              <FontAwesomeIcon icon={faUser} size='xl' />
            </Link>
            <p className='text-lg font-bold ml-2'>Profil</p>
          </li>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors text-night-shadz hover:cursor-pointer'>
            <Link href='/explore'>
              <MdVerified size='24px' />
            </Link>
            <p className='text-lg font-bold ml-2 text-white'>Lecon Red</p>
          </li>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors'>
            <Link href='/explore'>
              <FontAwesomeIcon icon={faHashtag} size='xl' />
            </Link>
            <p className='text-lg font-bold ml-2'>Explore</p>
          </li>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors'>
            <Link href='/lists'>
              <FontAwesomeIcon icon={faList} size='xl' />
            </Link>
            <p className='text-lg font-bold ml-2'>Lists</p>
          </li>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors'>
            <Link href='/bookmarks'>
              <FontAwesomeIcon icon={faBookmark} size='xl' />
            </Link>
            <p className='text-lg font-bold ml-2'>Bookmarks</p>
          </li>
          <li className='flex items-center text-sm font-semibold hover:opacity-60 transition-colors'>
            <Link href='/settings'>
              <FontAwesomeIcon icon={faGear} size='xl' />
            </Link>
            <p className='text-lg font-bold ml-2'>Settings</p>
          </li>
          <li>
            <button
              className='flex items-center'
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faCircleArrowLeft} size='xl' />
              <p className='text-lg font-bold ml-2'>Close Sidebar</p>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
