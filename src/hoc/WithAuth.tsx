// withAuth.tsx
import axiosMethod from '@/api';
import LoadingIcon from '@/components/common/LoadingIcon';
import ThemeRtlLayout from '@/lib/settings/ThemeRtlLayout';
import { ThemeProviderComponent } from '@/lib/theme/ThemeContext';
import Login from '@/sections/login';
import Question from '@/sections/questions';
import { Box } from '@mui/material';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface DecodedToken extends JwtPayload {
  exp_date?: number;
}

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(true);
    const [question, setQuestion] = useState<Boolean>(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = localStorage.getItem('auth_token_typeScript');
        if (token) {
          try {
            const decoded = jwt.decode(token) as DecodedToken;
            const isExpired = decoded?.exp_date ? decoded.exp_date * 1000 < Date.now() : false;
            if (!isExpired) {
              const response = await axiosMethod.get('/licence/info/');

              if (response.data.code == 2069) {
                setQuestion(true);
              }
              if (response.data.data[0].days_to_expire <= 0) {
                router.push('/settings/licence');
              }
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error('Error decoding token or fetching licence info:', error);
          }
        }
        setLoading(false);
      };

      checkAuthentication();
    }, [router.pathname]);

    if (loading) {
      // Show a loading spinner or placeholder while checking authentication status
      return (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: '#1A242E',
            '& img': {
              animation: 'rotate 2s infinite',
              '@keyframes rotate': {
                from: {
                  transform: 'rotate(0deg)',
                },
                to: {
                  transform: 'rotate(360deg)',
                },
              },
            },
          }}
        >
          <LoadingIcon />
        </Box>
      );
    }
    if (question) {
      return (
        <ThemeRtlLayout>
          <ThemeProviderComponent>
            <Question />
          </ThemeProviderComponent>
        </ThemeRtlLayout>
      );
    }
    if (!isAuthenticated) {
      return (
        <ThemeRtlLayout>
          <ThemeProviderComponent>
            <Login />
          </ThemeProviderComponent>
        </ThemeRtlLayout>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
