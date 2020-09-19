<template>
  <svg
    id="overlay"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="gradient">
        <stop offset="90%" stop-color="transparent" />
        <stop offset="100%" stop-color="#510ab2" />
      </radialGradient>
    </defs>
    <circle
      id="circle"
      cx="50%"
      cy="50%"
      :r="dim.circle.r"
      :style="dim.circle.style"
      fill="url(#gradient)"
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
      stroke="#eddedf"
      stroke-width="2px"
    />
  </svg>
</template>

<script>
  import {
    rem,
    numToUnit,
    wWidth,
    wHeight,
    transform,
  } from '@/utils/layout.js';

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
        reachTrackList: false,
      };
    },
    computed: {
      scrollIndex() {
        return this.$store.state.scrollIndex;
      },
      showClip() {
        return this.$store.state.showClip;
      },
      layout() {
        return this.$store.state.layout;
      },
      scrollY() {
        return this.layout.scroll.y;
      },
      menuOpen() {
        return this.$store.state.menuOpen;
      },
      documentHeight() {
        const { tracks, list } = this.layout;
        return tracks.sectionHeight + list.sectionHeight + wHeight();
      },
    },
    methods: {
      calcDimesions() {
        const W = wWidth();
        const H = wHeight();

        const padding = rem(W < 700 ? 1.25 : 6);
        const padded = W > H ? H - padding : W - padding;
        const r = padded / 2;
        const circleScale = this.reachTrackList
          ? 0
          : this.showClip
          ? (W / 2 - rem(6)) / r
          : 1;
        const lineRotation = numToUnit(
          this.menuOpen || this.reachTrackList || this.showClip ? 90 : 45,
          'deg',
        );
        const lineScale = this.menuOpen ? W / 2 : 1;
        // const lineTranslateY = this.reachTrackList ? -W / 2 + rem(24) : 0;
        const borderWidth = 2 * (1 / (circleScale * 2));
        const loopSize = padded - rem(9);

        return {
          line: {
            style: `transform: ${transform({
              rotate: lineRotation,
              scaleY: lineScale,
              translateY: numToUnit(0),
            })}`,
          },
          circle: {
            r,
            style: `transform: ${transform({
              scaleX: circleScale,
              scaleY: circleScale,
            })}; borderWidth: ${borderWidth}`,
          },
          loop: {
            width: numToUnit(loopSize),
            height: numToUnit(loopSize),
          },
          video: {
            transform: transform({
              scaleY: this.showClip ? 1 : 0,
            }),
          },
        };
      },
      assignProps() {
        this.dim = { ...this.dim, ...this.calcDimesions() };
      },
    },
    watch: {
      showClip() {
        this.assignProps();
      },
      scrollY(val) {
        // reach tracklist section
        this.reachTrackList =
          val >
          this.documentHeight - wHeight() / 2 - this.layout.list.sectionHeight;

        this.assignProps();
      },
      menuOpen() {
        this.assignProps();
      },
    },
    mounted() {
      this.assignProps();
      window.addEventListener('resize', this.assignProps);
    },
  };
</script>

<style lang="scss">
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;

    pointer-events: none;

    * {
      transform-origin: center;
    }

    #circle {
      transition-delay: 0.2s !important;
      transition: 0.6s transform ease-in-out;
      transform: scaleX(1) scaleY(1);
      z-index: inherit;
    }

    #line {
      // transition-delay: 0.5s !important;
      transition: 0.6s transform ease-in-out;
    }
  }
</style>
