import { Timeline } from '@/components/Timeline';
import { AuthProvider } from '@/context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Timeline />
    </AuthProvider>
  );
}
