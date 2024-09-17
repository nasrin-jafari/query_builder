import { useThemeContext } from '@/lib/theme/ThemeContext';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import CustomAppBar from './CustomAppBar';
import { ItemsTab } from './Tabs';
import CustomTooltip from '@/components/common/CustomToolTip';
import { FaHome } from 'react-icons/fa';

interface SideBarProps {
  content: React.ReactNode;
  filteredTabs: ItemsTab[];
}

const drawerWidth = 240;

const SideBar: React.FC<SideBarProps> = ({ filteredTabs }) => {
  const { isLightMode } = useThemeContext();
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    backgroundColor: theme.palette.grey[300],
    borderRight: 'none',
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: theme.palette.grey[300],
    borderRight: isLightMode ? '1px solid #0000001f' : '1px solid #ffffff1f',
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.grey[300],
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    })
  );

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const router = useRouter();
  const currentPath = router.pathname;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleTabClick = (tabValue: string) => {
    setOpenTab((prevOpenTab) => (prevOpenTab === tabValue ? null : tabValue));
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpenTab(null);
    setOpen(false);
  };

  const handleCloseDrawer = () => {
    setOpenTab(null);
  };
  const isTabActive = (tab: ItemsTab) => {
    if (tab.path && currentPath === tab.path) {
      return true;
    }
    if (tab.routes) {
      return tab.routes.some((route) => currentPath === route.path);
    }
    return false;
  };

  const renderSubItems = (routes: ItemsTab[] | undefined): JSX.Element[] => {
    if (!routes) return [];

    return routes.map((route) => (
      <List
        component="div"
        disablePadding
        key={route.value}
        sx={{ background: 'transparent', padding: 0 }} // Make background transparent
      >
        <Link href={route.path} passHref>
          <ListItem
            onClick={handleCloseDrawer}
            sx={{
              pr: 0,
              pl: 2,
              pb: 0,
              color: currentPath === route.path ? theme.palette.primary.main : 'inherit',
              '&:hover': {
                color:
                  currentPath === route.path
                    ? theme.palette.primary.main
                    : theme.palette.primary.main,
              },
              '@keyframes slideInFromLeft': {
                '0%': {
                  transform: 'translateX(-100%)',
                  opacity: 0,
                },
                '100%': {
                  transform: 'translateX(0)',
                  opacity: 1,
                },
              },
              animation: 'slideInFromLeft 0.2s ease-out',
            }}
          >
            <ListItemText
              primary={route.label}
              sx={{
                background: 'transparent',
                pb: 1,
              }}
            />
          </ListItem>
        </Link>
      </List>
    ));
  };
  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        position: 'relative', // Ensure relative positioning for children
      }}
    >
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: open ? 'flex' : 'none',
            justifyContent: 'flex-start',
            position: 'fixed',
            top: 0,
            left: 0,
            background: theme.palette.grey[300],
            width: '100%',
            zIndex: 1000,
            boxShadow: 5,
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <CiMenuBurger />
          </IconButton>
        </DrawerHeader>

        <List sx={{ marginTop: '55px' }}>
          <Divider />
          <ListItem
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemIcon
              sx={{
                fontSize: 24,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Link href={'/'} passHref>
                <FaHome />
              </Link>
            </ListItemIcon>
          </ListItem>
          {filteredTabs?.map((tab: any) => {
            const IconComponent = tab.icon ? tab.icon : null;
            return (
              <Fragment key={tab.value}>
                {tab.routes ? (
                  <ListItem
                    onClick={() => handleTabClick(tab.value)}
                    sx={{
                      cursor: 'pointer',
                      color:
                        openTab === tab.value || isTabActive(tab)
                          ? theme.palette.primary.main
                          : 'inherit',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {IconComponent && (
                      <CustomTooltip title={tab.label} align="left">
                        <ListItemIcon
                          sx={{
                            fontSize: 24,
                            color:
                              openTab === tab.value || isTabActive(tab)
                                ? 'primary.main'
                                : 'inherit',
                          }}
                        >
                          <IconComponent />
                        </ListItemIcon>
                      </CustomTooltip>
                    )}

                    <ListItemText primary={tab.label} />
                    {openTab === tab.value ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                  </ListItem>
                ) : (
                  <Link href={tab.path} passHref>
                    <ListItem
                      onClick={handleCloseDrawer}
                      sx={{
                        cursor: 'pointer',
                        color: currentPath === tab.path ? theme.palette.primary.main : 'inherit',
                        '&:hover': {
                          color:
                            currentPath === tab.path
                              ? theme.palette.primary.main
                              : theme.palette.primary.main,
                        },
                      }}
                    >
                      {IconComponent && (
                        <CustomTooltip title={tab.label} align="left">
                          <ListItemIcon
                            sx={{
                              fontSize: 24,
                              color:
                                openTab === tab.value || isTabActive(tab)
                                  ? 'primary.main'
                                  : 'inherit',
                            }}
                          >
                            <IconComponent />
                          </ListItemIcon>
                        </CustomTooltip>
                      )}

                      <ListItemText primary={tab.label} />
                    </ListItem>
                  </Link>
                )}

                {tab.routes && (
                  <Collapse in={openTab === tab.value} unmountOnExit>
                    {renderSubItems(tab.routes)}
                  </Collapse>
                )}
              </Fragment>
            );
          })}
        </List>
      </Drawer>

      {open && ( // Check if drawer is open
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={handleDrawerClose}
        />
      )}
    </Box>
  );
};

export default SideBar;
