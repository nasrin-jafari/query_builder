import { ChartDataItem } from '@/components/chart/type';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import NoData from '@/utils/NoData';

interface HostileTacticsProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const HostileTactics: FC<HostileTacticsProps> = ({ data, isLoading }) => {
  const theme = useTheme();
  const colors = [theme.palette.primary.main, theme.palette.error.main, theme.palette.warning.main];

  if (
    !data ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
  ) {
    return (
      <Grid item lg={4} sm={12} xs={12}>
        <Box sx={{ background: '#ffffff1c', p: 3, borderRadius: '20px', height: '300px' }}>
          <NoData type="list" isLoading={isLoading} />
        </Box>
      </Grid>
    );
  }
  return (
    <Grid item lg={4} sm={12} xs={12}>
      <Box sx={{ background: '#ffffff1c', p: 3, borderRadius: '20px', height: '300px' }}>
        <Typography variant="h6" fontWeight="bold">
          تکنیک های خصمانه
        </Typography>
        <Grid container spacing={1} mt={3}>
          {data?.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Box
                sx={{
                  backgroundColor: colors[index % colors.length],
                  padding: 4,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" color="white" fontWeight="bold">
                  {item?.value}
                </Typography>
              </Box>
              <Typography textAlign="center" variant="body1" color={theme.palette.grey[700]} mt={3}>
                {item?.en}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default HostileTactics;
