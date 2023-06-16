import { AuthProvider } from '@/context/AuthContext';
import { LocalToastProvider } from 'react-local-toast';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LocalToastProvider>
        <Component {...pageProps} />
      </LocalToastProvider>
    </AuthProvider>
  );
}
