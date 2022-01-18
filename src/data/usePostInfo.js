import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const usePostInfo = (id) =>
  useQuery(
    ['post-info', id],
    async () => {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    },
    {
      staleTime: 300000,
    },
  );

export default usePostInfo;
