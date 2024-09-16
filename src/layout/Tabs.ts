import { AiOutlineExclamation } from 'react-icons/ai';
import { CiFileOn, CiGrid41, CiSearch, CiSettings } from 'react-icons/ci';
import { FaHome } from 'react-icons/fa';
import {
  PiCrosshairSimpleLight,
  PiHexagonLight,
  PiShieldLight,
  PiUserLight,
  PiUsersThin,
} from 'react-icons/pi';
import { TbHexagonLetterM } from 'react-icons/tb';

export interface ItemsTab {
  value: string;
  label: string;
  path: string;
  icon?: React.ComponentType; // Making icon optional by adding '?'
  routes?: ItemsTab[];
}

export const TABS: ItemsTab[] = [
  {
    value: 'dashboard',
    label: 'داشبورد',
    icon: FaHome,
    path: '/',
  },
  {
    value: 'activity',
    label: 'فعالیت',
    path: '/activity',
    icon: CiGrid41,
    routes: [
      {
        value: 'events',
        label: 'رخدادها',
        path: '/activity/events',
        routes: [
          {
            value: 'events',
            label: 'رخدادها',
            path: '/activity/events/overview',
          },
          {
            value: 'events',
            label: 'رخدادها',
            path: '/activity/events/inspect',
          },
        ],
      },
      {
        value: 'quarantined',
        label: 'قرنطینه شده‌ها',
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
  {
    value: 'hosts',
    label: 'میزبان ها',
    path: '/hosts',
    icon: PiUserLight,
    routes: [
      {
        value: 'hostManagement',
        label: 'مدیریت میزبان',
        path: '/hosts/hostManagement',
        routes: [
          {
            value: 'hostManagement/alerts',
            label: 'مدیریت هشدار ها',
            path: '/hosts/hostManagement/alerts',
          },
          {
            value: 'identified',
            label: 'شناسایی شده‌ها',
            path: '/hosts/hostManagement/identified',
          },
          {
            value: 'hostManagement/logs',
            label: 'مدیریت رخدادها',
            path: '/hosts/hostManagement/logs',
            routes: [
              {
                value: 'hostManagement/detailLogs',
                label: 'جزییات لاگ',
                path: '/detailsLog',
              },
            ],
          },
        ],
      },
      {
        value: 'receiveAgent',
        label: 'دریافت عامل',
        path: '/hosts/receiveAgent',
      },
      {
        value: 'blackList',
        label: 'لیست سیاه',
        path: '/hosts/blackList',
      },
      {
        value: 'whiteList',
        label: 'لیست سفید',
        path: '/hosts/whiteList',
      },
      {
        value: 'exceptionList',
        label: 'لیست استثنا',
        path: '/hosts/exceptionList',
      },
    ],
  },
  {
    value: 'settings',
    label: ' تنظیمات',
    path: '/settings',
    icon: CiSettings,
    routes: [
      {
        value: 'licence',
        label: 'فعال سازی لایسنس',
        path: '/settings/licence',
      },
      {
        value: 'connectToAD',
        label: 'اتصال به AD',
        path: '/settings/connectToAD',
        routes: [
          {
            value: 'connectToAD/ADDetails',
            label: 'جزئیات AD',
            path: '/settings/connectToAD/ADDetails',
          },
          {
            value: 'connectToAD/ADDetails/ouInfo',
            label: 'جزئیات OU',
            path: '/settings/connectToAD/ADDetails/ouInfo',
          },
        ],
      },
      // {
      //   value: 'getBackup',
      //   label: 'پشتیبانی گیری',
      //   path: '/settings/getBackup',
      // },
      {
        value: 'systemUpdate',
        label: 'بروزرسانی سامانه',
        path: '/settings/systemUpdate',
      },
      {
        value: 'panel',
        label: 'تنظیمات سامانه',
        path: '/settings/panel',
      },
    ],
  },
  {
    value: 'reviewAndExplore',
    label: 'بررسی و کنکاش',
    path: '/reviewAndExplore',
    icon: PiCrosshairSimpleLight,
    routes: [
      {
        value: 'reviewOverview',
        label: 'نمای کلی بررسی',
        path: '/reviewAndExplore',
      },
      // {
      //   value: 'searchSigma',
      //   label: 'جستجو بر اساس سیگما',
      //   path: '/reviewAndExplore/searchSigma',
      // },
      // {
      //   value: 'searchYara',
      //   label: 'جستجو بر اساس یارا',
      //   path: '/reviewAndExplore/searchYara',
      // },
    ],
  },
  {
    value: 'reservoirManagement',
    label: 'مدیریت مخازن',
    path: '/reservoirManagement',
    icon: CiFileOn,
    routes: [
      {
        value: 'yaraRuleManagement',
        label: 'مدیریت قوانین یارا',
        path: '/reservoirManagement/yaraRuleManagement',
      },
      // {
      //   value: 'sigmaRuleManagement',
      //   label: 'مدیریت قوانین سیگما',
      //   path: '/reservoirManagement/sigmaRuleManagement',
      // },
    ],
  },
  {
    value: 'userManagement',
    label: 'مدیریت کاربران',
    path: '/userManagement',
    icon: PiUsersThin,
    routes: [
      {
        value: 'manageUsers',
        label: 'ایجاد و مدیریت کاربران',
        path: '/userManagement',
      },
      {
        value: 'accessManagement',
        label: 'مدیریت نقش و دسترسی',
        path: '/userManagement/accessManagement',
        routes: [
          {
            value: 'accessLevelManagement',
            label: 'مدیریت سطح دسترسی',
            path: '/userManagement/accessManagement/accessLevelManagement',
          },
        ],
      },
      {
        value: 'unsuccessfulAttempts',
        label: 'گزارش تلاش‌های ناموفق',
        path: '/userManagement/unsuccessfulAttempts',
      },
      {
        value: 'usersActivity',
        label: 'گزارش فعالیت کاربران',
        path: '/userManagement/usersActivity',
      },
    ],
  },
  {
    value: 'mandatoryInstallation',
    label: 'نصاب اجباری',
    path: '/mandatoryInstallation',
    icon: PiHexagonLight,
    routes: [
      {
        value: 'ADManagement',
        label: 'نصاب AD',
        path: '/mandatoryInstallation/ADManagement',
        routes: [
          {
            value: 'ADManagement/ADInstaller',
            label: 'جزئیات AD',
            path: '/mandatoryInstallation/ADManagement/ADInstaller',
          },
        ],
      },
    ],
  },
  {
    value: 'intelligence',
    label: 'هوشمندی',
    path: '/intelligence',
    icon: PiShieldLight,
    routes: [
      // {
      //   value: 'sandBox',
      //   label: 'جعبه شن',
      //   path: '/intelligence/sandBox',
      // },
      {
        value: 'managementOfServices',
        label: 'مدیریت سرویس‌ها',
        path: '/intelligence/managementOfServices',
      },
      // {
      //   value: 'siem',
      //   label: 'Siem',
      //   path: '/intelligence/siem',
      // },
      // {
      //   value: 'sutter',
      //   label: 'ساتر',
      //   path: '/intelligence/sutter',
      // },
      {
        value: 'antivirusResults',
        label: 'نتایج ضد ویروس مرکب',
        path: '/intelligence/antivirusResults',
        routes: [
          {
            value: 'antivirusResults/detailsResult',
            label: 'نمایش جزئیات ضد ویروس',
            path: '/intelligence/antivirusResults/detailsResult',
          },
        ],
      },
      {
        value: 'aiResults',
        label: 'نتایج هوش مصنوعی',
        path: '/intelligence/aiResults',
      },
      {
        value: 'serverStatus',
        label: 'وضعیت سرور',
        path: '/intelligence/serverStatus',
      },
    ],
  },

  {
    value: 'attacks',
    label: 'حملات ',
    icon: TbHexagonLetterM,
    path: '/attacks',
    routes: [
      {
        value: 'mitre',
        label: 'حملات MITRE',
        path: '/attacks/mitre',
        routes: [{ value: 'mitre', label: 'حملات MITRE', path: '/attacks/mitre/mitreDetails' }],
      },
    ],
  },
  {
    value: 'aboutUs',
    label: 'درباره ما',
    icon: AiOutlineExclamation,
    path: '/aboutUs',
  },
];
