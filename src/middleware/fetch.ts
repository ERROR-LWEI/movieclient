import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


Axios.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  const { code, message, ...props } = response.data;
  return Promise.resolve({
    code: code,
    message: message,
    type: 'SUCCESS',
    ...props,
  })
}, (error): Promise<any> => {
  return Promise.reject({
    code: error.response.status,
    message: error.message,
    type: 'ERROR',
  })
});

Axios.defaults.headers['Content-Type'] = 'application/json';
Axios.defaults.withCredentials = true;

export default function fetch(params: AxiosRequestConfig): Promise<any> {
  return Axios(params);
}
