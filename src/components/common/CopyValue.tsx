import { CopyText } from '@/utils/Copytext';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface CopyValueProps {
  children: ReactNode;
  textCopy: string;
}

export default function CopyValue({ children, textCopy }: CopyValueProps) {
  return (
    <Box
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => {
        CopyText(textCopy);
      }}
    >
      {children}
    </Box>
  );
}
