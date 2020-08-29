<template>
  <div id="app">
    <main ref="main">
      <Cover />
      <!-- <Spacer /> -->
      <Tracklist v-on:scaled="updateLS" />
      <Cover />
    </main>
    <!-- <NavBar></NavBar> -->
    <img src="@/assets/img/wrap.png" id="wrap" alt="" />
  </div>
</template>

<script>
import Locomotive from 'locomotive-scroll';

import Cover from '@/views/Cover.vue';
import Tracklist from '@/views/Tracks.vue';
// import Spacer from '@/components/Spacer.vue';
// import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    Cover,
    Tracklist,
    // Spacer,
    // NavBar,
  },
  data() {
    return {
      locomotive: null,
      warpScale: 1,
    };
  },
  methods: {
    initLS() {
      this.locomotive = new Locomotive({
        el: this.$refs.main,
        smooth: true,
        smoothMobile: true,
        scrollFromAnywhere: true,
      });

      this.locomotive.on('call', (index) => {
        const num = Number(index);
        if (num !== this.$store.state.trackIndex) {
          this.setActiveTrack(num);
        }
      });
    },
    updateLS() {
      if (this.locomotive) {
        this.locomotive.update();
      }
    },
    setActiveTrack(i) {
      this.$store.commit('setTrackIndex', i);
    },
  },
  mounted() {
    this.initLS();
    window.addEventListener('resize', this.updateLS);
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

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  user-select: none;
  background: none;

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
  @include font_big;
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
  @include block_padding;
  background-image: linear-gradient(
    to bottom,
    $dark,
    $blue,
    $violet
  );
}

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
</style>
