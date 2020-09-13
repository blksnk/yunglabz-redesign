<template>
  <div id="app">
    <main ref="main" v-if="$store.state.dataLoaded">
      <Cover />
      <Spacer id="spacer1" />
      <Tracks v-on:updateLS="updateLS" />
      <Spacer id="spacer2" />
      <Tracklist />
      <AudioPlayer />
    </main>
    <img src="@/assets/img/wrap.png" id="wrap" alt="" />
  </div>
</template>

<script>
import Cover from '@/views/Cover.vue';
import Tracklist from '@/views/Tracklist.vue';
import Tracks from '@/views/Tracks.vue';

import Spacer from '@/components/Spacer.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';

import { fetchAll } from '@/utils/fetchers.js';
import { initLS } from '@/utils/layout.js';

export default {
  components: {
    Cover,
    Tracklist,
    Tracks,
    Spacer,
    AudioPlayer,
  },
  data() {
    return {
      locomotive: null,
      warpScale: 1,
    };
  },
  methods: {
    initLS() {
      console.log('init LS');
      this.locomotive = initLS(this.$refs.main);

      // this.locomotive.on('call', (index) => {
      //   const num = Number(index);
      //   if (num !== this.$store.state.scrollIndex) {
      //     this.setActiveTrack(num);
      //   }
      //   if (this.$store.state.userAgreed) {
      //     this.playSample(num);
      //   }
      // });

      this.locomotive.on('scroll', (e) => {
        this.$store.commit('updateLayoutData', {
          name: 'scroll',
          data: { y: e.scroll.y, speed: e.speed },
        });
      });
    },
    updateLS() {
      if (this.locomotive) {
        this.locomotive.update();
      } else {
        this.initLS();
      }
    },
    playSample(i) {
      this.$store.commit('setTrackIndex', i);
      this.$store.commit('setPlayStatus', true);
    },
    setActiveTrack(i) {
      this.$store.commit('setScrollIndex', i);
    },
    async fetchData() {
      const { tracks } = await fetchAll();
      this.$store.dispatch('preloadAndSetTracks', { tracks });
    },
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateLS);
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

@font-face {
  font-family: 'maelstrom sans';
  src: url('./assets/fonts/maelstrom-sans.otf') format('opentype');
}

@font-face {
  font-family: 'maelstrom bold';
  src: url('./assets/fonts/maelstrom-bold.otf') format('opentype');
}

@font-face {
  font-family: 'compagnie wide';
  src: url('./assets/fonts/compagnie-wide.otf') format('opentype');
}

@font-face {
  font-family: 'druk';
  src: url('./assets/fonts/DrukWideBold.woff2') format('woff2');
}

@font-face {
  font-family: 'accent';
  src: url('./assets/fonts/accent.ttf') format('truetype');
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  user-select: none;
  background: none;
  font-weight: normal;

  &:focus {
    outline: none;
  }
}

body,
html {
  width: 100%;
  overflow: hidden;
}

h1 {
  @include font_huge;
  color: $light_pink;
}

h2 {
  @include font_track_title;
  // overflow-wrap: anywhere;
}

h3 {
  @include font_medium;
  text-transform: uppercase;
  color: $purple;
}

h4 {
  @include font_tiny;
  color: $lilac;
  line-height: 1.5rem;
}

h5 {
  font-family: 'compagnie wide';
  color: $dark_purple;
  font-size: 5vw;
  line-height: 4.2vw;
  margin-top: 1.2vw;
}

button,
a {
  cursor: pointer;
}

img {
  object-fit: cover;
  object-position: center center;
}

ul,
li {
  list-style-type: none;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 12rem;
  background-image: linear-gradient(
    to bottom,
    $dark,
    $blue,
    $violet
  );
}

#spacer1 {
  background-color: $dark;
}

#spacer2 {
  background-color: $blue;
}

// wrap overlay
#wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  mix-blend-mode: screen;
  opacity: 25%;
  object-fit: cover;
  object-position: center center;
  pointer-events: none;
  user-select: none;
  z-index: 40;
}

// locomotive css

html.has-scroll-smooth {
  overflow: hidden;
}

html.has-scroll-dragging {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.has-scroll-smooth body {
  overflow: hidden;
}

.has-scroll-smooth [data-scroll-container] {
  min-height: 100vh;
}

.c-scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  width: 11px;
  height: 100vh;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
}
.c-scrollbar:hover {
  transform: scaleX(1.45);
  opacity: 1;
}
.c-scrollbar:hover,
.has-scroll-scrolling .c-scrollbar,
.has-scroll-dragging .c-scrollbar {
  opacity: 1;
}

.c-scrollbar_thumb {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $hard_purple;
  opacity: 0.75;
  width: 7px;
  border-radius: 10px;
  margin: 2px;
  cursor: -webkit-grab;
  cursor: grab;
}
.has-scroll-dragging .c-scrollbar_thumb {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

//text transition
</style>
