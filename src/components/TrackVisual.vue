<template>
  <div id="track_visual">
    <div id="visu">
      <div id="loop_wrapper">
        <transition name="change">
          <img
            :src="activeTrack.loopUrl"
            :alt="activeTrack.title"
            :style="dim.loop"
            id="loop"
            :class="{ reverse: reverse, hide: showClip }"
            :key="`img${scrollIndex}`"
            @click.prevent="onClick"
          />
        </transition>
      </div>
    </div>
    <svg
      id="overlay"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        id="circle"
        cx="50%"
        cy="50%"
        :r="dim.circle.r"
        :style="dim.circle.style"
        fill="transparent"
        stroke="#510ab2"
        stroke-width="2px"
      />
      <line
        id="line"
        x1="-50%"
        x2="150%"
        y1="50%"
        y2="50%"
        :style="dim.line.style"
        stroke="#ccbac3ff"
        stroke-width="2px"
      />
    </svg>
    <Button
      id="clip_btn"
      v-if="activeTrack.clipUrl"
      title="watch video"
      @click="onClick"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

import {
  rem,
  numToUnit,
  wWidth,
  wHeight,
  transform,
} from '@/utils/layout.js';

export default {
  components: {
    Button,
  },
  data() {
    return {
      dim: {
        line: {},
        circle: {
          r: '50vh',
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
      const W = wWidth();
      const H = wHeight();
      // const cx = W / 2;
      // const cy = H / 2;

      const padded = W > H ? H - rem(6) : W - rem(6);
      const r = padded / 2;
      const loop = padded - rem(6);
      const circleScale = this.showClip ? (W / 2 - rem(6)) / r : 1;
      const lineRotation = numToUnit(this.showClip ? 0 : 45, 'deg');

      return {
        line: {
          style: `transform: ${transform({
            rotate: lineRotation,
          })}`,
        },
        circle: {
          r,
          style: `transform: ${transform({
            scaleX: circleScale,
            scaleY: circleScale,
          })}`,
        },
        loop: {
          width: numToUnit(loop),
          height: numToUnit(loop),
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
    this.assignProps();
    window.addEventListener('resize', this.assignProps);
  },
};
</script>

<style lang="scss">
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
      border-radius: 100%;
      height: calc(100vh - 8rem);
      width: calc(100vh - 8rem);
      transition-timing-function: ease-out;
      position: absolute;
      opacity: 1;
      transition-duration: 0.6s;

      &.hide {
        transform: scale(0.7, 0.7);
      }
      &:hover:not(.hide):not(.change-enter-active) {
        transform: scale(0.95, 0.95);
      }
    }

    .change-enter-active {
      transition-delay: 0.2s;
      // transform: scale(0.95, 0.95);
    }

    .change-leave-active {
      transition-duration: 0.8s !important;
      filter: grayscale(0.5) brightness(0.5);
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
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    z-index: 2;
    pointer-events: none;

    * {
      transform-origin: center;
    }

    #circle {
      transition-delay: 0.2s !important;
      transition: 0.6s transform ease-in-out;
      transform: scaleX(1) scaleY(1);
    }

    #line {
      transition-delay: 0.4s !important;
      transition: 0.6s transform ease-in-out;
    }
  }

  #clip_btn {
    position: absolute;
    bottom: 3rem;
    right: 6rem;
    height: max-content;
    width: max-content;
  }
}
</style>
