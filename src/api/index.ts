import axios from 'axios';
import { toast } from 'react-toastify';

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
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
      toast.error('Network error: Your error message here');
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error('Error: Your error message here');
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
