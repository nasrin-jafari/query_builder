import { Avatar, Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import ChatInput from './chatBotInput';
import jwt, { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const token = localStorage.getItem('auth_token_typeScript');
  const decoded = token
    ? (jwt.decode(token) as DecodedToken)
    : { username: 'Unknown', role: 'Unknown' };
  const usernameInitial = decoded.username[0].toUpperCase();

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

const fetchMessage = async (message: string) => {
    setIsLoading(true);
    try {
      // افزودن پیام لودینگ به لیست پیام‌ها
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: '...' }, // پیام لودینگ
      ]);
  
      const response = await axios.post('http://172.16.50.192:8080/chat', {
        user_input: message,
      });
  
      setMessages((prevMessages) => {
        const messagesWithoutLoading = prevMessages.slice(0, -1);
        return [
          ...messagesWithoutLoading,
          { sender: 'bot', text: response.data.response },
        ];
      });
    } catch (error) {
      // در صورت خطا پیام مناسب نشان دهید
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // حذف پیام لودینگ
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = { sender: 'user', text: message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage(''); // پاک کردن فیلد ورودی
      fetchMessage(message); // دریافت پاسخ بات
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
          background: 'rgb(62,64,149)',
          width: '100%',
          height: '50px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          gap: '6px',
          boxShadow: '0 4px 6px rgba(255, 220, 205, 0.3)', 
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
            width: '20px',
            height: '20px',
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
          height: '456px',
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
              variant="caption"
              sx={{
                wordWrap: 'break-word',
                maxWidth: '100%',
                background: msg.sender === 'user' ? '#fff' : 'rgb(62,64,149)',
                padding: '8px',
                borderRadius: '8px',
                display: 'inline-block',
                color: msg.sender === 'user' ? '#000' : '#fff',
              }}
            >
              {msg.sender === 'bot' && isLoading && index === messages.length - 1
                ? '...' 
                : msg.text}
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
