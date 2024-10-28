import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import SideBar from './CustomSideBar';
import { TABS } from './Tabs';


export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
        // Show the page content if access is granted
        <>
          <SideBar content={children} filteredTabs={TABS} />
          <Box
            component="main"
            sx={{
              pb: 6,
              pt: 2,
              pr:  4,
              pl: 12,
              width: '100%',
              minHeight: '100vh',
              backgroundColor: theme.palette.grey[50],
            }}
          >
            {children}
          </Box>
        </>
      )

}

