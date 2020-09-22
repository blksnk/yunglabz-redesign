<template>
  <audio
    aria-hidden="true"
    preload="metadata"
    :src="src"
    ref="audio"
    :title="title"
  ></audio>
</template>

<script>
  export default {
    name: 'AudioPlayer',
    computed: {
      src() {
        return this.$store.state.tracks[this.trackIndex].audioUrl;
      },
      title() {
        return this.$store.state.tracks[this.trackIndex].title;
      },
      trackIndex() {
        return this.$store.state.trackIndex;
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      },
    },
    watch: {
      isPlaying(play) {
        if (play) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      },
    },
    methods: {
      addListener() {
        this.$refs.audio.addEventListener('canplay', () => {
          if (this.isPlaying) {
            this.$refs.audio.play();
          }
        });
        this.$refs.audio.addEventListener('timeupdate', () => {
          this.$store.commit('setCurrentTime', this.$refs.audio.currentTime);
        });
        this.$refs.audio.addEventListener('ended', () => {
          this.$store.commit('setPlayStatus', false);
        });
      },
    },
    mounted() {
      this.addListener();
    },
  };
</script>

<style>
  audio {
    display: none;
    visibility: hidden;
  }
</style>
