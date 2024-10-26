import { Avatar, Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ChatBotInput from './chatBotInput';
interface DecodedToken extends JwtPayload {
  // add type folder
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
  // const [rooms, setRooms] = useState<string[]>([]);
  // const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const token = localStorage.getItem('auth_token_typeScript');
  const decoded = token
    ? (jwt.decode(token) as DecodedToken)
    : { username: 'Unknown', role: 'Unknown' };
  const usernameInitial = decoded.username[0].toUpperCase();

  useEffect(() => {
    // const savedRooms = JSON.parse(localStorage.getItem('chatRooms') || '[]') as string[];
    // setRooms(savedRooms);
    joinRoom('1');
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          setIsLoading(true);
          if (!lastMessage || lastMessage.sender !== 'bot') {
            return [...prev, { sender: 'bot', text: '...' }]; // پیام لودینگ
          }
          return prev;
        });
        answer += data.response;
      }

      if (data.done) {
        setMessages((prev) => [
          ...prev.slice(0, -1), // حذف پیام لودینگ
          { sender: 'bot', text: answer },
        ]);
        answer = '';
        setIsLoading(false);
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

  // const createRoom = (roomName: string) => {
  //   if (!rooms.includes(roomName)) {
  //     const updatedRooms = [...rooms, roomName];
  //     setRooms(updatedRooms);
  //     localStorage.setItem('chatRooms', JSON.stringify(updatedRooms));
  //     joinRoom(roomName);
  //   }
  // };
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const char = event.target.value;
    setMessageInput(char);
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
        <Typography sx={{ color:theme.palette.common.white}} variant="body1">سامانه پشتیبانی EDR</Typography>
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            width: '20px',
            height: '20px',
            background: '#ffffff1c',
            borderRadius: '50%',
            cursor:'pointer'
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
          height: '490px',
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
      <ChatBotInput
        message={messageInput}
        onChange={handleChangeTextField}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default ChatBotBox;
