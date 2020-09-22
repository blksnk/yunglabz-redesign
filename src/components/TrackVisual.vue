<template>
  <div id="track_visual">
    <div id="visu">
      <div id="loop_wrapper">
        <transition name="change">
          <img
            :src="activeTrack.loopUrl"
            :alt="activeTrack.title"
            id="loop"
            :class="{ reverse: reverse }"
            :key="`img${scrollIndex}`"
          />
        </transition>
        <div
          id="video_container"
          :class="{ show: showClip }"
          :style="dim.video"
        >
          <transition name="appear">
            <video
              v-if="showClip && activeTrack.clipUrl !== null"
              :src="activeTrack.clipUrl"
              autoplay
            ></video>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { transform } from '@/utils/layout.js';

  export default {
    data() {
      return {
        dim: {
          line: {},
          circle: {
            r: '50vh',
          },
          video: {
            transform: transform({
              scaleY: 0,
            }),
          },
        },
        reverse: false,
      };
    },
    computed: {
      scrollIndex() {
        return this.$store.state.scrollIndex;
      },
      activeTrack() {
        return this.$store.state.tracks[this.scrollIndex];
      },
      showClip() {
        return this.$store.state.showClip;
      },
    },
    watch: {
      scrollIndex(next, prev) {
        this.reverse = next < prev;
      },
      showClip() {
        this.assignProps();
      },
    },
    methods: {
      calcDimesions() {
        return {
          video: {
            transform: transform({
              scale: this.showClip ? 1 : 0,
            }),
          },
        };
      },
      assignProps() {
        this.dim = { ...this.dim, ...this.calcDimesions() };
      },
      onClick() {
        this.$store.dispatch('toggleShowClip');
      },
    },
    mounted() {
      // this.assignProps();
      // window.addEventListener('resize', this.assignProps);
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  #track_visual {
    height: 100vh;
    width: 100%;
    position: relative;

    #visu {
      height: 100%;
      width: 100%;
      transition-duration: 0.6s;

      #loop_wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
      }

      #loop {
        // border-radius: 100%;
        height: 100vh;
        width: 100vw;
        position: absolute;
        opacity: 1;
        outline: 2px solid $dark;
        outline-offset: -2px;

        &.hide {
          transition-delay: 0s;
          transition-duration: 0.4s;
          transform: rotate(-45deg) scale(0, 0);
        }
      }

      #video_container {
        position: absolute;
        top: 0;
        left: 0;
        @include block_padding;
        height: 100%;
        width: 100%;
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.4s transform ease-out;

        &.show {
          transition-delay: 0.4s;
          transition-duration: 0.6s;
        }

        video {
          height: 100%;
          width: 100%;
          object-fit: cover;
          opacity: 1;
          transition: 0.4s opacity;
        }
      }

      .appear-enter-active {
        transition-delay: 4.2s !important;
      }

      .appear-leave-active {
      }

      .appear-leave-to {
        opacity: 0;
      }

      .appear-enter {
        opacity: 0;
      }
    }

    #clip_btn {
      position: absolute;
      bottom: 3rem;
      right: 6rem;
      z-index: 5;

      @media only screen and (max-width: 700px) {
        right: 1.25rem;
      }
    }
  }
</style>
