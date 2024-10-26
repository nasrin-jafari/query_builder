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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const token = localStorage.getItem('auth_token_typeScript');
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

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
    setMessageInput(event.target.value);
  };

  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem('chatRooms') || '[]') as string[];
    setRooms(savedRooms);
    joinRoom('1');
  }, []);

  const joinRoom = (roomName: string) => {
    if (socket) {
      socket.close();
    }

    const newSocket = new WebSocket(`ws://172.16.50.38:8000/ws/chat/${roomName}/`);
    setSocket(newSocket);
    // setCurrentRoom(roomName);
    setMessages([]);
    let answer = '';

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'stream' && data.response) {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];

          if (!lastMessage || lastMessage.sender !== 'bot') {
            return [...prev, { sender: 'bot', text: '...' }]; // پیام لودینگ
          }
          return prev;
        });
        answer += data.response;
      }

      if (data.done) {
        console.log({ answer });

        setMessages((prev) => [
          ...prev.slice(0, -1), // حذف پیام لودینگ
          { sender: 'bot', text: answer },
        ]);
        answer = '';
      }
    };
    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      alert('Error connecting to the chat room.');
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  };

  const createRoom = (roomName: string) => {
    if (!rooms.includes(roomName)) {
      const updatedRooms = [...rooms, roomName];
      setRooms(updatedRooms);
      localStorage.setItem('chatRooms', JSON.stringify(updatedRooms));
      joinRoom(roomName);
    }
  };

  const handleSendMessage = () => {
    if (messageInput && socket && socket.readyState === WebSocket.OPEN) {
      const userMessage: Message = { sender: 'user', text: messageInput };
      setMessages((prev) => [...prev, userMessage]);
      socket.send(JSON.stringify({ message: messageInput }));
      setMessageInput('');
    }
  };

  useEffect(() => {
    chatMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessage = async (message: string) => {
    setIsLoading(true);
    try {
      // افزودن پیام لودینگ به لیست پیام‌ها
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: '...' }, // پیام لودینگ
      ]);

      const response = await axios.post('ws://172.16.50.38:8000/ws/chat/1/', {
        user_input: message,
      });

      setMessages((prevMessages) => {
        const messagesWithoutLoading = prevMessages.slice(0, -1);
        return [...messagesWithoutLoading, { sender: 'bot', text: response.data.response }];
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
        message={messageInput}
        onChange={handleChangeTextField}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default ChatBotBox;
