const mutations = {
  setTrackIndex(state, payload) {
    state.trackIndex = payload;
  },
  setPlayStatus(state, payload) {
    state.isPlaying = payload;
  },
  setTracks(state, payload) {
    state.tracks = payload;
  },
  updateTrack(state, { updated, index }) {
    const tracks = [...state.tracks];
    tracks[index] = updated;
    state.tracks = tracks;
  },
  setScrollIndex(state, payload) {
    state.scrollIndex = payload;
  },
  setDataLoaded(state) {
    state.dataLoaded = true;
  },
  setCurrentTime(state, time) {
    state.currentTime = time;
  },
  updateLayoutData(state, { name, data }) {
    state.layout[name] = { ...state.layout[name], ...data };
  },
  setShowClip(state, bool) {
    state.showClip = bool;
  },
  setMenuOpen(state, bool) {
    state.menuOpen = bool;
  },
};

export default mutations;
