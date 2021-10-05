import { AsyncStorage } from '@react-native-community/async-storage';

export const USER_TOKEN = 'USER_TOKEN';
export const setItem = (key, value) => {
  AsyncStorage.setItem(key, value);
};

export const getItem = (key) => {
  const value = AsyncStorage.getItem(key);
  return value === null ? '' : value;
};

export const setToken = (value) => {
  setItem(USER_TOKEN, value);
};

export const clearToken = () => setToken('');

export const getToken = () => getItem(USER_TOKEN);
