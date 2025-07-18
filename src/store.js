import { create } from "zustand";

export const useStore = create((set) => ({
  artistIndex: 0,
  songIndex: 0,
  isPlaying: false,
  activeIndex: 0,

  setArtistIndex: (index) => set(() => ({ artistIndex: index })),
  setSongIndex: (index) => set(() => ({ songIndex: index })),
  setIsPlaying: (play) => set(() => ({ isPlaying: play })),
  setActiveIndex: (index) => set(() => ({ activeIndex: index })),
}));
