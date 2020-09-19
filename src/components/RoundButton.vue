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
    position: absolute;
    bottom: 6rem;
    right: 6rem;
    height: 12rem;
    width: 12rem;
    border-radius: 100%;
    border: 2px solid $hard_purple;
    @include font_tiny;
    transition: 0.3s transform ease-out;
    transform: scale(1, 1);

    @media screen and (max-width: 650px) {
      height: 6rem;
      width: 6rem;
    }

    &.hide {
      transform: scale(0, 0);
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
      background-color: $hard_purple;
      transform-origin: center center;
      height: 100%;
      width: 100%;
      border-radius: 100%;
      transition: 0.3s transform ease-in-out;

      z-index: 3;
      transform: scale(1, 1);
    }

    &:hover div {
      // color: $hard_purple;
    }

    &:hover:before,
    &.active:before {
      transform: scale(0, 0);
    }

    &.active:hover:before {
      transform: scale(1, 1);
    }
  }
</style>
