<template>
  <div class="counter">
    <span class="current">{{ current + 1 }}</span>
    <div class="line"></div>
    <span class="total">{{ total }}</span>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  computed: {
    current() {
      return this.$store.state.scrollIndex;
    },
    total() {
      return this.$store.state.tracks.length;
    },
    // scrollLengths() {

    // }
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

.counter {
  width: 9rem;
  height: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  // justify-content: space-between;
  // pointer-events: none;
  margin-left: 6rem;
  grid-column-gap: 1.25rem;

  .current,
  .total {
    @include font_tiny;
    color: $lilac;
  }

  .total {
    @include font_tiny;
    color: $hard_purple;
  }

  .line {
    height: 2px;
    width: 100%;
    flex-grow: 1;
    background-image: linear-gradient(
      to right,
      $lilac,
      $hard_purple
    );
  }
}
</style>
