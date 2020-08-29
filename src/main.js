import Vue from 'vue';
import AudioVisual from 'vue-audio-visual';
import MarqueeText from 'vue-marquee-text-component';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(AudioVisual);
Vue.component('marquee-text', MarqueeText);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
