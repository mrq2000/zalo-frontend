import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useMessageList = () =>
  useQuery(
    'message list',
    async () => {
      const res = await api.get('/messages/friends', {
        params: {
          offset: 0,
          limit: 20,
        },
      });
      return res.data;
    },
    {
      staleTime: 0,
      cacheTime: 0,
      keepPreviousData: true,
    },
  );

export default useMessageList;
