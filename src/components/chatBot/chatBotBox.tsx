import { Avatar, Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import ChatInput from './chatBotInput';
import jwt, { JwtPayload } from 'jsonwebtoken';
interface DecodedToken extends JwtPayload {
  exp_date?: number;
  username: string;
  permissions: { [key: string]: any };
  role: string;
}
type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type ChatBotBoxProps = {
  onOpenchat: () => void;
};

const ChatBotBox: FC<ChatBotBoxProps> = ({ onOpenchat }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const token = localStorage.getItem('auth_token_typeScript');
  const decoded = token
    ? (jwt.decode(token) as DecodedToken)
    : { username: 'Unknown', role: 'Unknown' };
  const usernameInitial = decoded.username[0].toUpperCase();
  const username = capitalizeFirstLetter(decoded.username);
  const role = capitalizeFirstLetter(decoded.role);
 
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = { sender: 'user', text: message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      setTimeout(() => {
        const botResponse = generateBotResponse(message);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
      }, 1000);
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    if (userMessage.includes('سلام')) {
      return 'سلام! چطور می‌توانم به شما کمک کنم؟';
    } else if (userMessage.includes('خداحافظ')) {
      return 'خداحافظ! روز خوبی داشته باشید.';
    } else {
      return 'من متوجه نشدم. لطفاً بیشتر توضیح دهید.';
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '10px',
        left: '96px',
        zIndex: '2000',
        width: '380px',
        height: '600px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* header */}
      <Box
        sx={{
          position: 'relative',
          background: '#e57b2d',
          width: '100%',
          height: '80px',
          padding: '10px',
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
             bgcolor: theme.palette.primary.main,
             color: theme.palette.common.white,
          }}
        >
          {usernameInitial}
        </Avatar>
        <Typography variant="body1">سامانه پشتیبانی EDR</Typography>
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            width: '28px',
            height: '28px',
            background: '#ffffff1c',
            borderRadius: '50%',
          }}
          onClick={onOpenchat}
        >
          <Image
            fill
            src="/images/icons/cross.svg"
            alt="chat-bot"
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
      {/* chatroom */}
      <Box
        ref={chatContainerRef}
        sx={{
          width: '100%',
          height: '420px',
          backgroundImage: 'url("/images/bgchat.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              textAlign: msg.sender === 'user' ? 'left' : 'right',
              marginBottom: '10px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                wordWrap: 'break-word',
                maxWidth: '100%',
                background: msg.sender === 'user' ? '#fff' : '#e57b2d',
                padding: '8px',
                borderRadius: '8px',
                display: 'inline-block',
                color: msg.sender === 'user' ? '#000' : '#fff',
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* chatinput */}
      <ChatInput
        message={message}
        onChange={handleChangeTextField}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default ChatBotBox;
