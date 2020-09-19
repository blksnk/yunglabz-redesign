<template>
  <nav id="menu_container">
    <button id="menu_btn" :class="{ active }" @click="toggleActive">
      <div class="line"></div>
      <div class="line"></div>
    </button>

    <div id="menu" :class="{ active }">
      <h3 class="glitch">yunglabz</h3>
      <dynamic-marquee
        direction="row"
        :speed="{ type: 'pps', number: 150 }"
        :hoverPause="false"
        :repeatMargin="32"
        reverse
      >
        <h4 class="menu_marquee_title">itérations</h4>
      </dynamic-marquee>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      isPlaying() {
        return this.$store.state.isPlaying;
      },
      active() {
        return this.$store.state.menuOpen;
      },
    },
    methods: {
      toggleActive() {
        this.$store.commit('setMenuOpen', !this.active);
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  #menu_container {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 500;
    text-align: right;
    @include horiz_padding;
    padding-top: 2rem;

    #menu_btn {
      pointer-events: all;
      width: 3rem;
      padding: 1rem 0;
      height: 3rem;
      overflow: visible;
      position: relative;
      z-index: 500;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 100%;
        background-color: $hard_purple;
        transform: scale(0, 0);
        opacity: 0.8;
        transition: 0.2s transform ease-in;
      }

      &:hover:before {
        transform: scale(1.2, 1.2);
      }

      .line {
        height: 2px;
        width: 100%;
        background-color: $light_pink;
        position: absolute;
        top: 0;
        transition: 0.4s transform ease-in-out;

        &:first-child {
          transform: translateY(1rem);
        }

        &:last-child {
          transform: translateY(2rem);
        }
      }

      &.active {
        &:before {
          transform: scale(1.2, 1.2);
        }

        .line:first-child {
          transform: translateY(1.5rem) rotate(45deg);
        }

        .line:last-child {
          transform: translateY(1.5rem) rotate(135deg);
        }
      }
    }

    #menu {
      height: 100%;
      width: 100%;
      // background-color: red;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s opacity linear 0s, 0s visibility linear 0.2s;
      pointer-events: none;
      text-align: left;

      &.active {
        transition: 0.4s opacity linear 0.4s, 0s visibility linear 0s;
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
    }
  }
</style>
