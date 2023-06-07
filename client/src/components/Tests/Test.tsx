import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleLogin = () => {
    auth.login(email, password);
  };

  const handleLogout = () => {
    auth.logout();
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className=' bg-white'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout} className='ml-6'>
          Logout
        </button>
      </div>
    </div>
  );
};

export const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const auth = useAuth();

  const handleRegister = () => {
    auth.register({ firstName, lastName, username, email, password });
  };

  return (
    <div className='mt-10'>
      <input
        type='text'
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className='bg-white'>
        Register
      </button>
    </div>
  );
};
