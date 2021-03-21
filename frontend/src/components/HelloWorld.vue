<template>
  <div class="container">
    <h1>Bootstrap starter template</h1>
    <p class="lead">
      <a>Use this document</a> as a way to quickly start any new project.<br/>
      All you get is this text and a mostly barebones HTML document.
    </p>
    <div class="row">
      <div class="card" style="width: 18rem; text-anchor: middle;">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
        </svg>
        <div class="card-body">
          <h5 class="card-title">About</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="/about" class="btn btn-primary">about</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">flex</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="/flex" class="btn btn-primary">flex</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">LESS Menu</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="/lessmenu" class="btn btn-primary">LESS Menu</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <!-- template 에서는 오히려 ~@ 이것은 먹히질 않고 @ 나 ../assets/ 로 해야 정상 동작하네 -->
        <img src="@/assets/images/p_images/slider_01.jpg" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">Flex2</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="/flex2" class="btn btn-primary">Flex2</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <!-- template 에서는 오히려 ~@ 이것은 먹히질 않고 @ 나 ../assets/ 로 해야 정상 동작하네 -->
        <img src="@/assets/images/p_images/gallery_01.jpg" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">nemv</h5>
          <p class="card-text">nemv study</p>
          <a href="/nemv" class="btn btn-primary">nemv</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
