import { Box, Button, Container, CircularProgress, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { ReactNode, useEffect, useState } from 'react';
import SideBar from './CustomSideBar';
import { ItemsTab, TABS } from './Tabs';

interface Token {
  permissions?: Record<string, any>;
}

interface Route {
  path: string;
  value?: string;
  routes?: Route[];
}

interface FlattenedPermissions {
  [key: string]: any;
}

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const [newTabs, setNewTabs] = useState<ItemsTab[]>([]);
  const [permissions, setPermissions] = useState<Record<string, any>>({});
  const [flatRoutes, setFlatRoutes] = useState<Route[]>([]);
  const [isAccess, setIsAccess] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

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

  useEffect(() => {
    const flat = flattenRoutes(TABS);
    setFlatRoutes(flat);
  }, []);

  useEffect(() => {
    if (flatRoutes.length > 0 && Object.keys(permissions).length > 0) {
      const flattenedPerms = flattenPermissions(permissions);
      const access = flatRoutes.filter((item) => flattenedPerms[item.value!]);
      setIsAccess(access);
      setLoading(false); // Only set loading to false when both routes and permissions are processed
    }
  }, [flatRoutes, permissions]);

  const tabAccessible = isTabAccessible(isAccess, router);

  return (
    <>
      {loading ? ( // Show loading spinner while loading
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <CircularProgress />
        </Container>
      ) : !tabAccessible ? ( // Show No Access message only after loading is complete
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              padding: 3,
              borderRadius: 2,
              backgroundColor: theme.palette.grey[300],
              boxShadow: 3,
              width: '100%',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              عدم دسترسی
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              شما مجوز دسترسی به این صفحه را ندارید
            </Typography>
            <Button variant="contained" color="primary" onClick={() => router.back()}>
              بازگشت
            </Button>
          </Box>
        </Container>
      ) : (
        // Show the page content if access is granted
        <>
          <SideBar content={children} filteredTabs={newTabs} />
          <Box
            component="main"
            sx={{
              py: 6,
              pr: router.pathname === '/' ? 9 : 4,
              pl: router.pathname === '/' ? 9 : 12,
              borderRadius: '12px',
              width: '100%',
              my: 4,
              minHeight: '100vh',
              background: 'transparent',
            }}
          >
            {children}
          </Box>
        </>
      )}
    </>
  );
}

// Helper functions remain unchanged
const flattenRoutes = (routes: Route[]): Route[] => {
  const flatRoutes: Route[] = [];
  const flatten = (route: Route) => {
    const { routes: childRoutes, ...rest } = route;
    const newPath = route.path;
    if (childRoutes) {
      childRoutes.forEach((childRoute) => flatten(childRoute));
    }
    flatRoutes.push({ ...rest, path: newPath });
  };
  routes.forEach((route) => flatten(route));
  return flatRoutes;
};

const flattenPermissions = (obj: Record<string, any>, parentKey = ''): FlattenedPermissions => {
  if (obj == null) {
    return {};
  }
  return Object.keys(obj).reduce((acc: FlattenedPermissions, key) => {
    const currentKey = parentKey ? `${key}` : key;
    if (Array.isArray(obj[key])) {
      acc[currentKey] = obj[key];
    } else {
      Object.assign(acc, flattenPermissions(obj[key], currentKey));
    }
    return acc;
  }, {});
};

const isTabAccessible = (access: Route[], router: any): boolean => {
  if (access.length === 0 && router.pathname === '/') {
    return true;
  }
  return access.some((tab) => {
    if (router.pathname === '/' || router.pathname === '/aboutUs') {
      return true;
    }
    const match = router.pathname.replace(/\/\[\w+\]/g, '').match(/\/([^\/]+)$/);
    const endPath = match ? match[1] : null;
    return tab.path?.includes(endPath ? endPath : '');
  });
};

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
