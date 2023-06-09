import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const Register: React.FC = () => {
  const auth = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bgImage, setbgImage] = useState('');
  const [location, setLocation] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        bio,
        profileImage,
        bgImage,
        location,
      };
      await auth.register(userData);
      setSignupSuccess(true);
    } catch (error) {
      console.log('Registration error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-md border-2 border-gray-800 p-6 text-white'>
        <div className='flex justify-between mb-4'>
          <Link href='/'>
            <Image
              className='object-contain'
              src={'https://i.ibb.co/QCbrWH1/leconnn.png'}
              draggable={false}
              height={40}
              width={128}
              alt='letscon logo'
            />
          </Link>
          <h2 className='text-2xl font-bold mt-1'>Sign up</h2>
        </div>
        <form onSubmit={handleSignup} className='text-white font-semibold'>
          <div className='mb-4'>
            <label className='block mb-2'>First Name</label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Last Name</label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2 '>Profile Image</label>
            <input
              type='text'
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder='Profile Image URL'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 '>Profile Background Image</label>
            <input
              type='text'
              value={bgImage}
              onChange={(e) => setbgImage(e.target.value)}
              placeholder='Profile Background Image URL'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Location</label>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='e.g Germany, UK, France'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              maxLength={12}
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Bio</label>
            <input
              type='text'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder='Tell something about you!'
              className='w-full px-3 py-2 text-gray-900 placeholder-gray-400 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-night-shadz'
              maxLength={48}
            />
          </div>
          {signupSuccess && (
            <div className='mb-4 text-green-500 font-semibold'>
              Signup successful! You can now proceed to login.
            </div>
          )}
          <div className='flex justify-between'>
            <button
              type='submit'
              className='w-full py-2 text-white bg-night-shadz rounded-lg hover:opacity-80 transition-opacity focus:outline-none'
            >
              Sign up
            </button>
            <button className='w-full ml-4 py-2 text-white bg-gray-500 rounded-lg hover:opacity-80 transition-opacity focus:outline-none'>
              <Link href='/'>Cancel</Link>
            </button>
          </div>
        </form>
        <div className='mt-6 text-sm text-gray-500'>
          <p className='text-md'>
            By signing up, you agree to our
            <Link href='' className='hover:opacity-75'>
              {' '}
              Terms and Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
