import { useState } from 'react';
import { Login } from '@/components/Login';

const LoginComponent: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const closeLoginDialog = () => {
    setLoginOpen(false);
  };
  return (
    <div>
      <Login handleClose={closeLoginDialog} />
    </div>
  );
};

export default LoginComponent;
