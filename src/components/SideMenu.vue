<template>
  <nav id="menu_container">
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

      <div id="menu_items">
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
            Incididunt proident ea reprehenderit aute occaecat est mollit sed
            qui in dolore laborum amet qui ut id adipisicing duis laborum eu.
          </p>
        </div>
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
    z-index: 50;
    text-align: right;
    @include block_padding;

    #menu {
      height: 100%;
      width: 100%;
      max-width: 100%;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s opacity linear 0s, 0s visibility linear 0.2s;
      pointer-events: none;
      text-align: left;
      @include block_padding;
      padding-top: 9rem !important;

      &.active {
        transition: 0.4s opacity linear 0.4s, 0s visibility linear 0s;
        opacity: 1;
        visibility: visible;

        .menu_item {
          pointer-events: all;
        }
      }

      #menu_items {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: space-between;
        gap: 0;
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
          color: $dark;
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
        z-index: 50;
        pointer-events: none;

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
              color: transparent;
              transition: 0.2s opacity linear;
              -webkit-text-stroke: 2px $dark;

              &:hover {
                color: $dark;
              }
            }
          }
        }
      }
    }
  }
</style>
