<template>
  <canvas ref="canvas" id="paper_canvas" resize :key="update"></canvas>
</template>

<script>
  import { wWidth, wHeight, rem } from '@/utils/layout';
  import paper from 'paper';

  export default {
    data() {
      return {
        scope: null,
        circle: null,
        line: null,
        update: 'not uptated',
      };
    },
    computed: {
      images() {
        return this.$store.state.tracks.map((track) => track.visuUrl);
      },
    },
    methods: {
      init() {
        this.scope = new paper.PaperScope();
        this.scope.setup(this.$refs.canvas);
      },
      createLine() {
        this.scope.activate();
        return new paper.Path.Line({
          strokeColor: '#eddedf',
          strokeWidth: 30,
          from: new paper.Point(rem(6), 0),
          to: new paper.Point(wWidth() - rem(6), wHeight()),
        });
      },
      createCircle() {
        this.scope.activate();
        return new paper.Path.Circle({
          center: new paper.Point(wWidth() / 2, wHeight() / 2),
          radius: 30,
          strokeColor: 'black',
        });
      },
    },
    mounted() {
      this.init();
      this.line = this.createLine();
      this.circle = this.createCircle();
      this.scope.view.update();
      console.log(this.scope, this.line);
      this.update = 'updated';
    },
  };
</script>

<style lang="scss">
  #paper_canvas {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 500;
    pointer-events: none;
  }
</style>
