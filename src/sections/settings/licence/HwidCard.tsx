import { CopyText } from '@/utils/Copytext';
import { Button, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { MdContentCopy } from 'react-icons/md';

interface HwidCardProps {
  hwid: string;
  fetchHwid: () => void;
}
const HwidCard: React.FC<HwidCardProps> = ({ fetchHwid, hwid }) => {
  const theme = useTheme();

  return (
    <Card sx={{ padding: '20px', textAlign: 'center', mt: 4, background: theme.palette.grey[100] }}>
      <Button size="small" onClick={fetchHwid} variant="contained">
        ایجاد hwid
      </Button>
      {hwid && (
        <Card
          sx={{
            mt: 2,
            pl: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: 1,
            background: theme.palette.grey[50],
          }}
        >
          <MdContentCopy
            style={{
              fontSize: '22px',
              cursor: 'pointer',
              color: theme.palette.primary.main,
            }}
            onClick={() => CopyText(hwid)}
          />
          <Typography
            variant="body1"
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              p: 2,
            }}
          >
            {hwid}
          </Typography>
        </Card>
      )}
    </Card>
  );
};

export default HwidCard;
