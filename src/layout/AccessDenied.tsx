// AccessDenied.tsx
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Route {
  path: string;
  value?: string;
  routes?: Route[];
}

interface FlattenedPermissions {
  [key: string]: any;
}

const flattenRoutes = (routes: Route[]): Route[] => {
  const flatRoutes: Route[] = [];

  const flatten = (route: Route) => {
    const { routes: childRoutes, ...rest } = route;
    const newPath = route.path;

    if (childRoutes) {
      childRoutes.forEach((childRoute) => {
        flatten(childRoute);
      });
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

export default function AccessDenied({
  tabs,
  permissions,
}: {
  tabs: Route[];
  permissions: Record<string, any>;
}) {
  const theme = useTheme();
  const router = useRouter();
  const [flatRoutes, setFlatRoutes] = useState<Route[]>([]);
  const [isAccess, setIsAccess] = useState<Route[]>([]);

  useEffect(() => {
    const flat = flattenRoutes(tabs);
    setFlatRoutes(flat);
  }, [tabs]);

  useEffect(() => {
    const flattenedPerms = flattenPermissions(permissions);
    const access = flatRoutes.filter((item) => flattenedPerms[item.value!]);
    setIsAccess(access);
  }, [flatRoutes, permissions]);

  const tabAccessible = isTabAccessible(isAccess, router);

  return tabAccessible ? null : (
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
  );
}
