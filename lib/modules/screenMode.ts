import { create } from 'zustand';

interface ScreenModeState {
  screenMode: 'initial' | 'MobileVertical' | 'MobileHorizontal' | 'PC';
  setScreenMode: (
    currMode: 'MobileVertical' | 'MobileHorizontal' | 'PC'
  ) => void;
}

const useScreenModeStore = create<ScreenModeState>((set) => ({
  screenMode: 'initial',
  setScreenMode: (currMode) => set({ screenMode: currMode }),
}));

export default useScreenModeStore;
