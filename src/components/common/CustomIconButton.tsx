import { Button, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { CiFileOn } from 'react-icons/ci';
import { RxDownload } from 'react-icons/rx';

interface ReusableIconButtonProps {
  icon?: IconType;
  label: string;
  type?: string;
  onClick?: () => void;
}

const CustomIconButton: React.FC<ReusableIconButtonProps> = ({
  icon: Icon,
  label,
  type = 'default',
  onClick,
}) => {
  const theme = useTheme();

  // Determine button styles based on type
  const getButtonStyles = () => {
    switch (type) {
      case 'delete':
        return {
          color: theme.palette.error.main,
        };
      case 'edit':
        return {
          color: theme.palette.grey[700],
        };
      case 'add':
        return {
          color: theme.palette.grey[700],
        };
      case 'download':
        return {
          color: theme.palette.grey[700],
        };
      default:
        return {
          color: theme.palette.grey[700],
        };
    }
  };

  const { color: buttonColor } = getButtonStyles();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: buttonColor,
        padding: '6px 8px !important',
        '&:hover': {
          backgroundColor: buttonColor,
        },
      }}
      startIcon={(() => {
        switch (type) {
          case 'delete':
            return <AiOutlineDelete style={{ fontSize: '16px' }} />;
          case 'edit':
            return <CiEdit />;
          case 'add':
            return <FaPlus />;
          case 'download':
            return <RxDownload />;
          default:
            return Icon ? <Icon /> : <CiFileOn />;
        }
      })()}
    >
      <Typography sx={{ fontSize: '12px' }}>{label}</Typography>
    </Button>
  );
};

export default CustomIconButton;
