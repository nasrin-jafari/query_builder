
import ChatBotBox from '@/components/chatBot/chatBotBox';
import ChatBotIcon from '@/components/chatBot/chatBotIcon';
import { Box } from '@mui/material';
import { FC, useState, useEffect } from 'react';

interface ChatBotProps {}

const ChatBot: FC<ChatBotProps> = () => {
  const [openChat, setOpenchat] = useState<boolean>(true);
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
        // left: '96px',
        transition: 'transform 0.25s ease',
        transform: `translateY(${translateY})`,
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
