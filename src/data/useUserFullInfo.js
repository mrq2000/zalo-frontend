import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useUserFullInfo = (id) =>
  useQuery(
    ['user-full-info', id],
    async () => {
      const res = await api.get(`/users/${id}/info`);
      return res.data;
    },
    {
      staleTime: 300000,
    },
  );

export default useUserFullInfo;
