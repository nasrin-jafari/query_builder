import React from 'react';
import { Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileDetailsCardProps } from './types';

const FileDetailsCard: React.FC<FileDetailsCardProps> = ({ details }) => {
  const theme = useTheme();

  if (!details) {
    return <p>هیچ جزئیاتی برای نمایش وجود ندارد.</p>;
  }

  return (
    <>
      {Object.entries(details).map(([name, value]) => (
        <Card
          key={name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.palette.grey[50],
            paddingX: 2,
            paddingY: 1,
            direction: 'rtl',
            my: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
          >
            {name}:
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant="body1">
            {value}
          </Typography>
        </Card>
      ))}
    </>
  );
};

export default FileDetailsCard;
