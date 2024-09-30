import axios from 'axios';
import { toast } from 'react-toastify';
// تابعی برای به دست آوردن URL پایه
const getUrl = () => {
  // بررسی اینکه آیا در محیط مرورگر هستیم یا نه
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location; // دریافت پروتکل و نام میزبان از آدرس فعلی
    const dynamicIp = `${protocol}//${hostname}:9000/api`; // ایجاد آدرس پویا برای سرور API
    if (hostname === 'localhost') {
      return process.env.NEXT_PUBLIC_BASEURL; // در صورت اجرای در localhost، URL از محیط تنظیمات برمی‌گردد
    }
    return dynamicIp; // در غیر این صورت، آدرس پویا برگردانده می‌شود
  }
  return process.env.NEXT_PUBLIC_BASEURL; // در صورتی که در محیط مرورگر نباشیم، URL از محیط تنظیمات برمی‌گردد
};

// به دست آوردن URL پایه از طریق تابع getUrl
export const BASE_URL = getUrl();

const config = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

export const axiosMethod = axios.create(config);
// Add a request interceptor to include the token
axiosMethod.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth_token_typeScript');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosMethod.interceptors.response.use(
  function (response) {
    if (response.data.success === true) {
      if (
        response.config.method === 'put' ||
        response.config.method === 'patch' ||
        response.config.method === 'delete' ||
        response.config.method === 'post'
      ) {
        if (response.data.msg != '') {
          toast.success(response.data.msg);
        }
      }
    }
    if (response.data.success === false) {
      if (response.data.code === 149 || response.data.code === 101 || response.data.code === 100) {
        localStorage.removeItem('auth_token');
        // window.location.reload();
        toast.error(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }

    return response;
  },
  function (error) {
    // Handle request errors
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.msg);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('خطای سرور');
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error('خطای سرور');
    }

    return Promise.reject(error);
  }
);

export const isNetworkError = (err: any): boolean => {
  let result = false;
  if (err.isAxiosError) {
    if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      toast.error('خطای سرور');
      result = true;
    } else {
      result = false;
    }
  }

  return result;
};

export default axiosMethod;
