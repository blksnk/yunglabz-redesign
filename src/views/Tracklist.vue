<template>
  <section id="tracklist">
    <div id="aside">
      <span>
        tracklist
        <br />
        meta volume 1 &mdash; yunglabz
      </span>
      <div id="line"></div>
    </div>

    <main>
      <div id="controls">
        <span id="active_track_title">
          {{ activeTrack.title }}
        </span>

        <Button
          id="play_btn"
          title="play"
          activeTitle="pause"
          :active="isPlaying"
          @click="playPause"
        />
        <div id="progress">
          <div id="bar"></div>
        </div>
      </div>

      <ul id="list">
        <li
          v-for="(track, index) in tracks"
          :key="'tracktitle' + index"
          :class="{ active: trackIndex === index && isPlaying }"
          @click="() => setTrackIndex(index)"
        >
          <h3 class="track_title">
            {{ track.title }}
          </h3>

          <span class="artist">yunglabz</span>

          <span class="track_duration">3:42</span>
        </li>
      </ul>
    </main>
    <audio
      src="/aokigahara.mp3"
      @loadedmetadata="getDuration"
      controls
      ref="audio"
    ></audio>
  </section>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Tracklist',
  components: {
    Button,
  },
  data() {
    return {
      audioSize: {
        width: 0,
        height: 0,
      },
      timestamp: null,
      progress: null,
      playDuration: null,
      duration: null,
      audioCtx: null,
      analyser: null,
    };
  },
  methods: {
    setTrackIndex(index) {
      this.$store.commit('setTrackIndex', index);
    },
    playPause() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.$store.dispatch('playPause');
    },
    getDuration() {
      this.duration = this.$refs.audio.duration;
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
  },
  mounted() {},
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
  padding-bottom: 12rem;

  #aside {
    min-height: calc(100vh - 6rem);
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    #line {
      width: 1px;
      flex-grow: 1;
      margin-right: 0.7rem;
      background-image: linear-gradient(
        to bottom,
        $lilac,
        $hard_purple
      );
    }

    span {
      @include font_tiny;
      color: $lilac;
      text-orientation: mixed;
      writing-mode: vertical-lr;
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
      padding: 6rem;
      position: sticky;
      top: 0;

      display: grid;
      grid-column-gap: 1.5rem;
      grid-row-gap: 3rem;
      grid-template-columns: max-content 1fr;
      grid-template-rows: auto 3rem;

      #active_track_title {
        @include font_big;
        grid-column: 1 / -1;
        grid-row: 1 / 1;

        .marquee_text {
          margin-right: 3rem;
        }
      }

      #play_btn {
        grid-column: 1 / 1;
        grid-row: 2 / 2;
      }

      #progress {
        grid-column: 2 / 2;
        grid-row: 2 / 2;
      }
    }
  }

  #list {
    li {
      border-top: 1px solid $lilac;
      padding: 1.5rem 0;
      display: grid;
      grid-template-columns: 1fr max-content;
      grid-template-rows: auto auto;
      grid-row-gap: 1.5rem;
      width: 100%;

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
