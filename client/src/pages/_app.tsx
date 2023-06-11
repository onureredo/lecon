import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Timeline />
      <Footer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
