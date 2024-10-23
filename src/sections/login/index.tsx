import axiosMethod, { BASE_URL } from '@/api';
import CustomForm from '@/components/form/CustomForm';
import UseApi from '@/hooks/UseApi';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import * as yup from 'yup';

interface SecurityQuestion {
  security_question_1?: string;
  security_question_2?: string;
}

interface SecurityQuestionWrapper {
  securityQuestion?: SecurityQuestion;
}

interface CaptchaDataProps {
  captcha_key: string;
}

const Login = () => {
  const theme = useTheme();
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false); // برای تعویض فرم
  const [securityQuestion, setSecurityQuestion] = useState<{
    securityQuestion?: any;
    username?: any;
  }>({});
  const [captcha, setCaptcha] = useState<string>('');
  const [userCaptchaInput, setUserCaptchaInput] = useState<string>('');

  const { data: captchaData, refetch } = UseApi<CaptchaDataProps>('/user/captcha/');
  useEffect(() => {
    if (captchaData) {
      const imageUrl = `${BASE_URL}/captcha/image/${captchaData?.captcha_key}/`;
      setCaptcha(imageUrl);
    }
  }, [captchaData]);

  const handleRefreshCaptcha = () => {
    refetch();
  };

  const loginFields = [
    { label: 'نام کاربری', name: 'username', type: 'text' },
    { label: 'رمز عبور', name: 'password', type: 'password' },
    {
      label: 'کد امنیتی',
      name: 'captcha_response',
      type: 'text',
      value: userCaptchaInput,
      onChange: (e: any) => setUserCaptchaInput(e.target.value),
      col: 6,
    },
  ];
  const forgotPasswordFields = [
    ...(!securityQuestion.securityQuestion
      ? [{ label: 'نام کاربری', name: 'username', type: 'text' }]
      : []),
    ...(securityQuestion && securityQuestion.securityQuestion
      ? [
          {
            label: securityQuestion?.securityQuestion.security_question_1,
            name: 'answer_1',
            type: 'text',
          },
          {
            label: securityQuestion?.securityQuestion.security_question_2,
            name: 'answer_2',
            type: 'text',
          },
          {
            label: 'رمز عبور جدید',
            name: 'new_password',
            type: 'password',
            col: 6,
          },
          {
            label: 'تکرار رمز عبور',
            name: 'password_again',
            type: 'password',
            col: 6,
          },
        ]
      : []),
  ];

  const loginValidationSchema = yup.object().shape({
    username: yup.string().required('*اجباری'),
    password: yup.string().required('*اجباری'),
    captcha_response: yup.string().required('*اجباری'),
  });

  const getValidationSchema = (
    securityQuestion: SecurityQuestionWrapper
  ): yup.ObjectSchema<any> => {
    const baseSchema = {
      answer_1: yup.string(),
      answer_2: yup.string(),
      new_password: yup.string(),
      password_again: yup.string(),
    };

    if (securityQuestion?.securityQuestion) {
      return yup.object({
        answer_1: yup.string().required('*اجباری'),
        answer_2: securityQuestion.securityQuestion.security_question_2
          ? yup.string().required('*اجباری')
          : yup.string(),
        new_password: yup.string().required('*اجباری'),
        password_again: yup
          .string()
          .required('*اجباری')
          .oneOf([yup.ref('new_password')], 'رمز عبور باید مشابه باشد'),
      });
    }

    return yup.object(baseSchema);
  };

  const forgotPasswordValidationSchema = yup.lazy(() => getValidationSchema(securityQuestion));

  const onSubmitLogin = async (data: any) => {
    const newData = {
      ...data,
      captcha_key: `${captchaData?.captcha_key}`,
    };
    try {
      const response = await axiosMethod.post('/user/login/', newData);
      localStorage.setItem('auth_token_typeScript', response.data.data.token);
      window.location.reload();
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const onSubmitForgotPassword = async (data: any) => {
    if (securityQuestion?.securityQuestion) {
      try {
        await axiosMethod.post('/user/new_password/', {
          ...data,
          username: securityQuestion.username,
        });
        setIsForgotPassword(false);
      } catch (error) {
        console.error('API call error:', error);
      }
    } else {
      try {
        const response = await axiosMethod.post('/user/forgot_password/', data);
        if (response.data.success) {
          setSecurityQuestion({
            securityQuestion: response.data.data,
            username: data.username,
          });
        }
      } catch (error) {
        console.error('API call error:', error);
      }
    }
  };

  const handleForgotPasswordToggle = () => {
    setIsForgotPassword((prevState) => !prevState);
    setSecurityQuestion({});
  };

  return (
    <>
      <Head>
        <title>سامانه EDR / ورود</title>
      </Head>
      <Box
        sx={{
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
        <Box
          sx={{
            direction: 'ltr',
            bgcolor: theme.palette.grey[50],
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              bgcolor: theme.palette.grey[100],
              borderRadius: `${theme.shape.borderRadius}px`,
              padding: 5,
              textAlign: 'center',
              backgroundImage: 'url(/images/bg-login.png)',
              backgroundPosition: '50px top',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Image alt="Image" width={158} height={172} src="/images/logo.png" priority />

            <Box sx={{ mt: 5, mb: 3 }}>
              <Typography variant="h3">
                {' '}
                {isForgotPassword ? 'بازیابی رمز عبور' : 'ورود به سامانه EDR ققنوس'}{' '}
              </Typography>
              <Typography sx={{ mt: '10px' }}>
                {isForgotPassword
                  ? 'نام کاربری خود را وارد کنید'
                  : 'توضیحات تکمیلی برای راهنمایی یا معرفی بخش بالا'}
              </Typography>
            </Box>

            <Container maxWidth="sm">
              <CustomForm
                allowAccess
                fields={isForgotPassword ? forgotPasswordFields : loginFields}
                onSubmit={isForgotPassword ? onSubmitForgotPassword : onSubmitLogin}
                txtButton={isForgotPassword ? ' بازیابی رمز عبور' : 'ورود'}
                validationSchema={
                  isForgotPassword ? forgotPasswordValidationSchema : loginValidationSchema
                }
                widthButton="25%"
              >
                {!isForgotPassword ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`${captcha}`} alt="Captcha" height="50px" />
                    <Button
                      sx={{ ml: 2 }}
                      variant="text"
                      onClick={handleRefreshCaptcha} // فراخوانی تابع ریفرش
                    >
                      <FiRefreshCw style={{ fontSize: '20px' }} color={theme.palette.grey[200]} />
                    </Button>
                  </div>
                ) : null}
              </CustomForm>

              <Button
                sx={{ mt: 3, color: 'red' }}
                style={{ color: theme.palette.grey[200] }}
                onClick={handleForgotPasswordToggle}
                variant="text"
                color="inherit"
              >
                {isForgotPassword ? 'بازگشت به صفحه ورود' : 'فراموشی رمز عبور'}
              </Button>

              <Typography sx={{ color: theme.palette.grey[200], mt: 5 }}>نسخه : 1.0.0</Typography>
            </Container>
          </Container>
        </Box>
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
    </>
  );
};

Login.getLayout = (page: JSX.Element) => <>{page}</>;

export default Login;
