import { ChartDataItem } from '@/components/chart/type';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import NoData from '@/utils/NoData';

interface MitreTacticsProps {
  data: ChartDataItem[];
  isLoading?: boolean;
}

const MitreTactics: FC<MitreTacticsProps> = ({ data, isLoading }) => {
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
  if (
    !data ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
  ) {
    return (
      <Grid item lg={4} sm={12} xs={12}>
        <Box sx={{ background: '#ffffff1c', p: 3, borderRadius: '20px', height: '300px' }}>
          <NoData type="bar-horizontal" isLoading={isLoading} />
        </Box>
      </Grid>
    );
  }
  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Box sx={{ background: '#ffffff1c', p: 3, borderRadius: '20px', height: '300px' }}>
        <Typography variant="h6" fontWeight="bold">
          تاکتیک های حمله
        </Typography>
        <Grid container spacing={2} mt={2}>
          {data?.slice(0, 3).map((item, index) => (
            <Grid
              item
              xs={12} // برای این که نوارها در یک خط قرار بگیرند
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row', // تنظیم به حالت افقی
                alignItems: 'center', // مرکز چین افقی
              }}
            >
              <Box
                sx={{
                  height: 40, // ارتفاع نوار
                  width: '100%', // استفاده از کل عرض برای نوار
                  backgroundColor: 'black',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    height: '100%', // تنظیم به 100% ارتفاع برای پر کردن
                    width:
                      maxValue > 0 && item.value !== undefined
                        ? `${(item.value / maxValue) * 100}%`
                        : '100%', // استفاده از 100% برای مقادیر خالی
                    backgroundColor: colors[index % colors.length],
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: '0px',
                  }}
                />
              </Box>
              <Typography
                textAlign="center"
                variant="body1"
                color={theme.palette.grey[700]}
                sx={{
                  ml: 2, // فاصله بین نوار و متن
                  whiteSpace: 'nowrap', // جلوگیری از شکستن خط
                }}
              >
                {item?.en || '-'} {/* نمایش یک مقدار پیش‌فرض اگر en خالی باشد */}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default MitreTactics;
