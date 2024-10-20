import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import { Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

interface AttackCategory {
  description: string;
}

const MitreId = () => {
  const router = useRouter();
  const { title, mitreId } = router.query;
  const { data } = UseApi<AttackCategory>('/mitre_attack/details/', { id: mitreId });
  const theme = useTheme();
  return (
    <PageBox title={`جزییات ${title}`}>
      <Card
        sx={{
          bgcolor: theme.palette.grey[100],
          padding: '16px 6px',
          display: 'flex',
          textAlign: 'justify',
          direction: 'rtl',
          p: 2,
        }}
      >
        <Typography>{data?.description}</Typography>
      </Card>
    </PageBox>
  );
};

export default MitreId;
