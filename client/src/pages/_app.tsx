import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navbar } from '../components/Navbar';
import { AuthProvider } from '../context/authContext';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: e => {
          if ('message' in (e as Error)) {
            console.log('error', e);
          }
        }
      },
      queries: {
        retry: false,
        staleTime: 60 * 1000 * 5,
        onError: e => {
          console.log('error', e);
        }
      }
    }
  });

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
