import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;