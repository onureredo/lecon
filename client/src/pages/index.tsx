import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import ProfilePage from '@/components/Profile';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <ProfilePage />
      <Footer />
    </AuthProvider>
  );
}
