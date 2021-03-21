<template>
  <div id="wrap">
    <b-row>
      <b-col>
        <b-btn variant="info" @click="goToNemvPage">완성페이지</b-btn>
      </b-col>
      <b-col>
        <b-btn variant="primary" @click="goToNemvBoard">게시판</b-btn>
        <b-row>
          <b-col>
            <b-btn variant="info" @click="goToTalkBoard">Talk</b-btn>
          </b-col>
          <b-col>
            <b-btn variant="secondary" @click="goToQnABoard">QnA</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-card-group deck class="m-3">
      <b-card
        header="GET Header"
        title="Title Get"
        img-src="https://placekitten.com/g/400/450"
        img-alt="Kitten Image"
        img-top
      >
        <b-card-text>results:</b-card-text>
        <b-form-textarea v-model="resultsOfGet" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-button @click="sendGet"
                  variant="success">전송</b-button>
        <footer class="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
      </b-card>
      <b-card
        title="Title Post"
        img-src="https://placekitten.com/g/400/450"
        img-alt="Kitten Image"
        img-bottom
      >
        <b-card-text>results:</b-card-text>
        <b-form-textarea v-model="resultsOfPost" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-form-input v-model="txtPostCompanyName" class="mb-3" type="text" placeholder="회사명"></b-form-input>
        <b-form-input v-model="txtPostRemark" class="mb-3" type="text" placeholder="비고"></b-form-input>
        <b-button @click="sendPost"
                  variant="primary">전송</b-button>
        <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
      </b-card>
      <!-- Title Put1 을 없애려면 b-card 에 no-body 속성을 추가해도 된다. -->
<!--      <b-card-->
<!--        no-body-->
<!--        title="Title Put1"-->
<!--        img-bottom-->
<!--      >-->
      <b-card
        title="Title Put1"
        img-bottom
      >
        <template #header>
          <h4 class="mb-0">Put Header</h4>
        </template>

        <b-card-body>
          <b-card-title>Title: Put2 Test</b-card-title>
          <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
          <b-form-textarea v-model="resultsOfPut" class="mb-3"
                           placeholder="이곳에 결과 값이 나옴"
                           :rows="3"
                           :max-rows="6">
          </b-form-textarea>
          <b-button @click="sendPut"
                    variant="warning">전송</b-button>
        </b-card-body>

        <b-list-group flush>
          <b-list-group-item>Cras justo odio</b-list-group-item>
          <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item>Vestibulum at eros</b-list-group-item>
        </b-list-group>

        <b-card-body>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </b-card-body>

        <b-card-footer>This is a footer</b-card-footer>

        <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
      </b-card>
      <b-card header="DELETE">
        <b-form-textarea v-model="resultsOfDel" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-button @click="sendDelete"
                  variant="danger">전송</b-button>
      </b-card>
    </b-card-group>
    <b-card-group columns class="m-3">
      <b-card
        header="GET Header"
        title="Title Get"
        img-src="https://placekitten.com/g/400/450"
        img-alt="Kitten Image"
        img-top
      >
        <b-card-text>results:</b-card-text>
        <b-form-textarea v-model="resultsOfGet" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-button @click="sendGet"
                  variant="success">전송</b-button>
        <footer class="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
      </b-card>
      <b-card
        title="Title Post"
        img-src="https://placekitten.com/g/400/450"
        img-alt="Kitten Image"
        img-right
      >
        <b-card-text>results:</b-card-text>
        <b-form-textarea v-model="resultsOfPost" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-button @click="sendPost"
                  variant="primary">전송</b-button>
        <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
      </b-card>
      <!-- Title Put1 을 없애려면 b-card 에 no-body 속성을 추가해도 된다. -->
            <b-card
              no-body
              title="Title Put1"
              img-bottom
            >
<!--      <b-card-->
<!--        title="Title Put1"-->
<!--        img-bottom-->
<!--      >-->
        <template #header>
          <h4 class="mb-0">Put Header</h4>
        </template>

        <b-card-body>
          <b-card-title>Title: Put2 Test</b-card-title>
          <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
          <b-form-textarea v-model="resultsOfPut" class="mb-3"
                           placeholder="이곳에 결과 값이 나옴"
                           :rows="3"
                           :max-rows="6">
          </b-form-textarea>
          <b-button @click="sendPut"
                    variant="warning">전송</b-button>
        </b-card-body>

        <b-list-group flush>
          <b-list-group-item>Cras justo odio</b-list-group-item>
          <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item>Vestibulum at eros</b-list-group-item>
        </b-list-group>

        <b-card-body>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </b-card-body>

        <b-card-footer>This is a footer</b-card-footer>

        <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
      </b-card>
      <b-card header="DELETE">
        <b-form-textarea v-model="resultsOfDel" class="mb-3"
                         placeholder="이곳에 결과 값이 나옴"
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-button @click="sendDelete"
                  variant="danger">전송</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'nemv',
  data () {
    return {
      debugInfo: 'debugInfo',
      testData: null,
      resultsOfGet: '',
      resultsOfPost: '',
      resultsOfPut: '',
      resultsOfDel: '',
      txtPostCompanyName: '',
      txtPostRemark: ''
    }
  },
  mounted () {
    this.debugInfo = JSON.stringify(this.debugInfo)
    // backend 와 frontend 를 각각 실행시키고 3000번의 backend 로 요청하면 Network error 가 난다.(CORS)
    // yarn build 후 backend 를 실행시키고 하면 잘 된다.
    // 개발시에 발생하는 이러한 문제를 해결하기 위해 frontend 에 proxy 를 설정하거나
    // backend 에 cors 를 사용한다.
    axios.get('/api/test')
      .then((res) => {
        // 실제 데이터는 res.data 에 들어 있다.
        // this.testData = JSON.stringify(res)
        this.testData = JSON.stringify(res.data)
      })
      .catch((err) => {
        this.testData = err.message
      })
  },
  methods: {
    sendGet () {
      axios.get('http://localhost:3000/api/companies', {
        user: 'getTest'
      })
        .then((res) => {
          this.resultsOfGet = JSON.stringify(res.data)
        })
        .catch((e) => {
          this.resultsOfGet = e.message
        })
    },
    sendPut () {
      axios.put('http://localhost:3000/api/companies', {
        user: 'putTest'
      })
        .then((res) => {
          this.resultsOfPut = JSON.stringify(res.data)
        })
        .catch((e) => {
          this.resultsOfPut = e.message
        })
    },
    sendPost () {
      const company = {
        name: this.txtPostCompanyName,
        remark: this.txtPostRemark
      }
      console.log(company)
      axios.post('http://localhost:3000/api/companies', company)
        .then((res) => {
          this.resultsOfPost = JSON.stringify(res.data)
        })
        .catch((e) => {
          this.resultsOfPost = e.message
        })
    },
    sendDelete () {
      axios.delete('http://localhost:3000/api/companies', {
        user: 'delTest'
      })
        .then((res) => {
          this.resultsOfDel = JSON.stringify(res.data)
        })
        .catch((e) => {
          this.resultsOfDel = e.message
        })
    },
    goToNemvPage () {
      this.$router.push('/nemv/exam')
    },
    goToNemvBoard () {
      this.$router.push('/nemv/board')
    },
    goToTalkBoard () {
      this.$router.push('/nemv/board/talk')
    },
    goToQnABoard () {
      this.$router.push('/nemv/board/qna')
    }
  }
}
</script>

<style scoped>

</style>
