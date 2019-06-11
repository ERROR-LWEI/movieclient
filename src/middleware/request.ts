import fetch from './fetch';
import { Method, AxiosRequestConfig } from 'axios';
import { paramsToApi } from '@/utils';

export interface RequestParam {
  api: string;
  method?: Method,
  headers?: any,
  query?: any,
  body?: any,
}

export default function request(params: RequestParam) {
  const { body ={} , method = 'GET', query, ...config} =  params;
  const url = paramsToApi(params);

  const request: AxiosRequestConfig = {
    url: url,
    method: method,
    data: body,
    ...config,
  }

  return fetch(request);
}