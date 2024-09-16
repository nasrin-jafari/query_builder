import React from 'react';
import { Box, Card, Typography, Button, useTheme } from '@mui/material';

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
    <Box>
      {data && data.length > 0 ? (
        data.map((detail, index) => (
          <Card
            key={index}
            variant="elevation"
            sx={{
              mt: 2,
              mb: 2,
              bgcolor: theme.palette.grey[300],
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
          </Card>
        ))
      ) : (
        <Typography>هیچ داده‌ای یافت نشد.</Typography>
      )}
    </Box>
  );
};

export default LastUpdate;
