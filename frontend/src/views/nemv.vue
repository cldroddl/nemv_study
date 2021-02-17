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
    <div class="row">
      <div class="form-group col-6">
        <label for="testData">Comment:</label>
        <textarea class="form-control" rows="5" id="testData" v-model="testData"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'nemv',
  data () {
    return {
      debugInfo: 'debugInfo',
      testData: null
    }
  },
  mounted () {
    this.debugInfo = JSON.stringify(this.debugInfo)
    // backend 와 frontend 를 각각 실행시키고 3000번의 backend 로 요청하면 Network error 가 난다.(CORS)
    // yarn build 후 backend 를 실행시키고 하면 잘 된다.
    // 개발시에 발생하는 이러한 문제를 해결하기 위해 frontend 에 proxy 를 설정하거나
    // backend 에 cors 를 사용한다.
    axios.get('http://localhost:3000/api/test')
      .then((res) => {
        // 실제 데이터는 res.data 에 들어 있다.
        // this.testData = JSON.stringify(res)
        this.testData = JSON.stringify(res.data)
      })
      .catch((err) => {
        this.testData = err.message
      })
  }
}
</script>

<style scoped>

</style>
