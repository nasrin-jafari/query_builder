import { ChartDataItem } from '@/components/chart/type';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

interface MitreThreatProps {
  data: ChartDataItem[];
  isLoading: boolean;
}

const MitreThreat: FC<MitreThreatProps> = ({ data }) => {
  const theme = useTheme();
  const colors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ];

  const maxValue =
    data
      ?.map((item) => item.value)
      .filter((value): value is number => value !== undefined) // فیلتر کردن مقادیر undefined
      .reduce((max, value) => Math.max(max, value), 0) * 2;

  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Box sx={{ background: '#ffffff1c', p: 3, borderRadius: '20px', height: '300px' }}>
        <Typography variant="h6" fontWeight="bold">
          بازیگران تهدید Mitre
        </Typography>
        <Grid container spacing={2} mt={2}>
          {data?.slice(0, 4).map((item, index) => (
            <Grid
              item
              xs={12}
              sm={3}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  height: 135,
                  width: '50%',
                  backgroundColor: 'black',
                  position: 'relative',
                  borderRadius: '13px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height:
                      maxValue > 0 && item.value !== undefined
                        ? `${(item.value / maxValue) * 100}%`
                        : '0%',
                    backgroundColor: colors[index % colors.length],
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: '13px',
                  }}
                />
              </Box>
              <Typography textAlign="center" variant="body1" color={theme.palette.grey[700]} mt={1}>
                {item?.en}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default MitreThreat;
