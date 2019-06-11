import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { errorCompatibleWith } from '@/utils';

Axios.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  const { code, message, ...props } = response.data;
  return Promise.resolve({
    code: code,
    message: message,
    type: 'SUCCESS',
    ...props,
  })
}, (error): Promise<any> => {
  const { code, message } = errorCompatibleWith(error);
  return Promise.resolve({
    code: code,
    message: message,
    type: 'ERROR',
  })
});

Axios.defaults.headers['Content-Type'] = 'application/json';
Axios.defaults.withCredentials = true;

export default function fetch(params: AxiosRequestConfig): Promise<any> {
  return Axios(params);
}
