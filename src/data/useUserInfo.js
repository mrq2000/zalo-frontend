import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useUserInfo = (id) =>
  useQuery(
    ['user-info', id],
    async () => {
      const res = await api.get(`/users/info/${id}`);
      return res.data;
    },
    {
      staleTime: 300000,
    },
  );

export default useUserInfo;
