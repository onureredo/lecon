import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <Timeline />
      <Footer />
    </AuthProvider>
  );
}
