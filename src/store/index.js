import Vue from 'vue';
import Vuex from 'vuex';
import { preloadMetadata } from '@/utils/fetchers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataLoaded: false,
    trackIndex: 0,
    scrollIndex: 0,
    isPlaying: false,
    currentTime: 0,
    tracks: [],
    userAgreed: false,
    showClip: false,
    layout: {
      scroll: {
        y: 0,
        speed: 0,
      },
      tracks: {
        sectionHeight: '800vw',
        scrollOffset: '300%',
      },
    },
  },
  mutations: {
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
  },
  actions: {
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
  },
  modules: {},
});
