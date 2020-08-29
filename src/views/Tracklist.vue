<template>
  <section id="tracklist">
    <h3 id="title">track list</h3>

    <div id="controls">
      <Button
        title="play"
        activeTitle="pause"
        :active="isPlaying"
        @click="playPause"
      />
    </div>

    <div id="counter">
      <div id="current">
        <span class="min">00</span>
        <span class="sec">00</span>
      </div>
      <div id="outof">
        <span id="slash">/</span>
        <span class="min">00</span>
        <span class="sec">00</span>
      </div>
    </div>

    <ul id="list">
      <li
        v-for="(track, index) in tracks"
        :key="'tracktitle' + index"
        :class="{ active: trackIndex === index }"
        @click="() => setTrackIndex(index)"
      >
        {{ track.title }}
      </li>
    </ul>

    <img
      id="img"
      :src="activeTrack.visuUrl"
      :key="'thumb' + trackIndex"
      alt=""
    />

    <audio
      src="/aokigahara.mp3"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="getDuration"
      controls
      ref="audio"
    ></audio>
    <div id="audio_vis" ref="audioVis">
      <av-line
        :line-width="1"
        line-color="#FFFFFF"
        ref-link="audio"
        canv-class="audio-canvas"
        :canv-width="audioSize.width"
        :canv-height="audioSize.height"
      ></av-line>
    </div>
  </section>
</template>

<script>
import Button from '@/components/Button.vue';
import { getDimensions, rem } from '@/utils/layout';

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
    onTimeUpdate() {
      // console.log(e);
      console.dir(this.$refs.audio);
    },
    setAnalyser() {
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      const src = this.audioCtx.createMediaElementSource(
        this.activeTrack.audioUrl,
      );

      src.connect(this.analyser);
      // this.analyser.fftSize = this.fftSize
      this.analyser.connect(this.audioCtx.destination);
    },
    updateCurrentTrack() {
      this.destroyAnalyser();
    },
    destroyAnalyser() {
      if (this.audioCtx) {
        this.audioCtx.suspend();
      }
    },
    onClick() {
      if (!this.audioCtx) this.setAnalyser();
    },
    onPlay() {
      if (!this.audioCtx) this.setAnalyser();
      this.mainLoop();
      if (this.audioCtx) {
        // not defined for waveform
        this.audioCtx.resume();
      }
    },
    onPause() {
      if (this.audioCtx) {
        this.audioCtx.suspend();
      }
    },
    getDuration() {
      this.duration = this.$refs.audio.duration;
    },
    setAudioSize() {
      let { width, height } = getDimensions(this.$refs.audioVis);
      height -= 1.5 * rem();
      width -= 1.5 * rem();
      console.log(width, height);
      this.audioSize = {
        height,
        width,
      };
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
  mounted() {
    this.setAudioSize();
    window.addEventListener('resize', this.setAudioSize);
  },
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

#tracklist {
  display: grid;
  height: 100vh;
  max-height: 100vh;
  background-color: $light_pink;
  border-top: 1px solid $purple;

  grid-template-columns: repeat(5, 1fr) auto auto;
  grid-template-rows: auto 1fr 0.3fr;

  & > * {
    @include block_padding;
  }

  #title {
    grid-column: 1 / span 4;
    grid-row: 1 / span 1;
    border-right: 1px solid $purple;
    border-bottom: 1px solid $purple;
    white-space: nowrap;
  }

  #controls {
    grid-column: 5 / span 2;
    grid-row: 1 / span 1;
    border-right: 1px solid $purple;
    border-bottom: 1px solid $purple;
    width: 100%;
  }

  #counter {
    grid-column: 7 / span 1;
    grid-row: 1 / span 1;
    border-bottom: 1px solid $purple;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    #current {
      display: flex;
      flex-direction: column;
    }

    span {
      font-family: 'compagnie wide';
    }

    #current span {
      @include font_medium;
      color: $purple;
      line-height: 2.5vw;
      margin-top: 0.7vw;
    }

    #outof span {
      @include font_tiny;
      color: $lilac;
    }

    #slash {
      margin: 0 0.5rem;
      color: $black-shadows;
    }
  }

  #list {
    grid-column: 1 / span 3;
    grid-row: 2 / span 1;
    border-right: 1px solid $purple;

    li {
      @include font_medium;
      color: $lilac;
      margin-bottom: 1.3rem;
      text-transform: uppercase;
      transition: 0.2s color linear;

      &.active,
      &:hover {
        color: $purple;
        transition-duration: 0s;
      }
    }
  }

  #img {
    grid-column: 4 / span 4;
    grid-row: 2 / span 1;
    width: 100%;
    max-height: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;
  }

  #audio_vis {
    grid-column: 3 / -1;
    grid-row: 3 / span 1;
    border-top: 1px solid $dark_pink;
    border-left: 1px solid $dark_pink;

    * {
      height: 100%;
      width: 100%;
    }
  }
  audio {
    display: none;
  }
}
</style>
