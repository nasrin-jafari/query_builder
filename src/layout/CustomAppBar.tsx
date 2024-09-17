import { FetchTimer, ProfileMenu, ThemeToggleButton } from '@/components';
import UseApi from '@/hooks/UseApi';
import { LicenseData } from '@/sections/settings/licence';
import { ConvertRemainingDays } from '@/utils/ConvertRemainingDays';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'transparent',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface CustomAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ open, handleDrawerOpen }) => {
  const theme = useTheme();
  const { data } = UseApi<LicenseData[]>('/licence/info/');
  console.log(data);
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: theme.palette.grey[300], boxShadow: open ? 'none' : 4 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <CiMenuBurger />
          </IconButton>
          <Image
            alt="Image"
            width={40}
            height={42}
            src="/images/logo.png"
            priority
            style={{ marginLeft: 15 }}
          />
          <Link href="/settings/licence">
            <Typography fontWeight={'bold'} fontSize={14}>
              وضعیت لایسنس :{' '}
              <span style={{ color: theme.palette.primary.main }}>
                {data && ConvertRemainingDays(data[0]?.days_to_expire)}
              </span>{' '}
              باقی مانده
            </Typography>
            <Typography color="primary.main" fontWeight={'bold'} fontSize={10}></Typography>
            <Typography fontWeight={'bold'} fontSize={10}></Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FetchTimer />
          <ThemeToggleButton />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
