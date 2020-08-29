<template>
  <div id="visual_display">
    <div id="media" ref="media">
      <img
        v-for="(track, index) in $store.state.tracks"
        :key="'loop' + index"
        :src="track.loopUrl"
      />
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'VisualAssetDisplay',
  data() {
    return {
      videos: [],
      loops: [],
    };
  },
  methods: {
    createImages() {
      this.loops = this.$refs.media.childNodes;
      console.log(this.loops);
    },
  },
  mounted() {
    this.createImages();
  },
};
</script>

<style lang="scss">
#visual_display {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  img,
  video,
  #media {
    display: none;
  }

  canvas {
    height: 100%;
    width: 100%;
  }
}
</style>
