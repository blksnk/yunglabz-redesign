<template>
  <div id="track_visual">
    <div id="visu">
      <div id="loop_wrapper">
        <transition name="change">
          <img
            :src="activeTrack.loopUrl"
            :alt="activeTrack.title"
            id="loop"
            :class="{ reverse: reverse, hide: showClip }"
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
    <RoundButton
      id="clip_btn"
      :hide="activeTrack.clipUrl === null"
      :active="showClip"
      title="watch video"
      @click="onClick"
    >
      <span v-if="!showClip"
        >watch<br />
        video</span
      >
      <span v-else>close</span>
    </RoundButton>
  </div>
</template>

<script>
  import RoundButton from '@/components/RoundButton.vue';
  import {
    rem,
    numToUnit,
    wWidth,
    wHeight,
    transform,
  } from '@/utils/layout.js';

  export default {
    components: {
      RoundButton,
    },
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
        // this.assignProps();
      },
    },
    methods: {
      calcDimesions() {
        const W = wWidth();
        const H = wHeight();

        // const padded = H - rem(6);
        const short = W < H ? W - rem(2) : H - rem(12);
        const long = (short / 3) * 4;
        // const loopSize = padded - rem(9);

        return {
          loop: {
            width: numToUnit(W > 800 ? long : short),
            height: numToUnit(W < 800 ? long : short),
          },
          video: {
            transform: transform({
              scaleX: this.showClip ? 1 : 0,
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
        transition-timing-function: ease-in-out;
        position: absolute;
        opacity: 1;
        transition-duration: 0.6s;
        transition-delay: 0.6s;
        outline: 2px solid $dark;
        outline-offset: -2px;

        &.hide {
          transition-delay: 0s;
          transition-duration: 0.4s;
          transform: rotate(-45deg) scale(0, 0);
        }
      }

      .change-enter-active {
        transition-duration: 0.4s !important;
        transition-delay: 0.2s !important;
        transition-timing-function: ease-out;
      }

      .change-leave-active {
        transition-duration: 1s !important;
        transition-delay: 0s !important;
        filter: grayscale(0.5) brightness(0.5);
        transform: scale(0.7, 0.7) !important;
        transition-timing-function: ease-in;
      }

      .change-leave-to {
        opacity: 0;
      }

      .change-enter {
        transform: translateX(100vw);
      }

      .reverse.change-enter {
        transform: translateX(-100vw);
      }

      #video_container {
        position: absolute;
        top: 6rem;
        left: 3rem;
        padding: 1.5rem 3rem;
        height: calc(100vh - 12rem);
        width: calc(100vw - 6rem);
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $lilac;
        transition: 0.4s transform ease-out;

        &.show {
          transition-delay: 0.4s;
          transition-duration: 0.6s;
        }

        video {
          height: 100%;
          width: 100%;
          object-fit: contain;
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
