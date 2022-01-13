import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useSearch = (keyword) =>
  useQuery(
    ['search', keyword],
    async () => {
      const res = await api.get('/suggest/users', {
        params: {
          keyword,
          limit: 10,
          offset: 0,
        },
      });
      return res.data;
    },
    {
      staleTime: 300000,
    },
  );

export default useSearch;
