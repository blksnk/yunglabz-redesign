<template>
  <div class="counter">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      id="counter_svg"
    >
      <line
        x1="23%"
        y1="50%"
        x2="77%"
        y2="50%"
        stroke="#eddedf"
        stroke-width="2px"
      />
      <circle
        id="counter_track"
        r="50%"
        cx="50%"
        cy="50%"
        fill="transparent"
        stroke-width="4px"
      />
      <circle
        id="counter_progress"
        r="50%"
        cx="50%"
        cy="50%"
        fill="transparent"
        :style="style"
        stroke-width="8px"
      />
    </svg>
    <div class="current">{{ current }}</div>
    <div class="total">{{ total }}</div>
  </div>
</template>

<script>
  import { rem, transform, numToUnit } from '@/utils/layout';

  export default {
    name: 'Counter',
    props: ['progress'],
    computed: {
      current() {
        return this.$store.state.scrollIndex + 1;
      },
      total() {
        return this.$store.state.tracks.length;
      },
      style() {
        return {
          strokeDashoffset: 2 * Math.PI * rem(6) * (1 - this.progress),
          strokeDasharray: 2 * Math.PI * rem(6),
          transform: transform({
            rotate: numToUnit(180, 'deg'),
          }),
        };
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  .counter {
    height: 12rem;
    width: 12rem;
    @include element_padding($direction: 'all', $mul: 0.5);
    transition: 0.3s transform ease-out;
    transition-delay: 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    position: relative;

    @media only screen and (max-width: 650px) {
      height: 9rem;
      width: 9rem;
      gap: 2rem;
    }

    @media only screen and (max-width: 500px) {
      height: 6rem;
      gap: 1.5rem;
      width: 6rem;
    }

    &.hide {
      transition-delay: 0s;
      transition-timing-function: ease-in;
      transform: scale(0, 0);
    }

    #counter_svg {
      height: 100%;
      width: 100%;
      border-radius: 100%;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;

      #counter_track {
        stroke: $light_pink;
      }

      #counter_progress {
        stroke: $hard_purple;
      }
    }

    div {
      @include font_small;
      color: $light_pink;

      &.total {
        color: $light_pink_semi;
      }
    }
  }
</style>
