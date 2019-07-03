import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { errorCompatibleWith } from '@/utils';

Axios.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  const { code, message, token, ...props } = response.data;
  if (token) {
    Axios.defaults.headers.Authorization = token;
  }
  return Promise.resolve({
    code,
    message,
    type: 'SUCCESS',
    ...props,
  });
}, (error): Promise<any> => {
  const { code, message } = errorCompatibleWith(error);
  return Promise.resolve({
    code,
    message,
    type: 'ERROR',
  });
});

Axios.defaults.headers['Content-Type'] = 'application/json';
Axios.defaults.withCredentials = true;

export default function fetch(params: AxiosRequestConfig): Promise<any> {
  return Axios(params);
}
