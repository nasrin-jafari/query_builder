import { Box, TextField, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';

type ChatInputProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  message: string;
  onSendMessage: () => void;
};

const ChatInput: FC<ChatInputProps> = ({ onChange, message, onSendMessage }) => {
  const theme = useTheme();

  const handleSendMessage = () => {
    if (message.trim()) onSendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        event.preventDefault();
        onChange({ target: { value: message + '\n' } } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>); // اضافه کردن خط جدید به متن
      } else {
        event.preventDefault();
        handleSendMessage();
      }
    }
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
          minRows={2}
          maxRows={2}
          InputProps={{
            autoComplete: 'off',
            sx: {
              '&.Mui-focused': {
                backgroundColor: theme.palette.common.white,
                border: 'none',
              },
              '& .MuiInputBase-input': {
                color: 'black',
                padding: '0px',
                backgroundColor: theme.palette.common.white,
                border: 'none',
                outline: 'none',
                fontSize:'1rem'
              },
            },
          }}
          placeholder="پیامی بنویسید..."
          variant="filled"
          value={message}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiFilledInput-root': {
              padding: '0px',
              backgroundColor: theme.palette.common.white,
              outline: 'none',
              border: 'none',

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

export default ChatInput;
