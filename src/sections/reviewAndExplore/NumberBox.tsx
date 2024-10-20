import { Box, Grid, Typography, useTheme } from '@mui/material';
import CardCharts from '@/components/common/CardCharts';

interface NumberBoxTimeItemProps {
  title: string;
  number: number;
  color?: string;
}

const NumberBoxTimeItem = ({ title, number, color }: NumberBoxTimeItemProps) => {
  const theme = useTheme();
  return (
    <Grid item md={6} lg={3}>
      <CardCharts>
        <Box
          sx={{
            backgroundImage: 'url(/images/bg-review.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '170px',
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: color === 'red' ? theme.palette.error.main : theme.palette.warning.main,
                borderRadius: '50%',
                mr: 3,
              }}
            />
            <Box sx={{ flexDirection: 'column' }}>
              <Typography variant="h5" sx={{ color: theme.palette.grey[900] }}>
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 2,
                  color: color === 'red' ? theme.palette.error.main : theme.palette.warning.main,
                }}
              >
                {number}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardCharts>
    </Grid>
  );
};

interface NumberBoxProps {
  data: {
    logs_last_7_days: number;
    logs_last_month: number;
    alerts_last_7_days: number;
    alerts_last_month: number;
  };
}
const NumberBox = ({ data }: NumberBoxProps) => {
  return (
    <>
      <Grid container spacing={2.5}>
        <NumberBoxTimeItem title={'تعداد لاگ‌ها در هفته گذشته'} number={data?.logs_last_7_days} />
        <NumberBoxTimeItem title={'تعداد لاگ‌ها در ماه گذشته'} number={data?.logs_last_month} />
        <NumberBoxTimeItem
          title={'تعداد هشدارها در هفته گذشته'}
          number={data?.alerts_last_7_days}
          color={'red'}
        />
        <NumberBoxTimeItem
          title={'تعداد هشدارها در ماه گذشته'}
          number={data?.alerts_last_month}
          color={'red'}
        />
      </Grid>
    </>
  );
};
export default NumberBox;
