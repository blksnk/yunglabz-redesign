<template>
  <section id="cover">
    <img
      data-scroll
      data-scroll-speed="1"
      src="@/assets/img/cover.png"
      alt=""
      id="cover_img"
    />
    <div id="container" data-scroll data-scroll-speed="2">
      <h1>meta vol. 1</h1>
      <h4>Yunglabz and Friends</h4>
      <img class="globe" src="@/assets/svg/globe_cover.svg" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Cover',
};
</script>

<style lang="scss">
@import '@/scss/_vars.scss';

#cover {
  height: 100vh;
  width: 100%;
  max-width: 100%;

  display: grid;
  grid-template-rows: auto max-content;
  grid-template-columns: auto;

  #cover_img {
    height: 100%;
    width: 100%;
  }

  #container {
    padding-top: 0;
    // background-color: $light_pink;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1.5rem max-content;
    grid-row-gap: 1.5rem;

    h1 {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }

    h4 {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }

    .globe {
      grid-column: 2 / span 1;
      grid-row: 1 / span 2;
      height: 100%;
      justify-self: end;
    }
  }
}
</style>
