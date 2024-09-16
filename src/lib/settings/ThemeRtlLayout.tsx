import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export default function ThemeRtlLayout({ children }: { children: ReactNode }) {
  const cacheRtl = createCache({
    key: 'rtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
