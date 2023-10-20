import { create } from 'zustand';

interface ScrollPositionState {
  scrollPosition: number;
  setScrollPosition: (currPositione: number) => void;
}

const useScrollPositionStore = create<ScrollPositionState>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (currPosition) => {
    set({ scrollPosition: currPosition });
  },
}));

export default useScrollPositionStore;
