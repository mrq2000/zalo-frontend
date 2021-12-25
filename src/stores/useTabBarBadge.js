import create from 'zustand';

const useTabBarBadge = create((set) => ({
  message: [],
  postList: 0,
  account: 0,
  setTabBarBadge: (data) => set(() => ({ ...data })),
}));

export default useTabBarBadge;
