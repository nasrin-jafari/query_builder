// Layout.tsx
import { Card } from '@mui/material';
import jwt from 'jsonwebtoken';
import { ReactNode, useEffect, useState } from 'react';
import SideBar from './CustomSideBar';
import { ItemsTab, TABS } from './Tabs';
import AccessDenied from './AccessDenied';

interface Token {
  permissions?: Record<string, any>;
}

export default function Layout({ children }: { children: ReactNode }) {
  const [newTabs, setNewTabs] = useState<ItemsTab[]>([]);
  const [permissions, setPermissions] = useState<Record<string, any>>({});

  useEffect(() => {
    const storedValue = localStorage.getItem('auth_token_typeScript');
    if (storedValue) {
      const token = jwt.decode(storedValue) as Token;
      if (token?.permissions) {
        setPermissions(token.permissions);
        const filteredTabs = filterTabs(TABS, token.permissions);
        setNewTabs(filteredTabs);
      }
    }
  }, []);

  return (
    <>
      <SideBar content={children} filteredTabs={newTabs} />
      <Card
        component="main"
        sx={{
          p: 6,
          pl: 10,
          pr: 10,
          borderRadius: '12px',
          width: '100%',
          my: 4,
          minHeight: '100vh',
          background: 'transparent',
        }}
      >
        <AccessDenied tabs={TABS} permissions={permissions} />
        {children}
      </Card>
    </>
  );
}

// Helper function to filter tabs
const filterTabs = (tabs: ItemsTab[], filterObject?: Record<string, any>): ItemsTab[] => {
  if (!filterObject) {
    return tabs;
  }
  return tabs
    .map((tab) => {
      if (filterObject[tab?.value]) {
        if (tab.routes) {
          const filteredRoutes = tab.routes.filter(
            (route) => filterObject[tab.value]?.[route.value]
          );
          return { ...tab, routes: filteredRoutes };
        }
        return tab;
      }
      return undefined;
    })
    .filter(Boolean) as ItemsTab[];
};
