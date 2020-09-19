import { preloadMetadata } from '@/utils/fetchers';

const actions = {
  playPause({ state, commit }) {
    commit('setPlayStatus', !state.isPlaying);
  },
  updateTrackDuration({ state, commit }, { index, duration }) {
    const track = { ...state.tracks[index], duration };
    commit('updateTrack', { track, index });
  },
  async preloadAndSetTracks({ commit }, { tracks }) {
    const durations = await Promise.all(
      tracks.map((track) => preloadMetadata(track.audioUrl)),
    );
    const formatted = tracks.map((track, index) => ({
      ...track,
      duration: durations[index],
    }));
    commit('setTracks', formatted);
    commit('setDataLoaded');
  },
  toggleShowClip({ state, commit }) {
    commit('setShowClip', !state.showClip);
  },
  toggleMenuOpen({ state, commit }) {
    commit('setMenuOpen', !state.menuOpen);
  },
};

export default actions;
