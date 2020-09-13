<template>
  <section
    id="tracks"
    ref="section"
    :style="{ height: sectionHeight, minHeight: sectionHeight }"
  >
    <div
      data-scroll-target="#tracks"
      data-scroll-sticky
      data-scroll
    >
      <TrackVisual />
    </div>

    <div
      id="titles"
      ref="titles"
      data-scroll-target="#tracks"
      data-scroll-sticky
      data-scroll
      :class="{ hide: $store.state.showClip }"
    >
      <div
        v-for="(track, index) in tracks"
        :key="'title' + index"
        data-scroll-speed="8"
        data-scroll-direction="horizontal"
        data-scroll
        :data-scroll-offset="`0%, -${scrollOffset}`"
        :class="{
          title_container: true,
          active: $store.state.scrollIndex === index,
        }"
      >
        <h2
          class="title"
          :data-title="track.title"
          @click="() => onclickTitle(index)"
        >
          {{ track.title }}
        </h2>
        <img
          v-if="index <= titleIcons.length"
          class="icon"
          src="@/assets/svg/globe_cover.svg"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TrackVisual from '@/components/TrackVisual.vue';
import {
  getDimensions,
  numToUnit,
  wHeight,
  wWidth,
  rem,
  // transform,
} from '@/utils/layout.js';

export default {
  name: 'Tracks',
  components: {
    // Counter,
    TrackVisual,
  },
  data() {
    return {
      sectionHeight: '800vw',
      scrollOffset: '300%',
      cx: 720,
      iconWidth: wWidth(9) + rem(3),
    };
  },
  computed: {
    scrollIndex() {
      return this.$store.state.scrollIndex;
    },
    activeTrack() {
      return this.$store.state.tracks[this.scrollIndex];
    },
    titleIcons() {
      return this.$store.state.tracks.slice(
        0,
        this.$store.state.tracks.length - 2,
      );
    },
    tracks() {
      return this.$store.state.tracks;
    },
    indexes() {
      return this.$store.state.tracks.map((t, index) => index);
    },
    dataLoaded() {
      return this.$store.state.dataLoaded;
    },
    layout() {
      return this.$store.state.layout.tracks;
    },
    scroll() {
      return this.$store.state.layout.scroll;
    },
  },
  watch: {
    scrollIndex(next, prev) {
      console.log(prev, '->', next);
    },
    scroll(next, prev) {
      this.computeActiveTrack(next.y < prev.y);
    },
  },
  methods: {
    getSliderWidth() {
      return getDimensions(this.$refs.titles).width;
    },
    getTitleDims() {
      return [...this.$refs.titles.childNodes].map((node) =>
        getDimensions(node),
      );
    },
    computeActiveTrack(reverse) {
      // select next title index based on scroll direction
      const nextIndex = reverse
        ? this.scrollIndex - 1
        : this.scrollIndex + 1;

      // only execute if next title is in range
      if (nextIndex >= 0 && nextIndex < this.indexes.length) {
        // get selected title dimensions
        const { x, right } = getDimensions(
          this.$refs.titles.childNodes[nextIndex],
        );

        // select where to check based on scroll direction
        // compensate for icon width included in title 'right' property
        const check = reverse ? right - this.iconWidth : x + rem(3);
        const offset = 50;

        // check if zone is range of screen center, with 50px offset
        if (
          check <= this.cx + offset &&
          check >= this.cx - offset
        ) {
          // apply scrollIndex change.
          this.$store.commit('setScrollIndex', nextIndex);
        }
      }
    },
    calcDimensions() {
      const titleDims = this.getTitleDims();
      const sectionHeight = this.getSliderWidth();
      const scrollOffset = (sectionHeight / wHeight()) * 100;
      this.sectionHeight = numToUnit(sectionHeight);
      this.scrollOffset = numToUnit(scrollOffset, '%');
      this.cx = wWidth(50);
      this.iconWidth = wWidth(9) + rem(3);

      return {
        sectionHeight,
        scrollOffset,
        titleDims,
      };
    },
    resizeSection() {
      const data = this.calcDimensions();
      console.log(data);

      this.$nextTick(() => {
        this.$store.commit('updateLayoutData', {
          name: 'tracks',
          data,
        });

        this.$nextTick(() => {
          this.$emit('updateLS');
        });
      });
    },
    onclickTitle(index) {
      this.$store.commit('setTrackIndex', index);
      this.$store.commit('setPlayStatus', true);
    },
  },

  mounted() {
    setTimeout(this.resizeSection, 500);
    window.addEventListener('resize', this.resizeSection);
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

#tracks {
  left: 0;
  width: 100%;
  min-height: 800vw;
  height: 800vw;
  position: relative;
  background-image: linear-gradient(to bottom, $dark, $blue);

  #titles {
    top: calc(-100vh);
    position: relative;
    height: 100vh;
    width: max-content;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 30vh;
    pointer-events: none;
    transition: 0.4s opacity linear;
    transition-delay: 0.9s;

    &.hide {
      opacity: 0;
      transition-delay: 0s;
    }

    .title_container {
      padding-left: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      z-index: 2;
      justify-content: space-between;

      .title {
        color: transparent;
        height: max-content;
        letter-spacing: 4px;
        position: relative;
        -webkit-text-stroke: 2px $light_pink;
        z-index: 2;
        transition-duration: 0.4s;
      }

      &.active .title {
        color: $light_pink;
      }

      .icon {
        height: 9vw;
        margin-left: 3rem;
      }
    }
  }

  #counter {
    position: absolute;
    top: calc(100vh - 4rem);
  }
}
</style>
