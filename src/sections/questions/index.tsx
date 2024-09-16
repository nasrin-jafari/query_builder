import { CustomForm } from '@/components';
import { FormData } from '@/components/form/CustomForm';
import UseApi from '@/hooks/UseApi';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import jwt, { JwtPayload } from 'jsonwebtoken';
interface QuestionData {
  question_1: string;
  question_2: string;
}
const Question = () => {
  const theme = useTheme();
  const token = localStorage.getItem('auth_token_typeScript') || '';
  const tokenDecode = jwt.decode(token) as JwtPayload;
  const { data: question, handleApiRequest } = UseApi<QuestionData>('/user/security_questions/get/');

  const onSubmit = async (formData: FormData) => {
    const formDataToSave = {
      username: tokenDecode?.username,
      questions_and_answers: [
        {
          question: question?.question_1,
          answer: formData?.question1,
        },
        {
          question: question?.question_2,
          answer: formData?.question2,
        },
      ],
    };
    try {
      const res = await handleApiRequest(`/user/security_questions/`, 'post', formDataToSave);
      console.log(res);
      if (res) {
        location.reload();
      }
    } catch (error) {
      console.error('Error updating switch:', error);
    }
  };
  const validationSchema = Yup.object().shape({
    question1: Yup.string().required('این فیلد الزامی است'),
    question2: Yup.string().required('این فیلد الزامی است'),
  });

  const fields = [
    { label: question?.question_1 || 'سوال ۱', name: 'question1', type: 'text' },
    { label: question?.question_2 || 'سوال ۲', name: 'question2', type: 'text' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          borderRadius: `${theme.shape.borderRadius}px`,
          padding: 5,
          textAlign: 'center',
          backgroundImage: 'url(/images/bg-login.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <CustomForm fields={fields} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 4, color: theme.palette.error.main, fontSize: '12px', direction: 'ltr' }}
          >
            * لطفاً با دقت به سوالات امنیتی پاسخ دهید. در صورت فراموشی رمز عبور، از شما خواسته
            خواهد شد به این سوالات پاسخ دهید تا بتوانید حساب خود را بازیابی کنید.
          </Typography>
        </CustomForm>
      </Container>
    </Box>
  );
};

export default Question;
