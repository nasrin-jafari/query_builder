import { Box, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

type ChatIconProps = {
  onOpenchat: () => void;
};
const ChatIcon: FC<ChatIconProps> = ({ onOpenchat }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        borderRadius: '50%',
        position: 'absolute',
        left: '36px',
        bottom: '10px',
        zIndex: '2000',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      }}
      onClick={onOpenchat}
    >
      <Image fill src="/images/icons/chat.svg" alt="chat-bot" style={{ objectFit: 'contain' }} />
    </Box>
  );
};
export default ChatIcon;
