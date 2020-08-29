import Vue from 'vue';
import dotenv from 'dotenv';
import AudioVisual from 'vue-audio-visual';
import MarqueeText from 'vue-marquee-text-component';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

dotenv.config();

Vue.use(AudioVisual);
Vue.component('marquee-text', MarqueeText);

Vue.config.productionTip = true;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
