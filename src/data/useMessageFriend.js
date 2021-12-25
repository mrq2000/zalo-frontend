import { useInfiniteQuery } from 'react-query';
import { api } from '../helpers/api';

const LIMIT = 20;
const useMessageFriend = (firendId) =>
  useInfiniteQuery(
    ['message friends', firendId],
    async () => {
      const res = await api.get(`/messages/friends/${firendId}`, {
        params: {
          cursor: 'null',
          limit: LIMIT,
        },
      });
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextCursor;
      },
      staleTime: 300000,
    },
  );

export default useMessageFriend;
