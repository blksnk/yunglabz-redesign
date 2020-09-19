<template>
  <section id="tracklist" ref="page">
    <div id="aside">
      <span>
        yunglabz &mdash; iterations
        <br />
        prod by sizelem
      </span>
      <div class="line"></div>
    </div>

    <main>
      <div id="controls">
        <div id="info">
          <span id="play_info">current track</span>

          <span id="active_track_title">
            {{ activeTrack.title }}
          </span>
        </div>

        <Button
          id="play_btn"
          title="play"
          activeTitle="pause"
          :active="isPlaying"
          @click="playPause"
        />
        <div id="progress" ref="progress">
          <div id="bar" :style="progressBarStyle"></div>
          <div id="thumb" :style="progressThumbStyle"></div>
        </div>
      </div>

      <ul id="list" data-scroll data-scroll-delay="0.2" data-scroll-speed="1">
        <li
          v-for="(track, index) in tracks"
          :key="'tracktitle' + index"
          :class="{ active: trackIndex === index }"
          @click="() => selectTrack(index)"
        >
          <h3 class="track_title">
            {{ track.title }}
          </h3>

          <span class="artist">{{ formatArtists(track.artistNames) }}</span>

          <span class="track_duration"
            >{{ track.duration.minutes }}:{{ track.duration.seconds }}</span
          >
        </li>
      </ul>
    </main>
    <audio src="/aokigahara.mp3" controls ref="audio"></audio>
  </section>
</template>

<script>
  import Button from '@/components/Button.vue';
  import { getDimensions } from '@/utils/layout';

  export default {
    name: 'Tracklist',
    components: {
      Button,
    },
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
      this.assignProgressWidth();
      this.commitSectionHeight();
      window.addEventListener('resize', () => {
        this.assignProgressWidth();
        this.commitSectionHeight();
      });
    },
  };
</script>

<style lang="scss">
  @import '@/scss/_vars.scss';

  #tracklist {
    @include block_padding;
    display: flex;
    color: $light_pink;
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to bottom, $dark_purple, $blue);

    #aside {
      min-height: calc(100vh - 6rem);
      width: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: sticky;
      top: 0;

      .line {
        width: 2px;
        flex-grow: 1;
        margin-right: 0.5rem;
        background-image: linear-gradient(to bottom, $lilac, $hard_purple);
      }

      span {
        @include font_tiny;
        color: $lilac;
        text-orientation: mixed;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        margin-bottom: 1.5rem;
      }
    }

    main {
      @include block_padding;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      flex: 1;

      #controls {
        margin-top: 6rem;
        margin-bottom: 9rem;
        padding-right: 6rem;
        position: sticky;
        top: 0;
        width: 100%;

        display: grid;
        grid-column-gap: 3rem;
        grid-row-gap: 3rem;
        grid-template-columns: max-content 1fr;
        grid-template-rows: auto 3rem;

        #info {
          grid-column: 1 / -1;
          grid-row: 1 / 1;

          #play_info {
            @include font_tiny;
            display: block;
            margin-bottom: 1.5rem;
            color: $black_shadows;
          }

          #active_track_title {
            @include font_big;
          }
        }

        #play_btn {
          grid-column: 1 / 1;
          grid-row: 2 / 2;
        }

        #progress {
          grid-column: 2 / 2;
          grid-row: 2 / 2;
          position: relative;
          width: 100%;
          height: 1px;
          background-color: $lilac;
          align-self: center;

          #bar {
            position: absolute;
            top: -1.5px;
            left: 0;
            height: 3px;
            background-color: $hard_purple;
            width: 0%;
            transition: 0.1s width linear;
          }

          #thumb {
            position: absolute;
            top: -0.5rem;
            left: -0.5rem;
            height: 1rem;
            width: 1rem;
            border-radius: 1rem;
            transform: translateX(0);
            background-color: $light_pink;
            cursor: grab;
          }
        }
      }
    }

    #list {
      border-bottom: 1px solid $lilac;

      li {
        border-top: 1px solid $lilac;
        padding: 1.5rem 0;
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-rows: auto auto;
        grid-row-gap: 1.5rem;
        width: 100%;
        cursor: pointer;

        .track_title {
          grid-column: 1 / 1;
          grid-row: 1 / 1;
          color: $lilac;
          transition: 0.15s color linear;
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
          grid-row: 1 / 1;
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

    audio {
      display: none;
    }
  }
</style>
