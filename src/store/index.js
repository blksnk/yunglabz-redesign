import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trackIndex: 0,
    isPlaying: false,
    tracks: [
      {
        title: 'Meta',
        audioUrl: '',
        visuUrl:
          'https://i.pinimg.com/originals/73/55/f9/7355f972664a1a9edcd433d907845dc2.jpg',
      },
      {
        title: 'overdrive',
        audioUrl: '',
        visuUrl:
          'https://hdwallpaperim.com/wp-content/uploads/2017/08/24/104588-glitch_art-pixel_sorting-clouds.jpg',
      },
      {
        title: 'glitch',
        audioUrl: '',
        visuUrl: 'https://i.imgur.com/hcNjXva.jpg',
      },
      {
        title: 'quartier',
        audioUrl: '',
        visuUrl:
          'https://c4.wallpaperflare.com/wallpaper/837/544/905/glitch-art-sea-landscape-nature-wallpaper-preview.jpg',
      },
      {
        title: 'hypothèse',
        audioUrl: '',
        visuUrl:
          'https://live.staticflickr.com/7911/33649754258_c57ac95bcc_b.jpg',
      },
      {
        title: 'crypt',
        audioUrl: '',
        visuUrl:
          'https://wallup.net/wp-content/uploads/2016/05/25/242470-glitch_art.jpg',
      },
    ],
  },
  mutations: {
    setTrackIndex(state, payload) {
      state.trackIndex = payload;
    },
    setPlayStatus(state, payload) {
      state.isPlaying = payload;
    },
  },
  actions: {
    playPause({ state, commit }) {
      commit('setPlayStatus', !state.isPlaying);
    },
  },
  modules: {},
});
