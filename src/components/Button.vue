<template>
  <button class="btn" @click="onClick" :class="{ active }">
    <span>{{
      activeTitle !== '' ? (active ? activeTitle : title) : title
    }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    activeTitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'title',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

.btn {
  @include font_tiny;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 12rem;

  &::after,
  span::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.2s transform ease-in-out;
  }

  span {
    color: $lilac;
    position: relative;
    transition: 0.2s color linear;

    &::after {
      background-color: $hard_purple;
      height: 2px;
      width: 100%;
      transform-origin: right;
      transform: scaleX(0);
      bottom: 0;
    }
  }

  &::after {
    top: 0;
    border: 1px solid $dark_pink;
    border-radius: 100%;
    transform-origin: center center;
  }

  &.active::after,
  &:hover::after {
    transform: rotate(-15deg);
  }

  &:hover span {
    color: $light_pink;
  }

  &:hover span::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}
</style>
