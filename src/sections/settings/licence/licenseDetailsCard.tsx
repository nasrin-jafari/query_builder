import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LicenseData } from './index';

interface LicenseDetail {
  label: string;
  value: string | number;
  color?: string;
}

interface LicenseDetailsCardProps {
  isLoading: boolean;
  showLicense: LicenseData[] | null;
  licenseDetails: LicenseDetail[];
}

const LicenseDetailsCard: React.FC<LicenseDetailsCardProps> = ({
  isLoading,
  showLicense,
  licenseDetails,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        minHeight: '300px',
        background: theme.palette.grey[100],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <Typography>در حال بارگذاری...</Typography>
        ) : (
          showLicense &&
          licenseDetails.map((detail, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: `1px solid ${theme.palette.grey[400]}`,
                mb: 2,
              }}
            >
              <Typography>{detail.label}: </Typography>
              <Typography sx={{ color: detail.color || 'inherit' }}>{detail.value}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
};

export default LicenseDetailsCard;
