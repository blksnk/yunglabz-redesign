<template>
  <div class="counter">
    <span class="current">{{ current }}</span>
    <div class="line">
      <div id="progress" :style="{ ...style }"></div>
    </div>
    <span class="total">{{ total }}</span>
  </div>
</template>

<script>
  import { transform } from '@/utils/layout';

  export default {
    name: 'Counter',
    computed: {
      current() {
        return this.$store.state.scrollIndex + 1;
      },
      total() {
        return this.$store.state.tracks.length;
      },
      style() {
        return {
          transform: transform({
            scaleX: this.current / this.total,
          }),
        };
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  .counter {
    height: 1.5rem;
    display: grid;
    grid-template-columns: 0.5rem 4fr 0.5rem;
    align-items: center;
    // justify-content: space-between;
    // pointer-events: none;
    grid-column-gap: 1.25rem;
    z-index: 50;

    @media only screen and (max-width: 650px) {
      grid-column-gap: 0.75rem;
    }

    .current,
    .total {
      @include font_tiny;
      color: $hard_purple;
    }

    .total {
      color: $lilac;
    }

    .line {
      position: relative;
      height: 2px;
      width: 9rem;
      flex-grow: 1;
      background-color: $lilac;

      @media only screen and (max-width: 650px) {
        width: 6rem;
        height: 1px;
      }

      #progress {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $hard_purple;
        transform: scaleX(1);
        transform-origin: center left;
        transition: 0.3s transform ease-out;
      }
    }
  }
</style>
