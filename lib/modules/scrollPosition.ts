import { create } from 'zustand';

interface scrollPositionState {
  scrollPosition: number;
  setScreenMode: (currPosition: number) => void;
}

const scrollPositionStore = create<scrollPositionState>((set) => ({
  scrollPosition: 0,
  setScreenMode: (currPosition) =>
    set((state) => ({ scrollPosition: currPosition })),
}));

export default scrollPositionStore;
