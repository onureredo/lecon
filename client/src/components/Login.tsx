import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

interface LoginProps {
  handleClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setSuccess('Login successful!');
      setRedirecting(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      setError('Failed to login');
    }
  };

  return (
    <>
      <div className='h-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-zinc-950 bg-opacity-80 text-white'>
        <div className='border-2 border-gray-700 p-8 rounded-lg'>
          <div className='flex justify-between mb-4'>
            <Image
              className='object-cover hover:cursor-pointer hover:opacity-75 transition-opacity'
              src={'https://i.ibb.co/QCbrWH1/leconnn.png'}
              draggable={false}
              height={40}
              width={96}
              alt='lecon-logo'
            />
            <h2 className='text-xl font-semibold text-center'>Login</h2>
          </div>
          {error && !success && (
            <p className='text-red-500 mb-2 bg-red-100 p-2 rounded font-semibold'>
              {error}
            </p>
          )}
          {success && (
            <div>
              <p className='text-green-500 mb-2 bg-green-100 p-2 rounded font-semibold'>
                {success}
              </p>
              {redirecting && <p className='text-white mb-2'>Redirecting...</p>}
            </div>
          )}
          <form onSubmit={handleLogin} className='w-64'>
            <label className='block mb-2'>
              Email:
              <input
                className='block w-full rounded px-2 py-1 mt-1 mb-2 focus:outline-none focus:ring-2 focus:ring-night-shadz text-gray-900 font-medium'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className='block mb-2'>
              Password:
              <input
                className='block w-full border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-night-shadz text-gray-900 font-medium'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p>
              {`Don't have an account ? `}
              <Link
                href='/register'
                className='text-night-shadz hover:opacity-75 transition-opacity font-bold'
              >
                Sign up
              </Link>
            </p>
            <div className='flex justify-between items-center'>
              <button
                type='submit'
                className='bg-night-shadz text-white font-semibold px-10 py-2 mt-4 rounded focus:outline-none hover:opacity-75 transition-opacity'
              >
                Login
              </button>
              <button
                onClick={handleClose}
                className='mt-4 ml-4 bg-gray-500 text-white font-semibold px-10 py-2 rounded focus:outline-non hover:opacity-75 transition-opacity'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
