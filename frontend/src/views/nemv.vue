<template>
  <div id="wrap">
    <div class="row">
      <div class="col-4 bg-success">.col-4<br/>aaa<br/>bbb<br/>Equal Height</div>
      <div class="col-4 bg-warning">.col-4</div>
      <div class="col-4 bg-success">.col-4</div>
    </div>
    <div class="row no-gutters">
      <div class="col-4 bg-success">.col-4<br/>aaa<br/>bbb<br/>Equal Height</div>
      <div class="col-4 bg-warning">.col-4</div>
      <div class="col-4 bg-success">.col-4</div>
    </div>
    <div class="row">
      <div class="form-group col-6">
        <label for="comment">Comment:</label>
        <textarea class="form-control" rows="5" id="comment" v-model="debugInfo"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nemv',
  data () {
    return {
      debugInfo: 'debugInfo'
    }
  },
  mounted () {
    this.debugInfo = JSON.stringify(this.debugInfo)
    console.log('page start')
  }
}
</script>

<style scoped>

</style>
