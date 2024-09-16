import { useThemeContext } from '@/lib/theme/ThemeContext';
import { Box, BoxProps } from '@mui/material';
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

const MainBox = styled(Box)(() => ({
  padding: '10px',
  position: 'relative',
}));

const CornerBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 'calc(100% + 4px)',
  height: 'calc(100% + 4px)',
  top: '-2px',
  left: '-2px',
  pointerEvents: 'none',
  '& > div': {
    position: 'absolute',
    width: '20px',
    height: '20px',
  },
  '& > div::before': {
    content: "''",
    position: 'absolute',
    width: '12px',
    height: '2px',
    background: theme.palette.grey[700],
  },
  '& > div::after': {
    content: "''",
    position: 'absolute',
    width: '2px',
    height: '12px',
    background: theme.palette.grey[700],
  },
  '& > div.top-left': {
    top: '-10px',
    left: '-10px',
    borderTopLeftRadius: '10px',
  },
  '& > div.top-left::before': {
    top: '10px',
    left: '50%',
  },
  '& > div.top-left::after': {
    top: '50%',
    left: '50%',
  },

  '& > div.top-right': {
    top: '-10px',
    right: '-8px',
    borderTopRightRadius: '10px',
  },
  '& > div.top-right::before': {
    top: '10px',
    right: '50%',
  },
  '& > div.top-right::after': {
    top: '50%',
    left: '50%',
  },

  '& > div.bottom-left': {
    bottom: '-10px',
    left: '-10px',
    borderBottomLeftRadius: '10px',
  },
  '& > div.bottom-left::before': {
    top: '8px',
    left: '50%',
  },
  '& > div.bottom-left::after': {
    top: '-2px',
    left: '50%',
  },

  '& > div.bottom-right': {
    bottom: '-10px',
    right: '-10px',
    borderBottomRightRadius: '10px',
  },
  '& > div.bottom-right::before': {
    top: '8px',
    right: '50%',
  },
  '& > div.bottom-right::after': {
    top: '-2px',
    left: '8px',
  },
}));

interface CardBoxProps extends BoxProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function CardBox({ children, sx, ...props }: CardBoxProps) {
  const { isLightMode } = useThemeContext();
  const theme = useTheme();
  return (
    <>
      <MainBox
        sx={{
          padding: '15px',
          border: `2px solid ${isLightMode ? theme.palette.grey[50] : theme.palette.grey[200]}`,
          minHeight: props.minHeight,
          width: props.minWidth,
          ...sx,
        }}
      >
        {children}
        <CornerBox>
          <div className="top-left"></div>
          <div className="top-right"></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </CornerBox>
      </MainBox>
    </>
  );
}
