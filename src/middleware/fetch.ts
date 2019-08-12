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
Axios.defaults.headers['jwt'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic2VjIjoiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTNfNikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc2LjAuMzgwOS44NyBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNTY1NTk4NDMwLCJleHAiOjE1NjU2ODQ4MzB9.ILqwKRPMwFkY3BjlE-Q4TcNFKFUuL__9r1leziWyYu4"
Axios.defaults.withCredentials = true;

export default function fetch(params: AxiosRequestConfig): Promise<any> {
  return Axios(params);
}
