<template>
  <section id="tracklist" ref="page">
    <ul id="list">
      <li
        v-for="(track, index) in tracks"
        :key="'tracktitle' + index"
        :class="{
          active: trackIndex === index,
        }"
        @click="() => selectTrack(index)"
      >
        <h3 :class="{ track_title: true, glitch: trackIndex === index }">
          {{ track.title }}
        </h3>

        <span class="artist">{{ formatArtists(track.artistNames) }}</span>

        <span class="track_duration"
          >{{ track.duration.minutes }}:{{ track.duration.seconds }}</span
        >
      </li>
    </ul>
  </section>
</template>

<script>
  import { getDimensions } from '@/utils/layout';

  export default {
    name: 'Tracklist',
    components: {},
    data() {
      return {
        progressWidth: 0,
      };
    },
    methods: {
      setTrackIndex(index) {
        this.$store.commit('setTrackIndex', index);
      },
      selectTrack(index) {
        this.setTrackIndex(index);
        if (!this.$store.state.isPlaying) {
          this.playPause();
        }
      },
      playPause() {
        this.$store.dispatch('playPause');
      },
      formatArtists(names) {
        return names.join(', ');
      },
      assignProgressWidth() {
        this.progressWidth = getDimensions(this.$refs.progress).width;
      },
      commitSectionHeight() {
        const sectionHeight = parseInt(getDimensions(this.$refs.page).height);
        this.$store.commit('updateLayoutData', {
          name: 'list',
          data: {
            sectionHeight,
          },
        });
      },
    },
    computed: {
      trackIndex() {
        return this.$store.state.trackIndex;
      },
      tracks() {
        return this.$store.state.tracks;
      },
      activeTrack() {
        return this.tracks[this.trackIndex];
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      },
      progressPercentage() {
        const { currentTime } = this.$store.state;
        const { total } = this.activeTrack.duration;
        const percentage = (currentTime / total) * 100;
        return percentage;
      },
      progressBarStyle() {
        return { width: `${this.progressPercentage}%` };
      },
      progressThumbStyle() {
        return {
          transform: `translateX(${(this.progressPercentage / 100) *
            this.progressWidth}px)`,
        };
      },
    },
    mounted() {
      // this.assignProgressWidth();
      this.commitSectionHeight();
      window.addEventListener('resize', () => {
        // this.assignProgressWidth();
        this.commitSectionHeight();
      });
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';
  @import '@/scss/_effects.scss';

  #tracklist {
    @include block_padding;
    color: $light_pink;
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-color: $dark;
    padding-bottom: 15rem;

    @media only screen and (max-width: 650px) {
      padding-bottom: 12rem;
    }

    @media only screen and (max-width: 650px) {
      padding-bottom: 9rem;
    }

    #list {
      @include block_padding;

      li {
        border-top: 1px solid $lilac;
        @include element_padding(bottom, 2);
        @include element_padding(top, 2);

        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-rows: auto auto;
        width: 100%;
        cursor: pointer;

        .track_title {
          grid-column: 1 / -1;
          grid-row: 1 / 1;
          color: $light_pink_semi;
          transition: 0.15s color linear;
          @include element_margin(bottom, 0.5);
        }

        .artist {
          grid-column: 1 / 1;
          grid-row: 2 / 2;
          @include font_tiny;
          color: $purple;
          transition: 0.15s color linear;
        }

        .track_duration {
          grid-column: 2 / 2;
          grid-row: 2 / 2;
          @include font_tiny;
          color: $purple;
          transition: 0.15s color linear;
        }

        &:hover .track_title,
        &.active .track_title {
          color: $light_pink;
        }

        &:hover .artist,
        &:hover .track_duration,
        &.active .artist,
        &.active .track_duration {
          color: $lilac;
        }
      }
    }
  }
</style>
