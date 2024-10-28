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
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { ItemsTab } from './Tabs';
import Image from 'next/image';
import { LuArrowRightToLine } from 'react-icons/lu';

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
    backgroundColor: theme.palette.grey[100],
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
    backgroundColor: theme.palette.grey[100],
    borderRight: isLightMode ? '1px solid #0000001f' : '1px solid #ffffff1f',
  });

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
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(true); // به طور پیش فرض true است

  const router = useRouter();
  const currentPath = router.pathname;

  const handleDrawerOpen = () => {
    setOpen(true);
    const activeTab = filteredTabs.find((tab) => isTabActive(tab));
    if (activeTab) {
      setOpenTab(activeTab.value); // Open the active tab when drawer opens
      setSubMenuOpen(true); // Keep the submenu open when the drawer opens
    }
  };

  const handleTabClick = (tabValue: string) => {
    if (openTab === tabValue) {
      // If it's open, close it
      setSubMenuOpen(!subMenuOpen); // Toggle the submenu open state
    } else {
      // Otherwise, set the clicked tab as active and open it
      setOpenTab(tabValue);
      setSubMenuOpen(true); // Open the submenu
    }
  };

  const handleDrawerClose = () => {
    // setOpenTab(null);
    setOpen(false);
  };

  const handleCloseDrawer = () => {
    setOpenTab(null);
  };
  const isTabActive = (tab: ItemsTab) => {
    return (
      (tab.path && currentPath === tab.path) ||
      tab.routes?.some((route) => currentPath === route.path)
    );
  };

  useEffect(() => {
    const activeTab = filteredTabs.find((tab) => isTabActive(tab));
    if (activeTab) {
      setOpenTab(activeTab.value); // Open the initial active tab
    }
  }, [filteredTabs, router.pathname]);

  const renderSubItems = (routes: ItemsTab[] | undefined): JSX.Element[] => {
    if (!routes) return [];

    return routes.map((route) => (
      <List
        component="div"
        disablePadding
        key={route.value}
        sx={{ background: 'transparent', padding: 0 }}
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
        position: 'relative',
      }}
    >
      <CssBaseline />

      <Drawer variant="permanent" open={open} onMouseLeave={handleDrawerClose}>
        {open ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: '8px',
              pt: '8px',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image alt="Image" width={40} height={42} src="/images/logo.png" priority />
              <Typography>سایدبار</Typography>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(false)}
              edge="start"
              sx={{
                mr: '2px',
              }}
            >
              <LuArrowRightToLine style={{ fontSize: '22px' }} />
            </IconButton>
          </Box>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ml: '2px',
              mt: '4px',
            }}
          >
            <Image alt="Image" width={38} height={38} src="/images/logo.png" priority />
          </IconButton>
        )}

        <List>
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
                <FaHome
                  style={{
                    color: router.pathname == '/' ? theme.palette.primary.main : 'inherit',
                  }}
                />
              </Link>
            </ListItemIcon>
            <Link href={'/'} passHref>
              <ListItemText primary={'داشبورد'} />
            </Link>
          </ListItem>
          {filteredTabs?.map((tab: any) => {
            const IconComponent = tab.icon ? tab.icon : null;
            return (
              <Fragment key={tab.value}>
                {tab.routes ? (
                  <ListItem
                    onClick={() => handleTabClick(tab.value)}
                    onMouseEnter={() => {
                      if (!open) setOpen(true);
                    }}
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
                      <ListItemIcon
                        sx={{
                          fontSize: 24,
                          color: openTab === tab.value ? 'primary.main' : 'inherit',
                        }}
                      >
                        <IconComponent />
                      </ListItemIcon>
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
                          color: currentPath === tab.path ? theme.palette.primary.main : 'inherit',
                        },
                      }}
                    >
                      {IconComponent && (
                        <ListItemIcon
                          sx={{
                            fontSize: 24,
                            color: openTab === tab.value ? 'primary.main' : 'inherit',
                          }}
                        >
                          <IconComponent />
                        </ListItemIcon>
                      )}

                      <ListItemText primary={tab.label} />
                    </ListItem>
                  </Link>
                )}

                {tab.routes && (
                  <Collapse in={openTab === tab.value && subMenuOpen && open} unmountOnExit>
                    {renderSubItems(tab.routes)}
                  </Collapse>
                )}
              </Fragment>
            );
          })}
        </List>
      </Drawer>

      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            zIndex: 999,
          }}
          onClick={handleDrawerClose}
        />
      )}
    </Box>
  );
};

export default SideBar;
