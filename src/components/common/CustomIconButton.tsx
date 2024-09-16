import { IconButton, Popover, Typography } from '@mui/material';
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
  type,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClick}
      >
        {(() => {
          switch (type) {
            case 'delete':
              return <AiOutlineDelete />;
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
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 0.75 }}>{label}</Typography>
      </Popover>
    </>
  );
};

export default CustomIconButton;
