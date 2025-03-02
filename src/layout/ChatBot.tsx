import ChatBotBox from '@/components/chatBot/ChatBox';
import ChatBotIcon from '@/components/chatBot/ChatIcon';
import { Box } from '@mui/material';
import { FC, useState, useEffect } from 'react';

const ChatBot: FC = () => {
  const [openChat, setOpenchat] = useState<boolean>(false);
  const [translateY, setTranslateY] = useState<string>('100px');

  const handleOpenchat = () => {
    setOpenchat((prev) => !prev);
  };

  useEffect(() => {
    if (openChat) {
      setTranslateY('0');
    } else {
      setTranslateY('16px');
    }
  }, [openChat]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '30px',
        transition: 'transform 0.25s ease',
        transform: `translateY(${translateY})`,
        zIndex: 99999,
      }}
    >
      {openChat ? (
        <ChatBotBox onOpenchat={handleOpenchat} />
      ) : (
        <ChatBotIcon onOpenchat={handleOpenchat} />
      )}
    </Box>
  );
};

export default ChatBot;
