import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CardCharts from '@/components/common/CardCharts';

interface DataDetail {
  host: string;
  port: string; // Change this to string if that aligns with your data
  fileserver_type: string;
  username: string;
  status: string; // Adjust if needed
}

interface DataCardProps {
  data: DataDetail[];
  openConfirmationDialog: (detail: DataDetail) => void;
  setSelectedItem: (detail: DataDetail) => void;
}

const LastUpdate: React.FC<DataCardProps> = ({ data, openConfirmationDialog, setSelectedItem }) => {
  const theme = useTheme();
  return (
    <CardCharts sx={{ p: 0, background: theme.palette.grey[50], my: 2 }}>
      {data && data.length > 0 ? (
        data.map((detail, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              mb: 2,
              background: theme.palette.grey[50],
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Typography>
                <strong>آدرس سرور:</strong> {detail.host}
              </Typography>
              <Typography>
                <strong>پورت:</strong> {detail.port}
              </Typography>
              <Typography>
                <strong>نوع فایل سرور:</strong> {detail.fileserver_type}
              </Typography>
              <Typography>
                <strong>نام کاربری:</strong> {detail.username}
              </Typography>
              <Typography
                sx={
                  detail.status
                    ? { color: theme.palette.success.main }
                    : { color: theme.palette.error.main }
                }
              >
                <strong>وضعیت:</strong> {detail.status ? 'فعال' : 'غیرفعال'}
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '100px', height: 35 }}
                onClick={() => openConfirmationDialog(detail)}
              >
                حذف
              </Button>
              <Button
                variant="contained"
                sx={{ width: '100px', height: 35 }}
                onClick={() => setSelectedItem(detail)}
              >
                ویرایش
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>هیچ داده‌ای یافت نشد.</Typography>
      )}
    </CardCharts>
  );
};

export default LastUpdate;
