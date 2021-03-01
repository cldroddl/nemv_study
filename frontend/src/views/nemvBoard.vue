<template>
  <div id="wrap">
    <b-row class="mb-4">
      <b-col cols="6">
        <input type="text" v-model="filter" class="form-control" id="input-text" placeholder="검색 제목">
      </b-col>
      <b-col cols="6">
        <b-form-group class="mb-0" label="Per" horizontal>
          <b-form-select :options="pageOptions" v-model="perPage"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- busy.sync: 데이터 동기화 중 재동기화 방지 -->
    <b-table
      id="tt"
      ref="table"
      show-empty
      stacked="md"
      :items="list"
      :fields="fields"
      :curent-page="currentPage"
      :per-page="perPage"
      :busy.sync="isBusy"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      no-local-sorting
    >
      <!--@sort-changed="sortingChanged"-->
      <!--:no-local-sorting="true"-->
      <!-- row 란 이름으로 정해 주면(slot's scope variable) 내부에서 사용할 때 row 란 이름으로 사용해야 한다. -->
      <!-- data 란 이름을 사용했다면 data.item 이라고 해야 정상 작동. -->
      <!-- 여기서 item 은 b-table 예약어 -->
      <template #cell(_id)="row">
        <b-badge variant="info">
          {{ id2time(row.item._id) }}
        </b-badge>
      </template>
      <template #cell(updateAt)="row">
        <b-badge variant="info">
          {{ ago(row.item.updateAt) }}
        </b-badge>
      </template>
      <template #cell(commentIds)="row">
        <b-badge pill variant="success">
          {{ row.item.commentIds.length }}
        </b-badge>
      </template>
      <template #cell(actions)="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <!-- row.toggleDetail: 해당 row 를 클릭했을 때 아래로 자세한 내용 화면을 토글할 수 있다. -->
        <!-- toggleDetails, detailsShowing 은 slot's scope variable 변수의 멤버이다. -->
        <!-- 참고: https://bootstrap-vue.org/docs/components/table -->
        <b-button size="sm" variant="primary" @click.stop="row.toggleDetails" @click="read(row)">
          {{ row.detailsShowing ? '숨기기' : '보기' }}
        </b-button>
      </template>
      <!-- row-detail: 간단한 카드 상세 -->
      <!-- row-detail 도 정의된 slot 의 id 이다. -->
      <template #row-details="row">
        <b-card no-body
                :title="row.item.title"
        >
          <b-card-body>
            <p class="card-text" style="white-space: pre;">{{row.item.contents}}</p>
          </b-card-body>
          <!-- comment 관련 [[ -->
          <b-list-group flush>
            <b-list-group-item v-for="(cmt) in row.item.commentIds" :key="cmt._id">
              <b-row>
                <b-col cols="2">
                  <b-badge>{{ cmt.id }}</b-badge>
                </b-col>
                <b-col cols="6">
                  <span style="white-space: pre;">  {{ cmt.contents}}</span>
                </b-col>
                <b-col cols="2">
                  <small class="text-muted"> {{ cmt.ip }} | {{ ago(cmt.updateAt) }}</small>
                </b-col>
                <b-col cols="2">
                  <b-button-group class="float-right" size="sm">
                    <b-btn variant="outline-warning" @click="modifyCommentModalOpen(cmt)"><v-icon name="pen"></v-icon></b-btn>
                    <b-btn variant="outline-danger" @click="deleteComment(cmt)"><v-icon name="trash"></v-icon></b-btn>
                  </b-button-group>
                </b-col>
              </b-row>

            </b-list-group-item>
            <b-list-group-item>
              <span> 새 댓글 작성 </span>
              <b-button-group class="float-right" size="sm">
                <b-btn variant="outline-success" @click="addCommentModalOpen(row.item)"><v-icon name="plus"></v-icon></b-btn>
              </b-button-group>
            </b-list-group-item>

          </b-list-group>
          <!-- comment 관련 ]] -->
          <b-card-footer>
            <small class="text-muted">{{ ago (row.item.updateAt) }}</small>
            <b-button-group class="float-right">
              <b-btn variant="outline-warning" @click="modifyBoardModalOpen(row.item)"><v-icon name="pen"></v-icon></b-btn>
              <b-btn variant="outline-danger" @click="del(row.item)"><v-icon name="trash"></v-icon></b-btn>
            </b-button-group>
          </b-card-footer>
        </b-card>
      </template>
    </b-table>
    <!--<b-table id="my-table" show-empty :busy.sync="isBusy" :items="list"></b-table>-->

    <b-row>
      <b-col>
        <b-btn variant="info" @click="refresh">새로고침</b-btn>
        <b-btn variant="success" @click="addBoardModalOpen" >글쓰기</b-btn>
      </b-col>
      <b-col>
        <!-- b-pagination: b-table 과 변수를 같이 쓰기 때문에 데이터 동기화 또한 같이 된다. -->
        <b-pagination
          align="right"
          size="md"
          :total-rows="totalRows"
          v-model="currentPage"
          :per-page="perPage"
        >
        </b-pagination>
      </b-col>
    </b-row>

    <b-modal ref="mdAdd" hide-footer title="새로운 글 작성">
      <b-form @submit="add">
        <b-form-group label="이름:"
                      label-for="board-id">
          <b-form-input id="board-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="홍길동">
          </b-form-input>
        </b-form-group>

        <b-form-group label="제목:"
                      label-for="board-title">
          <b-form-input id="board-title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="아무거나">
          </b-form-input>
        </b-form-group>

        <b-form-group label="글"
                      label-for="board-contents">
          <b-form-textarea id="board-contents"
                           v-model="form.contents"
                           placeholder="재미있는 글"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="primary" class="float-right">글 쓰기</b-btn>
      </b-form>
    </b-modal>

    <b-modal ref="mdMod" hide-footer title="글 수정하기">
      <b-form @submit="mod">
        <b-form-group label="이름:"
                      label-for="board-id">
          <b-form-input id="board-id"
                        type="text"
                        v-model="form.id"
                        required
                        placeholder="홍길동">
          </b-form-input>
        </b-form-group>

        <b-form-group label="제목:"
                      label-for="board-title">
          <b-form-input id="board-title"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="아무거나">
          </b-form-input>
        </b-form-group>

        <b-form-group label="글"
                      label-for="board-contents">
          <b-form-textarea id="board-contents"
                           v-model="form.contents"
                           placeholder="재미있는 글"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="warning" class="float-right">글 수정</b-btn>
      </b-form>

      <!--<div slot="modal-footer">-->
      <!--<b-btn type="submit" class="float-right" variant="primary">저장</b-btn>-->
      <!--</div>-->
    </b-modal>

    <!-- comments 관련 [[ -->
    <b-modal ref="mdAddCmt" hide-footer title="댓글 작성">
      <b-form @submit="addComment">
        <b-form-group label="이름:"
                      label-for="f-a-c-id">
          <b-form-input id="f-a-c-cid"
                        type="text"
                        v-model="formComment.id"
                        required
                        placeholder="홍길동">
          </b-form-input>
        </b-form-group>

        <b-form-group label="글"
                      label-for="f-a-c-contents">
          <b-form-textarea id="f-a-c-contents"
                           v-model="formComment.contents"
                           placeholder="재미있는 글"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="primary" class="float-right">글 쓰기</b-btn>
      </b-form>
    </b-modal>

    <b-modal ref="mdModCmt" hide-footer title="댓글 수정하기">
      <b-form @submit="modifyComment">
        <b-form-group label="이름:"
                      label-for="comment-id">
          <b-form-input id="comment-id"
                        type="text"
                        v-model="formComment.id"
                        required
                        placeholder="홍길동">
          </b-form-input>
        </b-form-group>

        <b-form-group label="글"
                      label-for="comment-contents">
          <b-form-textarea id="comment-contents"
                           v-model="formComment.contents"
                           placeholder="재미있는 글"
                           :rows="10"
                           :max-rows="20">
          </b-form-textarea>
        </b-form-group>

        <b-btn type="submit" variant="warning" class="float-right">글 수정</b-btn>
      </b-form>
    </b-modal>
    <!-- comments 관련 ]] -->
  </div>
</template>

<script>
export default {
  name: 'nemvBoard',
  data () {
    return {
      // 화면에 표시할 헤더 부분(th), sortTable이 true이면 소트 버튼이 나오며 자동 연동 소트가 된다.
      // 이때 소트는 html 요소의 소트 방법에 따라 local 로 할 것인지 프로바이더를 통할 것인지 정할 수 있다.
      fields: [
        {
          key: '_id',
          label: '등록일',
          sortable: true
        },
        // {
        //   key: 'updateAt',
        //   label: '수정날짜',
        //   sortable: true,
        // },
        {
          key: 'id',
          label: '작성자',
          sortable: true
        },
        {
          key: 'title',
          label: '제목',
          sortable: true
        },
        {
          key: 'countOfView',
          label: '조회',
          sortable: true
        },
        {
          key: 'commentIds',
          label: '댓글',
          sortable: true
        },
        {
          key: 'actions',
          label: '내용',
          sortable: true
        }
      ],
      // 데이터를 불러오는 도중 또다른 요청을 막기 위함. true 중일때는 테이블이 회색이 된다. 그러므로 완료 후 꼭 false 가 되어야 한다.
      isBusy: false,
      // 실제 데이터, axios 와 묶여 있는 데이터가 바뀌는 즉시 테이블도 변경된다.
      // 주의할 것은 items 만 바뀐다고 데이터가 변경되는 것은 아니고 fetch 될 ajax 요청 promise 리턴으로 동작한다.
      items: [],
      // 현재 페이지
      currentPage: 1,
      // 한번에 볼 수 있는 row
      perPage: 5,
      totalRows: 0,
      // perPage 할 양
      pageOptions: [5, 10, 15],
      // 소트할 필드명
      sortBy: 'updateAt',
      sortDesc: false,
      // 검색어
      filter: '',
      draw: 0,
      // 글 작성시 데이터
      form: {
        _id: '',
        id: '',
        title: '',
        contents: ''
      },
      formComment: {
        boardId: '',
        _id: '',
        id: '',
        contents: ''
      }
    }
  },
  // props: ['items'],
  mounted () {
    // this.list();
    // this.test();
  },
  computed: {
    setSkip () {
      if (this.currentPage <= 0) return 0
      return (this.currentPage - 1) * this.perPage
    },
    setSort () {
      return this.sortDesc ? -1 : 1
    }
  },
  methods: {
    swalSuccess (msg) {
      return this.$swal({
        icon: 'success',
        title: '성공',
        text: msg,
        timer: 2000
      })
    },
    swalWarning (msg) {
      return this.$swal({
        icon: 'warning',
        title: '실패',
        text: msg,
        timer: 2000
      })
    },
    swalError (msg) {
      return this.$swal({
        icon: 'error',
        title: '에러',
        text: msg,
        timer: 2000
      })
    },
    addBoardModalOpen () {
      this.form._id = ''
      this.form.id = ''
      this.form.title = ''
      this.form.contents = ''
      this.$refs.mdAdd.show()
    },
    modifyBoardModalOpen (v) {
      this.form._id = v._id
      this.form.id = v.id
      this.form.title = v.title
      this.form.contents = v.contents
      this.$refs.mdMod.show()
    },
    addCommentModalOpen (v) {
      this.formComment.boardId = v._id
      this.formComment._id = ''
      this.formComment.id = ''
      this.formComment.contents = ''
      this.$refs.mdAddCmt.show()
    },
    modifyCommentModalOpen (v) {
      this.formComment.boardId = v._id
      this.formComment._id = v._id
      this.formComment.id = v.id
      this.formComment.contents = v.contents
      this.$refs.mdModCmt.show()
    },
    ago (t) {
      return this.$moment(t).fromNow()
    },
    // methods.id2time: mongoDB 는 자체적으로 _id 라는 값을 가지고 있는데
    // 이 _id 중 8개의 스트링은 헥사 스트링으로 시간 정보를 담고 있다.
    // 그래서 등록시간을 굳이 넣지 않고 수정시간만 있으면 된다.
    // 콘텐츠를 표시할 때 style="white-space: pre;"을 주면  \n 등의 리턴이 화면에 표시 된다.
    id2time (_id) {
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    },
    refresh () {
      this.$refs.table.refresh()
    },
    sortingChanged (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      // if (ctx.sortDesc) this.s.order = -1;
      // else this.s.order = 1;
      this.list()
      // console.log(ctx);
    },
    // list(ctx): table 프로바이더로 등록되어 있을 경우 ctx 에 현재 행위에 대한 값이 내려온다. 수신부 프라미스를 리턴하면 된다.
    list (ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      this.isBusy = true
      const p = this.$axios.get('http://localhost:3000/api/board', {
        params: {
          draw: (this.draw += 1),
          search: this.filter,
          skip: this.setSkip,
          limit: this.perPage,
          order: this.sortBy,
          sort: this.setSort
        }
      })
      return p.then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.totalRows = res.data.d.cnt
        this.isBusy = false
        // const items = res.data.d.ds;
        return res.data.d.ds
      })
        .catch((err) => {
          this.isBusy = false
          this.swalError(err.message)
          return []
        })
    },
    read (r) {
      if (r.detailsShowing) return
      const _id = r.item._id
      this.isBusy = true
      this.$axios.get(`http://localhost:3000/api/board/${_id}`)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          r.item.countOfView = res.data.d.countOfView
          r.item.contents = res.data.d.contents
          r.item.commentIds = res.data.d.commentIds
          // console.log(res.data.d);
          // console.log(r.item);
          this.isBusy = false
        })
        .catch((err) => {
          this.isBusy = false
          this.swalError(err.message)
        })
    },
    add (evt) {
      evt.preventDefault()
      this.$axios.post('http://localhost:3000/api/board', this.form)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('글 작성 완료')
        })
        .then(() => {
          this.$refs.mdAdd.hide()
          this.refresh()
        })
        .catch((err) => {
          this.swalError(err.message)
        })
    },
    mod () {
      this.$swal({
        title: '작성한 글을 수정하시겠습니까?',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '수정'
          }
        }
      })
        .then((sv) => {
          if (!sv) throw new Error('')
          return this.$axios.put('http://localhost:3000/api/board', this.form)
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('글 수정 완료')
        })
        .then(() => {
          this.$refs.mdMod.hide()
          this.refresh()
          // this.list(); // todo: instead one article..
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('글 수정 취소')
        })
    },
    del (v) {
      this.$swal({
        title: '글 삭제',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '삭제'
          }
        }
      })
        .then((sv) => {
          if (!sv) throw new Error('')
          return this.$axios.delete('http://localhost:3000/api/board', {
            params: { _id: v._id }
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('글 삭제 완료')
        })
        .then(() => {
          this.refresh()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('글 삭제 취소')
        })
    },
    addComment (evt) {
      evt.preventDefault()
      this.$axios.post('http://localhost:3000/api/comment', this.formComment)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('댓글 추가 완료')
        })
        .then(() => {
          this.$refs.mdAddCmt.hide()
          this.refresh()
        })
        .catch((err) => {
          this.swalError(err.message)
        })
    },
    modifyComment () {
      this.$swal({
        title: '댓글 수정 변경',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '수정'
          }
        }
      })
        .then((res) => {
          if (!res) throw new Error('')
          return this.$axios.put('http://localhost:3000/api/comment', this.formComment)
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('댓글 수정 완료')
        })
        .then(() => {
          this.$refs.mdModCmt.hide()
          this.refresh()
        })
        .catch((err) => {
          if (err.message) this.swalError(err.message)
          else this.swalWarning('댓글 수정 취소')
        })
    },
    deleteComment (cmt) {
      this.$swal({
        title: '댓글 삭제',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '삭제'
          }
        }
      })
        .then((res) => {
          if (!res) throw new Error('')
          return this.$axios.delete('http://localhost:3000/api/comment', {
            params: { _id: cmt._id }
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('댓글 삭제 완료')
        })
        .then(() => {
          this.refresh()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('댓글 삭제 취소')
        })
    }
  }
}
</script>

<style scoped>

</style>
