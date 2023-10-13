import { create } from 'zustand';

interface ScreenModeState {
  screenMode: 'MobileVertical' | 'MobileHorizontal' | 'PC';
  setScreenMode: (
    currMode: 'MobileVertical' | 'MobileHorizontal' | 'PC'
  ) => void;
}

const useScreenModeStore = create<ScreenModeState>((set) => ({
  screenMode: 'PC',
  setScreenMode: (currMode) => set((state) => ({ screenMode: currMode })),
}));

export default useScreenModeStore;
