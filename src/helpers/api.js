import axios from 'axios';
import { API } from '../env';
import { setToken as setTokenStorage, getToken as getTokenStorage } from './storage';
import history from '../history';

export const api = axios.create({
  baseURL: API,
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      history.push({
        pathname: '/error',
        state: { status: 403 },
      });
    }

    return Promise.reject(error);
  },
);

const set = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export function setToken(token) {
  setTokenStorage(token);
  set(token);
}

set(getTokenStorage());
