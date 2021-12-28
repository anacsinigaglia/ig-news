import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return [
    // eslint-disable-next-line react/jsx-key
    <SessionProvider session={pageProps.session}>
      <Header /> <Component {...pageProps} />
    </SessionProvider>,
  ];
}

export default MyApp;
