import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useMe = () =>
  useQuery(
    'me',
    async () => {
      const res = await api.get('/me');
      return res.data;
    },
    {
      staleTime: 300000,
    },
  );

export default useMe;
