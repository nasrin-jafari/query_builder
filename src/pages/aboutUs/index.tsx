import PageBox from '@/components/common/PageBox';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import CardBox from '@/layout/CardBox';
import UseApi from '@/hooks/UseApi';
import { useState } from 'react';
import { BASE_URL } from '@/api';

const AboutUs = () => {
  const { data } = UseApi('/dashboard/videos-list/');
  const [selectedVideo, setSelectedVideo] = useState(''); // ذخیره ویدئوی انتخاب شده
  const theme = useTheme();
  // هندل تغییر ویدیو از dropdown
  const handleVideoChange = (event: any) => {
    setSelectedVideo(event.target.value);
  };
  const videoList = Array.isArray(data) ? data : [];

  return (
    <PageBox title="درباره EDR ققنوس">
      <CardBox>
        {/* اضافه کردن display flex برای باکس اصلی */}
        <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
          {/* ستون سمت چپ - اطلاعات و فرم انتخاب ویدیو */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                borderRadius: '15px',
                backgroundColor: theme.palette.grey[500],
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Image alt="Image" width={158} height={172} src="/images/logo.png" priority />
              <Typography sx={{ mt: '20px', textAlign: 'justify' }} fontSize={21}>
                EDR یک راهکار امنیت سایبری برای تامین امنیت نقاط پایانی می‌باشد که با نظارت مدوام
                دستگاه‌های کابران نهایی امکان شناسایی و اتخاذ واکنش متناسب با تهدیدات سایبری را به
                ارمغان می‌آورد.
              </Typography>

              {/* Dropdown برای انتخاب ویدئو */}
              <Box sx={{ mt: '20px', textAlign: 'center' }}>
                <FormControl fullWidth sx={{ mb: '20px' }}>
                  <InputLabel id="video-select-label">انتخاب ویدئو</InputLabel>
                  <Select
                    labelId="video-select-label"
                    id="video-select"
                    value={selectedVideo}
                    label="انتخاب ویدئو"
                    onChange={handleVideoChange}
                  >
                    {videoList?.map((video: string, index: number) => (
                      <MenuItem key={index} value={video}>
                        {video}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>

          {/* ستون سمت راست - ویدئو */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                borderRadius: '15px',
                backgroundColor: theme.palette.grey[500],

                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography fontSize={18} sx={{ mb: '10px' }}>
                پخش ویدئو
              </Typography>

              <video
                key={selectedVideo} // اضافه کردن key برای رندر مجدد
                controls
                width="100%"
                height="auto"
                style={{
                  borderRadius: '15px',
                  filter: 'brightness(0.9)',
                  transition: 'filter 0.3s ease-in-out',
                }}
              >
                {selectedVideo && (
                  <source
                    src={`${process.env.NEXT_PUBLIC_BASEURL}/dashboard/video/${selectedVideo}/`}
                    type="video/mp4"
                  />
                )}
                مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
              </video>
            </Paper>
          </Grid>
        </Grid>
      </CardBox>
    </PageBox>
  );
};

export default AboutUs;
