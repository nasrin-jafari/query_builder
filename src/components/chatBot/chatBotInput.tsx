import { Box, TextField } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

type ChatBotInputProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  message: string;
  onSendMessage: () => void;
};

const ChatBotInput: FC<ChatBotInputProps> = ({ onChange, message, onSendMessage }) => {
  const handleSendMessage = () => {
    onSendMessage();
  };

  return (
    <Box
      sx={{
        background: '#fff',
        width: '100%',
        maxHeight: '300px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '4px',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100px',
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={3}
          InputProps={{
            autoComplete: 'off',
            sx: {
              padding: '0px',
              '& .MuiInputBase-input': {
                padding: '0px',
                color: 'black',
              },
            },
          }}
          placeholder="پیامی بنویسید..."
          variant="filled"
          value={message}
          onChange={onChange}
          sx={{
            '& .MuiFilledInput-root': {
              padding: '0px',
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleSendMessage}
      >
        <Image
          src="/images/icons/sendchat.svg"
          alt="send"
          width={32}
          height={32}
          style={{ objectFit: 'contain' }}
        />
      </Box>
    </Box>
  );
};

export default ChatBotInput;
