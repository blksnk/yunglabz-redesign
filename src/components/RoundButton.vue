<template>
  <button :class="{ btn_round: true, hide, active }" @click="$emit('click')">
    <div>
      <slot>
        button<br />
        content
      </slot>
    </div>
  </button>
</template>

<script>
  export default {
    props: {
      hide: {
        type: Boolean,
        default: false,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  .btn_round {
    position: relative;
    height: 12rem;
    width: 12rem;
    border-radius: 100%;
    border: 2px solid $light_pink;
    @include font_tiny;
    transition: 0.3s transform ease-out 0.3s;
    transform: scale(1, 1);

    @media screen and (max-width: 650px) {
      height: 9rem;
      width: 9rem;
    }

    @media screen and (max-width: 500px) {
      height: 6rem;
      width: 6rem;
    }

    &.hide {
      transform: scale(0, 0);
      transition-delay: 0s;
    }

    div {
      color: $light_pink;
      text-decoration: underline;
      position: relative;
      z-index: 4;
      transition: 0.3s color linear;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background-color: $light_pink;
      transform-origin: center center;
      height: 100%;
      width: 100%;
      border-radius: 100%;
      transition: 0.3s transform ease-in-out;

      z-index: 3;
      transform: scale(0, 0);
    }

    &:hover div,
    &.active div {
      color: $hard_purple;
    }

    &:hover:before,
    &.active:before {
      transform: scale(1.02, 1.02);
    }

    &.active:hover:before {
      transform: scale(1.02, 1.02);
    }
  }
</style>
