import axiosMethod from '@/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ApiRequestHook<T> {
  data: T | null;
  total: number;
  handleApiRequest: (
    url?: string,
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
    body?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) => Promise<T | boolean>;
  loading: boolean;
  error: any;
}

const UseApi = <T>(url: string, initialParams: Record<string, any> = {}): ApiRequestHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const handleApiRequest = async (
    fetchUrl?: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get',
    body: any = null,
    params: Record<string, any> = {},
    headers: Record<string, string> = {}
  ): Promise<T | boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosMethod({
        method,
        url: fetchUrl || url,
        params: { ...initialParams, ...params },
        data: body,
        headers: { ...headers },
      });

      if (response?.data?.success) {
        const result = response?.data?.data;
        setTotal(result?.Total);
        setData(result);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      setError(err);
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { page, sort, filters } = router.query;
    handleApiRequest(url, 'get', null, { page, sort, filters });
  }, [router.query]);

  return { data, total, handleApiRequest, loading, error };
};

export default UseApi;
