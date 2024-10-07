import axios from 'axios';
import { toast } from 'react-toastify';
const getUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    const dynamicIp = `${protocol}//${hostname}:9000/api`;
    if (hostname === 'localhost') {
      return process.env.NEXT_PUBLIC_BASEURL;
    }
    return dynamicIp;
  }
  return process.env.NEXT_PUBLIC_BASEURL;
};

export const BASE_URL = getUrl();

const config = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 150000,
};

export const axiosMethod = axios.create(config);
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
        toast.error(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }

    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.msg);
      }
    } else if (error.request) {
      toast.error('خطای سرور');
    } else {
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
