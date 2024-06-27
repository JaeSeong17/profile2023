import { create } from 'zustand';

interface ScreenModeState {
  screenMode:
    | 'initial'
    | 'MobileVertical'
    | 'MobileHorizontal'
    | 'PC'
    | 'Tablet';
  setScreenMode: (
    currMode: 'MobileVertical' | 'MobileHorizontal' | 'PC' | 'Tablet'
  ) => void;
}

const useScreenModeStore = create<ScreenModeState>((set) => ({
  screenMode: 'initial',
  setScreenMode: (currMode) => set({ screenMode: currMode }),
}));

export default useScreenModeStore;
