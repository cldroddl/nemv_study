<template>
  <div class="container">
    <h1>Bootstrap starter template</h1>
    <p class="lead">
      <a>Use this document</a> as a way to quickly start any new project.<br />
      All you get is this text and a mostly barebones HTML document.
    </p>
    <div class="row">
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">About</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/about" class="btn btn-primary">about</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">flex</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/flex" class="btn btn-primary">flex</a>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="Card Image">
        <div class="card-body">
          <h5 class="card-title">LESS Menu</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/lessmenu" class="btn btn-primary">LESS Menu</a>
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
