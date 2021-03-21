<template>
  <div id="wrap">
    <header>
      <h1></h1>
      <nav></nav>
    </header>
    <section class="slider_section"></section>
    <section class="gallery_section"></section>
    <section class="rankup_section"></section>
    <section class="latest_post_section"></section>
    <section class="popular_post_section"></section>
    <section class="banner_section">
      <div class="banner_box_01"></div>
      <div class="banner_box_02"></div>
    </section>
    <section class="social_section"></section>
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  name: 'Flex'
}
</script>

<style lang="scss" scoped>
// less 는 @ 를 붙여 변수를 선언하고
// sass 는 $ 를 붙여 변수를 선언한다.
@import "~stylesPath/scss/reset";
$background: #ff6b57;

//* {margin:0; padding:0;}

#wrap{
  display:flex;
  flex-flow:row wrap;
  width:90%;
  margin:0 auto;
}

header {
  display: flex;
  order: 1;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 12.5%;
    height: 142px;
    background: $background;
  }

  nav {
    width: 87.5%;
    min-height: 80px;
    background: $background;
  }
}

.slider_section {
  order: 2;
  width: 50%;
  background: #3c90be;
}

.gallery_section {
  order: 3;
  width: 27.083333333333%;
  height: 440px;
  background: #f8de73;
}

.rankup_section {
  order: 4;
  width: 22.9166666666666667%;
  background: #00d2a5;
}

.latest_post_section {
  order: 5;
  width: 30%;
  background: #9cabe4;
}

.popular_post_section {
  order: 6;
  width: 30%;
  background: #d76817;
}

.banner_section {
  display: flex;
  order: 7;
  flex-flow: column nowrap;
  width: 22.9166666667%;
  div {
    flex: 1 1 0;
    .banner_box_01 {
      background: #0175bb;
    }
    .banner_box_02 {
      background: #1261c9;
    }
  }
}

.social_section {
  order: 8;
  width: 17.08333333333333%;
  height: 270px;
  background: #f36eda;
}

footer {
  order: 9;
  width: 100%;
  height: 94px;
  background: #474747;
}
</style>
