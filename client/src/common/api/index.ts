import axios, { AxiosInstance } from 'axios';
import { Token } from '../auth/token';

export const API$ = Symbol('API');

const host = window?.location?.hostname || "localhost";

export const api: AxiosInstance = axios.create({
  baseURL: `http://${host}:3000/`,
  responseType: 'json',
});

api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${Token.get()}`;
    return config;
  },
  error => Promise.reject(error),
);
