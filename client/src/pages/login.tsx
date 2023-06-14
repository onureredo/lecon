import { useState } from 'react';
import { Login } from '@/components/Login';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { Footer } from '@/components/Footer';

const LoginComponent: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  const closeLoginDialog = () => {
    setLoginOpen(false);
    router.push('/');
  };
  return (
    <div>
      <Header />
      <Login handleClose={closeLoginDialog} />
      <Timeline />
      <Footer />
    </div>
  );
};

export default LoginComponent;
