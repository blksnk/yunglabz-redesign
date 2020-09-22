<template>
  <nav id="menu_container">
    <button id="menu_btn" :class="{ active }" @click="toggleActive">
      <div class="line"></div>
      <div class="line"></div>
    </button>

    <div id="menu" :class="{ active }" ref="menu">
      <div id="menu_header" class="menu_item">
        <h3 class="glitch">yunglabz</h3>

        <div id="menu_marquee_container">
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
      </div>

      <div id="menu_links" class="menu_item">
        <span>sections</span>
        <ul>
          <li><button @click="scrollTo('cover')">home</button></li>
          <li><button @click="scrollTo('tracks')">visuals</button></li>
          <li><button @click="scrollTo('tracklist')">tracklist</button></li>
        </ul>
      </div>

      <div id="menu_pres" class="menu_item">
        <span>biographie</span>

        <p>
          Incididunt proident ea reprehenderit aute occaecat est mollit sed qui
          in dolore laborum amet qui ut id adipisicing duis laborum eu.
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
  import { initLS } from '@/utils/layout.js';

  export default {
    data() {
      return {
        locomotive: null,
      };
    },
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
        this.$store.dispatch('toggleMenuOpen');
      },
      scrollTo(id) {
        this.$store.commit('setMenuOpen', false);
        this.$nextTick(() => {
          this.$emit('scrollTo', `#${id}`);
        });
      },
      initLS() {
        this.locomotive = initLS(this.$refs.menu);
      },
    },
    watch: {
      // active(next) {
      //   if (this.locomotive === null && next) {
      //     this.initLS();
      //   } else if (!next && this.locomotive) {
      //     this.locomotive.stop();
      //     this.locomotive.destroy();
      //   } else if (next && this.locomotive) {
      //     this.locomotive.start();
      //   }
      // },
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

      @media screen and (max-width: 700px) {
        height: 2rem;
        width: 2rem;

        &:hover:before {
          transform: scale(0, 0);
        }
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

          @media screen and (max-width: 700px) {
            transform: translateY(0.5rem);
          }
        }

        &:last-child {
          transform: translateY(2rem);

          @media screen and (max-width: 700px) {
            transform: translateY(1.5rem);
          }
        }
      }

      &.active {
        &:before {
          transform: scale(1.2, 1.2);
        }

        .line:first-child {
          transform: translateY(1.5rem) rotate(45deg);

          @media screen and (max-width: 700px) {
            transform: translateY(1rem) rotate(45deg);
          }
        }

        .line:last-child {
          transform: translateY(1.5rem) rotate(135deg);

          @media screen and (max-width: 700px) {
            transform: translateY(1rem) rotate(135deg);
          }
        }
      }
    }

    #menu {
      height: 100%;
      width: 100%;
      max-width: 100%;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s opacity linear 0s, 0s visibility linear 0.2s;
      pointer-events: none;
      text-align: left;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      justify-content: space-between;
      gap: 0;

      &.active {
        transition: 0.4s opacity linear 0.4s, 0s visibility linear 0s;
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }

      .menu_item {
        @include element_margin(bottom, 2);
        // height: max-content;
        // max-height: max-content;
        width: min-content;

        span:first-child {
          @include font_tiny;
          display: block;
          @include element_margin(bottom);
          color: $lilac;
        }

        p {
          color: $violet;
        }

        ul {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }

      #menu_header {
        width: 100%;
        height: min-content;

        #menu_marquee_container {
          height: max-content;
          @include element_margin(bottom, -1);

          div {
            height: 7.3vw !important;
          }
        }
      }

      #menu_links {
        ul {
          list-style: none;

          li {
            display: inline-block;

            button {
              @include font_big;
              color: $violet;
              transition: 0.2s opacity linear;

              &:hover {
                -webkit-text-stroke: 2px $violet;
                color: transparent;
              }
            }
          }
        }
      }
    }
  }
</style>
