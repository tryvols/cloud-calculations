import axios, { AxiosInstance } from 'axios';
import { Token } from '../auth/token';

export const API$ = Symbol('API');

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  responseType: 'json',
});

api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${Token.get()}`;
    return config;
  },
  error => Promise.reject(error),
);
