import PageBox from '@/components/common/PageBox';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CardBox from '@/layout/CardBox';

const AboutUs = () => (
  <PageBox title="درباره آنتی ویروس ققنوس">
    <CardBox>
      <Box>
        <Image alt="Image" width={158} height={172} src="/images/logo.png" priority />

        <Typography sx={{ mt: '10px', textAlign: 'justify' }} fontSize={21}>
          EDR یک راهکار امنیت سایبری برای تامین امنیت نقاط پایانی می‌باشد که با نظارت مدوام
          دستگاه‌های کابران نهایی امکان شناسایی و اتخاذ واکنش متناسب با تهدیدات سایبری را به ارمغان
          می‌آورد.
        </Typography>
      </Box>
    </CardBox>
  </PageBox>
);

export default AboutUs;
