import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
interface DecodedToken extends JwtPayload {
  exp_date?: number;
  username: string;
  permissions: { [key: string]: any };
  role: string;
}
const ProfileMenu: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    window.location.replace('/');
    localStorage.removeItem('auth_token_typeScript');
  };
  function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const token = localStorage.getItem('auth_token_typeScript');
  const decoded = token
    ? (jwt.decode(token) as DecodedToken)
    : { username: 'Unknown', role: 'Unknown' };
  const usernameInitial = decoded.username[0].toUpperCase();
  const username = capitalizeFirstLetter(decoded.username);
  const role = capitalizeFirstLetter(decoded.role);

  return (
    <Box sx={{ position: 'relative', zIndex: '2000' }}>
      <Tooltip title="پروفایل کاربر">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          sx={{ ml: '-4px' }}
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
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: theme.palette.grey[300],
            overflow: 'visible',
            filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.32))',
            mt: 2,
            mr: '9px',
            zIndex: '2100', // Ensure this is higher than the surrounding components
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: '-9px',
              mr: '10px',
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: theme.palette.grey[300],
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ height: '60px' }}>
          <Box
            sx={{
              width: '85px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                p: 1,
                borderRadius: '6px',
                fontWeight: 'bold',
                color: theme.palette.grey[900],
              }}
            >
              {username}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[900],
                // p: 1,
                borderRadius: '6px',
              }}
            >
              {role}
            </Typography>
          </Box>
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
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            color: theme.palette.error.main,
            fontWeight: 'bold',
          }}
        >
          خروج
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
