import { CiGrid41, CiSearch } from 'react-icons/ci';
import React from 'react';

export interface ItemsTab {
  value: string;
  label: string;
  path: string;
  icon?: React.ComponentType; // Making icon optional by adding '?'
  routes?: ItemsTab[];
}

export const TABS: ItemsTab[] = [
  {
    value: 'activity',
    label: 'فعالیت',
    path: '/activity',
    icon: CiGrid41,
    routes: [
      {
        value: 'quarantined',
        label: 'رخداد ها',
        path: '/activity/quarantined',
      },
    ],
  },
  {
    value: 'search',
    label: 'جستجو',
    path: '/search',
    icon: CiSearch,
  },
];
