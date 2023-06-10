import { useState } from 'react';
import { Login } from '@/components/Login';
import { useRouter } from 'next/router';

const LoginComponent: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  const closeLoginDialog = () => {
    setLoginOpen(false);
    router.push('/');
  };
  return (
    <div>
      <Login handleClose={closeLoginDialog} />
    </div>
  );
};

export default LoginComponent;
