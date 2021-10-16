import axios from 'axios';
import { API } from '../env';
import { setToken as setTokenStorage, getToken as getTokenStorage } from './storage';

export const api = axios.create({
  baseURL: API,
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const set = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export function setToken(token) {
  setTokenStorage(token);
  set(token);
}

set(getTokenStorage());
