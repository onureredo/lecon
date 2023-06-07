import { LoginComponent, RegisterComponent } from '@/components/tests/Test';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <>
        <LoginComponent />
        <RegisterComponent />
      </>
    </AuthProvider>
  );
}
