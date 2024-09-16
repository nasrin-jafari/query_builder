import { ReactNode } from 'react';
import SideBar from './CustomSideBar';
import { Card } from '@mui/material';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SideBar content={children} />
      <Card
        component="main"
        sx={{
          p: 6,
          pl: 10,
          pr: 10,
          borderRadius: '12px',
          width: '100%',
          my: 4,
          // mx: 4,
          minHeight: '100vh',
          background: 'transparent',
        }}
      >
        {children}
      </Card>
    </>
  );
}
