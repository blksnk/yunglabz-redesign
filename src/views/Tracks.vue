<template>
  <section id="tracks" ref="page">
    <div
      id="image_container"
      data-scroll-target="#tracks"
      data-scroll-sticky
      data-scroll-speed=".5"
      data-scroll
    >
      <img
        :src="activeTrack.visuUrl"
        :alt="activeTrack.title"
        :key="`img${trackIndex}`"
      />
    </div>

    <div
      id="titles"
      ref="titles"
      data-scroll-target="#tracks"
      data-scroll-sticky
      data-scroll
    >
      <div
        v-for="(track, index) in $store.state.tracks"
        :key="'title' + index"
        data-scroll-speed="7"
        data-scroll-direction="horizontal"
        data-scroll
        data-scroll-offset="0%, -1500%"
        :class="{
          title_container: true,
          active: $store.state.trackIndex === index,
        }"
      >
        <h2 class="title" :data-title="track.title">
          {{ track.title }}
        </h2>
        <img
          v-if="index <= titleIcons.length"
          class="icon"
          src="@/assets/svg/globe_cover.svg"
        />
      </div>
    </div>
    <div id="triggers">
      <div
        data-scroll
        :data-scroll-call="index"
        data-scroll-repeat
        class="trigger"
        v-for="index in indexes"
        :key="`trigger${index}`"
      ></div>
    </div>
  </section>
</template>

<script>
import { wHeight } from '@/utils/layout.js';

export default {
  name: 'Tracks',
  data() {
    return {
      animId: null,
    };
  },
  watch: {
    trackIndex(next, prev) {
      console.log(prev, '->', next);
    },
  },
  computed: {
    trackIndex() {
      return this.$store.state.trackIndex;
    },
    activeTrack() {
      return this.$store.state.tracks[this.trackIndex];
    },
    scrollOffset() {
      return wHeight();
    },
    onScroll({ deltaY }) {
      let i = this.trackIndex;
      if (deltaY > 0) {
        i += 1;
      } else {
        i -= 1;
      }
      this.$store.commit('setTrackIndex', i);
      return i;
    },
    titleIcons() {
      return this.$store.state.tracks.slice(
        0,
        this.$store.state.tracks.length - 2,
      );
    },
    indexes() {
      return this.$store.state.tracks.map((t, index) => index);
    },
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

#tracks {
  left: 0;
  width: 100%;
  min-height: 800vw;
  height: 800vw;
  position: relative;
  // height: max-content;
  // background-image: linear-gradient(to bottom, $light_pink, $dark);

  #image_container {
    height: 100vh;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 3rem;
    z-index: 1;

    img {
      height: 100%;
      width: 100%;
      padding: 0.75rem;
      border: 2px solid $hard_purple;
      z-index: 1;
    }
  }

  #titles {
    top: calc(-100vh);
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 30vw;

    .title_container {
      padding-left: 3rem;
      height: 100%;
      display: flex;
      align-items: center;

      z-index: 2;
      justify-content: space-between;

      .title {
        text-transform: uppercase;
        color: transparent;
        height: max-content;
        letter-spacing: 4px;
        position: relative;
        -webkit-text-stroke: 1px $light_pink;
        z-index: 2;
        transition-duration: 0.15s;
      }

      &.active .title {
        color: $light_pink;
      }

      .icon {
        height: 9vw;
        margin-left: 3rem;
      }
    }
  }
  #triggers {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .trigger {
      // background: red;
      width: 6px;
      height: 55vw;
      pointer-events: none;
    }
  }
}
</style>
