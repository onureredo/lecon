import { Header } from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}
