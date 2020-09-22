<template>
  <div id="overlay">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient">
          <stop :offset="`${progress}%`" stop-color="#510ab2" />
          <stop offset="100%" stop-color="#eddedf" />
        </linearGradient>
      </defs>
      <line
        id="line"
        x1="0"
        x2="100%"
        y1="0"
        y2="100%"
        :style="dim.line.style"
        stroke="#eddedf"
        stroke-width="1.5px"
      />
      <rect
        id="overlay_menu_btn_border"
        :x="dim.rectMenu.x"
        :y="dim.rectMenu.y"
        :width="dim.rectMenu.width"
        :height="dim.rectMenu.height"
        fill="transparent"
        :stroke="strokeColor"
        stroke-width="1.5px"
      />
      <rect
        id="overlay_track_border"
        :class="{ hide: !reachTracks || menuOpen }"
        :x="dim.rectTrack.x"
        :y="dim.rectTrack.y"
        :width="dim.rectTrack.width"
        :height="dim.rectTrack.height"
        fill="transparent"
        :stroke="strokeColor"
        stroke-width="1.5px"
      />
      <rect
        id="overlay_play_border"
        :class="{ hide: !reachTrackList || menuOpen }"
        :x="dim.rectPlay.x"
        :y="dim.rectPlay.y"
        :width="dim.rectPlay.width"
        :height="dim.rectPlay.height"
        fill="transparent"
        :stroke="strokeColor"
        stroke-width="1.5px"
      />
      <rect
        id="overlay_border"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="transparent"
        :stroke="strokeColor"
        stroke-width="2px"
      />
    </svg>
    <!--     <img
      src="@/assets/img/thorus.png"
      :style="globeStyle"
      id="overlay_img"
      alt=""
    /> -->
    <RoundButton
      id="clip_btn"
      :hide="hide || !reachTracks || menuOpen"
      title="watch video"
      @click="toggleShowClip"
    >
      <span v-if="!showClip"
        >watch<br />
        video</span
      >
      <span v-else>close</span>
    </RoundButton>

    <button id="menu_btn" :class="{ active: menuOpen }" @click="toggleMenu">
      <div class="line"></div>
      <div class="line"></div>
    </button>

    <Counter
      v-bind="{ progress }"
      id="counter"
      :class="{ hide: !reachTracks || menuOpen }"
    />

    <div id="controls" :class="{ hide: !reachTrackList || menuOpen }"></div>
  </div>
</template>

<script>
  import RoundButton from '@/components/RoundButton.vue';
  import Counter from '@/components/Counter.vue';
  import {
    rem,
    numToUnit,
    wWidth,
    wHeight,
    transform,
  } from '@/utils/layout.js';

  const innerRectDim = () => {
    const W = wWidth();
    return {
      x: W - rem(W < 500 ? 8 : W < 650 ? 13 : 18),
      width: rem(W < 500 ? 6 : W < 650 ? 9 : 12),
    };
  };

  export default {
    components: {
      RoundButton,
      Counter,
    },
    data() {
      return {
        dim: {
          line: {
            width: wWidth(),
          },
          circle: {
            r: '50vh',
          },
          video: {
            transform: transform({
              scaleY: 0,
            }),
          },
          rectTrack: {
            ...innerRectDim(),
            height: wHeight() - rem(21),
          },
          rectMenu: {
            ...innerRectDim(),
            y: 0,
            height: rem(6),
          },
          rectPlay: {
            x: 0,
            y: wHeight() - rem(15),
            height: rem(12),
            width: '100%',
          },
        },
        reverse: false,
        reachTracks: false,
        reachTrackList: false,
        progress: 0,
      };
    },
    computed: {
      scrollIndex() {
        return this.$store.state.scrollIndex;
      },
      showClip() {
        return this.$store.state.showClip;
      },
      hide() {
        return this.$store.state.tracks[this.scrollIndex].clipUrl === null;
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
      strokeColor() {
        return this.menuOpen ? '#181818' : '#eddedf';
      },
      globeStyle() {
        return {
          transform: transform({
            translateY: numToUnit(this.progress / 2, '%'),
            rotate: numToUnit(180, 'deg'),
          }),
        };
      },
    },
    methods: {
      calcDimesions() {
        const W = wWidth();
        const H = wHeight();

        const lineScale = this.showClip
          ? 0
          : this.menuOpen
          ? W > H
            ? W
            : H
          : 1;

        return {
          line: {
            style: {
              transform: transform({
                scale: lineScale,
              }),
            },
          },
          rectTrack: {
            ...innerRectDim(),
            y: rem(6),
            height: H - rem(W < 500 ? 19 : W < 650 ? 20 : 27),
          },
          rectMenu: {
            ...innerRectDim(),
            y: 0,
            height: rem(6),
          },
          rectPlay: {
            x: 0,
            y: wHeight() - rem(W < 500 ? 8 : W < 650 ? 13 : 18),
            height: rem(W < 500 ? 6 : W < 650 ? 9 : 12),
            width: '100%',
          },
        };
      },
      assignProps() {
        this.dim = { ...this.dim, ...this.calcDimesions() };
      },
      toggleShowClip() {
        this.$store.dispatch('toggleShowClip');
      },
      toggleMenu() {
        this.$store.dispatch('toggleMenuOpen');
      },
    },
    watch: {
      showClip() {
        this.assignProps();
      },
      scrollY(val) {
        const H = wHeight();

        this.progress = Math.min(
          Math.max((val - H / 2) / this.layout.tracks.sectionHeight, 0),
          1,
        );

        // reach tracklist section
        this.reachTrackList =
          val > this.documentHeight - H / 2 - this.layout.list.sectionHeight;

        //reach tracks section
        this.reachTracks = val > H && !this.reachTrackList;
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
  @import '@/scss/_vars.scss';

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    @include block_padding;
    display: grid;
    grid-template-columns: 12rem 1fr 12rem;
    grid-template-rows: 6rem 1fr 3rem 12rem;

    pointer-events: none;

    @media only screen and (max-width: 650px) {
      grid-template-columns: 9rem 1fr 9rem;
      grid-template-rows: 6rem 1fr 1rem 9rem;
    }

    @media only screen and (max-width: 500px) {
      grid-template-columns: 6rem 1fr 6rem;
      grid-template-rows: 6rem 1fr 5rem 6rem;
    }

    svg {
      z-index: 40;
      height: 100%;
      width: 100%;
      max-width: 100%;
      grid-column: 1 / -1;
      grid-row: 1 / -1;

      * {
        transform-origin: center;
      }

      #overlay_track_border {
        transform: translateX(0);
        transition: 0.3s transform ease-in-out;

        &.hide {
          transform: translateX(12rem) !important;
        }
      }

      #overlay_play_border {
        transform: translateY(0);
        transition: 0.3s transform ease-in-out;

        &.hide {
          transform: translateY(15rem) !important;
        }
      }

      #line {
        transition: 0.6s transform ease-in-out;
      }
    }

    #clip_btn {
      grid-column: 3 / -1;
      grid-row: 2 / 2;
      pointer-events: all;
      align-self: end;
    }

    #menu_btn {
      grid-column: 3 / 3;
      grid-row: 1 / 1;
      pointer-events: all;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      z-index: 5000;
      align-self: center;
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &:before {
        content: '';
        position: absolute;
        top: -6rem;
        left: 0;
        height: 12rem;
        width: 12rem;
        border-radius: 12rem;
        background-color: $light_pink;
        transform: scale(0, 0);
        transition: 0.2s transform ease-in;
      }

      &:hover:before,
      &.active:before {
      }

      &:hover .line,
      &.active .line {
        background-color: $hard_purple;
      }

      .line {
        height: 2px;
        width: 6rem;
        background-color: $light_pink;
        position: absolute;
        transition: 0.4s transform ease-in-out 0s,
          0.2s background-color linear 0s;

        &:first-child {
          transform: translateY(-0.5rem);
        }

        &:last-child {
          transform: translateY(0.5rem);
        }

        @media only screen and (max-width: 650px) {
          width: 4rem;
        }

        @media only screen and (max-width: 500px) {
          width: 3rem;
        }
      }

      &.active {
        .line:first-child {
          transform: translateY(0rem) rotate(45deg);
        }

        .line:last-child {
          transform: translateY(0rem) rotate(135deg);
        }
      }
    }

    #overlay_img {
      grid-column: 1 / 1;
      grid-row: 2 / 2;
      @include element_padding(right, 2);
      align-self: top;
      width: 100%;
      transform: rotate(180deg);
    }

    #counter {
      grid-column: 3 / 3;
      grid-row: 2 / 2;
      align-self: start;
      @include element_margin(top, 1);
    }

    #controls {
      grid-column: 1 / -1;
      grid-row: 4 / 4;
      height: 12rem;
      width: 100%;
      position: relative;
      overflow: hidden;
      pointer-events: all;

      &:before {
        @include pseudo_full;
        background-color: $light_pink_semi;
        backdrop-filter: blur(25px);
        transform: translateY(0);
        transition: 0.3s transform ease-in-out;
      }

      &.hide {
        pointer-events: none;

        &:before {
          transform: translateY(12rem) !important;
        }
      }
    }
  }
</style>
