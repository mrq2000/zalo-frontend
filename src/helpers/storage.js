import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_TOKEN = 'USER_TOKEN';
export const setItem = (key, value) => {
  AsyncStorage.setItem(key, value);
};

export const getItem = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value === null ? '' : value;
};

export const setToken = (value) => {
  setItem(USER_TOKEN, value);
};

export const clearToken = () => setToken('');

export const getToken = async () => await getItem(USER_TOKEN);
