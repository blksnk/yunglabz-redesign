import { numToUnit, wHeight } from '@/utils/layout';

const initState = {
  dataLoaded: false,
  trackIndex: 0,
  scrollIndex: 0,
  isPlaying: false,
  currentTime: 0,
  tracks: [],
  userAgreed: false,
  showClip: false,
  menuOpen: false,
  layout: {
    scroll: {
      y: 0,
      speed: 0,
    },
    tracks: {
      sectionHeight: '800vw',
      scrollOffset: '300%',
    },
    list: {
      sectionHeight: numToUnit(wHeight()),
    },
  },
};

export default initState;
