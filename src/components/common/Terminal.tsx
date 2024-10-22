import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Terminal: React.FC = () => {
  const texts = [
    'Starting system...',
    'Loading modules...',
    'Initializing services...',
    'Connecting to the server...',
    'Downloading updates...',
    'Installing updates...',
    'Rebooting system...',
    'System rebooted successfully.',
    'Running diagnostics...',
    'System is up and running!',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '16px',
        borderRadius: '8px',
        width: '600px',
        height: '400px',
        overflowY: 'auto',
        direction: 'rtl',
      }}
    >
      <Box>
        {texts.slice(0, currentIndex + 1).map((line, index) => (
          <Typography key={index} sx={{ whiteSpace: 'pre-wrap' }}>
            - {line}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Terminal;
