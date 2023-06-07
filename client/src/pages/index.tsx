import { LoginComponent, RegisterComponent } from '@/components/Tests/Test';
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
