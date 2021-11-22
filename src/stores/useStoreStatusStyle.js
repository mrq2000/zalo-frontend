import create from 'zustand';

export const HEADER_BACKGROUND_COLOR = '#0068ff';

const DEFAULT_STORE = {
  statusBarStyle: {
    barStyle: 'dark-content',
  },
  viewStyle: {
    backgroundColor: '#fff',
  },
};

const useStoreStatusStyle = create((set) => ({
  ...DEFAULT_STORE,
  setStyles: (state) => set({ statusBarStyle: state.statusBarStyle, viewStyle: state.viewStyle }),
  reset: () => set({ statusBarStyle: DEFAULT_STORE.statusBarStyle, viewStyle: DEFAULT_STORE.viewStyle }),
}));

export default useStoreStatusStyle;
