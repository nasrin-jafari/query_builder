import WithAuth from '@/hoc/WithAuth';
import Layout from '@/layout';
import ThemeRtlLayout from '@/lib/settings/ThemeRtlLayout';
import { ThemeProviderComponent } from '@/lib/theme/ThemeContext';
import '@/styles/globals.css';
import { Box } from '@mui/material';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';

interface CustomComponent {
  getLayout?: (page: JSX.Element) => JSX.Element;
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as CustomComponent).getLayout ?? ((page) => <Layout>{page}</Layout>);
  const theme = useTheme();
  return (
    <ReduxProvider store={store}>
      <ThemeRtlLayout>
        <ThemeProviderComponent>
          <Box
            sx={{
              direction: 'ltr',
              backgroundColor: theme.palette.grey[50],
              '& .Toastify__toast-body': {
                fontFamily: 'vazir',
                fontSize: '14px',
                textAlign: 'justify',
                direction: 'ltr',
              },
              '& .Toastify__toast': {
                flexDirection: 'row-reverse',
              },
            }}
          >
            {getLayout(<Component {...pageProps} />)}

            <ToastContainer
              position="top-left"
              autoClose={1500}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
          </Box>
        </ThemeProviderComponent>
      </ThemeRtlLayout>
    </ReduxProvider>
  );
}

export default WithAuth(MyApp);
