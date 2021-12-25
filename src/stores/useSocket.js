import create from 'zustand';

const useSocket = create((set) => ({
  socket: null,
  setSocket: (socket) => set(() => ({ socket })),
}));

export default useSocket;
