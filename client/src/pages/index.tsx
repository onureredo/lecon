import { Header } from '@/components/Header';
import { Login } from '@/components/Login';
import { LoginComponent, RegisterComponent } from '@/components/tests/Test';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}
