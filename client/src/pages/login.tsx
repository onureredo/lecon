import { useState } from 'react';
import { Login } from '@/components/Login';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faBackward,
  faFaceKiss,
  faPersonDigging,
  faQuestion,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

const LoginComponent: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const closeLoginDialog = () => {
    setLoginOpen(false);
    router.push('/');
  };

  if (user) {
    return (
      <>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <div className='flex flex-col flex-grow items-center justify-center overflow-hidden'>
            {user && user.profileImage ? (
              <Image
                className='object-cover rounded-full'
                src={user.profileImage}
                draggable={false}
                height={40}
                width={200}
                alt={`${user.profileImage}'s image`}
              />
            ) : (
              <Image
                className='object-cover rounded-full'
                src='https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg='
                alt='Default User Avatar'
                draggable={false}
                height={40}
                width={200}
              />
            )}

            <h2 className='text-3xl max-sm:text-2xl font-bold text-center text-white mt-4'>
              HEY {user.firstName}!
            </h2>
            <p className='text-lg max-sm:text-sm text-white font-semibold mt-2'>
              You are already logged in :3
            </p>
            <button className='text-lg text-white bg-night-shadz py-2 px-4 rounded-full font-bold mt-4 hover:opacity-80 transition-opacity'>
              <Link href='/'>
                <FontAwesomeIcon icon={faBackward} />
              </Link>
            </button>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <Login handleClose={closeLoginDialog} />
      <Footer />
    </div>
  );
};

export default LoginComponent;
