<template>
  <section id="cover">
    <div class="cover_mask top"></div>

    <div id="cover_titles" data-scroll data-scroll-speed="4">
      <dynamic-marquee
        :speed="{ type: 'pps', number: 100 }"
        :hoverPause="false"
        reverse
      >
        <img src="@/assets/svg/title.svg" alt="" />
      </dynamic-marquee>
    </div>
    <div id="cover_artist">
      <h1>yung</h1>
      <h1>labz</h1>
    </div>
    <div class="cover_mask btm"></div>
  </section>
</template>

<style lang="scss">
  @import '@/scss/_vars.scss';

  #cover {
    height: 100vh;
    width: 100%;
    max-width: 100%;
    grid-column-gap: 3rem;
    align-items: center;
    position: relative;
    background-image: linear-gradient(to top, $dark, $dark_purple);

    #cover_titles {
      @include horiz_padding;
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      pointer-events: all;
      text-align: center;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    #cover_artist {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 40;

      h1 {
        transform: rotate(45deg);
        position: relative;
        z-index: 40;

        &:first-child {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
      }
    }

    .cover_mask {
      position: absolute;
      left: 0;
      height: 9rem;
      width: 100%;
      z-index: 2;

      &.top {
        background-image: linear-gradient(
          to bottom,
          $dark_purple 66%,
          transparent
        );
        top: 0;
      }

      &.btm {
        background-image: linear-gradient(to top, $dark 66%, transparent);
        bottom: 0;
      }
    }
  }
</style>
