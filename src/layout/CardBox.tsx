import { Box, BoxProps, Typography } from '@mui/material';
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

const MainBox = styled(Box)(() => ({
  padding: '10px',
  position: 'relative',
}));

interface CardBoxProps extends BoxProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  title?: string;
}

export default function CardBox({ children, sx, title }: CardBoxProps) {
  const theme = useTheme();
  return (
    <>
      <MainBox
        sx={{
          background: theme.palette.grey[300],
          borderRadius: '20px',
          padding: '25px',
          position: 'relative',
          height: '100%',
          ...sx,
        }}
      >
        {title && (
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        )}

        {children}
        {/* <CornerBox>
          <div className="top-left"></div>
          <div className="top-right"></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </CornerBox> */}
      </MainBox>
    </>
  );
}
