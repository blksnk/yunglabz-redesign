import Vue from 'vue';
import Vuex from 'vuex';
import initState from './initState';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: initState,
  mutations,
  actions,
  modules: {},
});
