import fetch from './fetch';
import { Method } from 'axios';

export interface RequestParam {
  api: string;
  method?: Method,
  headers?: any,
  query?: any,
  body?: any,
}

export default function request(params: RequestParam) {
  const { body ={} , method, headers, ...config} =  params;

  const request = {
    
  }

  return fetch()
}