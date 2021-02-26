<template>
  <div id="wrap">
    <b-row class="mb-4">
      <b-col cols="4">
        <input type="text" v-model="keyword" class="form-control" id="input-text" placeholder="회사 검색">
      </b-col>
      <b-col>
      </b-col>
    </b-row>
    <!-- 주로 버튼 등의 액션이 있을때 알림용인데 데이터 없을때 사용해 봄 -->
    <b-alert variant="warning" show v-if="!d.dataSet.length">
      <!-- 아이콘명 참조: https://fontawesome.com/icons -->
      <h4><v-icon name="info"></v-icon> 새로 시작하셨나 봐요 회사가 하나도 없네요</h4>
      <p>회사추가를 눌러서 시작하세요!</p>
    </b-alert>
    <b-card-group deck class="mb-3" v-else>
      <!-- no-body 는 패딩없이 내용이 담기나 b-card-body 는 no-body 로부터 자유롭다 -->
      <b-card no-body
              v-for="(v, i) in d.dataSet"
              :sub-title="v.remark"
              :key="v._id">
        <b-card-header>
          <h4>{{ v.name }}</h4>
        </b-card-header>
        <b-card-body>
          <p class="card-text">{{v.remark}}</p>
          <!-- gmap-map: google map canvas -->
          <gmap-map
            :id="'map' + i.toString()"
            :center="v.pos"
            :zoom="16"
            style="height: 200px">
            <!-- gmap-marker, gmap-circle 는 gmap-map 하위에서 동작하고 좌표만 넣으면 찍힌다. -->
            <gmap-marker :position="v.pos" :icon="markerIcon"></gmap-marker>
            <gmap-circle
              :center="v.pos"
              :radius="100"
              :options="circleOptions"
            ></gmap-circle>
            <!--<gmap-marker v-for="(w, j) in v.sgr_ids" :key="w._id" v-for="(x, k) in w.sdv_ids" :key="x._id" :position="x.r.pos" :icon="markerIcon"></gmap-marker>-->
          </gmap-map>
        </b-card-body>
        <!--<b-list-group flush>-->
        <!--<b-list-group-item v-for="(w, j) in v.group_ids" :key="w._id" class="d-flex justify-content-between align-items-center">-->
        <!--<span> {{ w.name }} </span>-->
        <!--</b-list-group-item>-->
        <!--</b-list-group>-->

        <!-- flush 는 테두리 없이 카드에 붙는다. 전체 영역 사용 -->
        <b-list-group flush>
          <b-list-group-item v-for="(gr) in v.group_ids" :key="gr._id">
            <span> {{ gr.name }} </span>
            <b-button-group class="float-right" size="sm">
              <b-btn variant="outline-warning" @click="modGr(gr)"><v-icon name="flag"></v-icon></b-btn>
              <b-btn variant="outline-danger" @click="delGr(gr)"><v-icon name="trash"></v-icon></b-btn>
            </b-button-group>
          </b-list-group-item>
          <b-list-group-item>
            <span> 새그룹 추가 </span>
            <b-button-group class="float-right" size="sm">
              <b-btn variant="outline-success" @click="addGroup(v)"><v-icon name="plus"></v-icon></b-btn>
            </b-button-group>
          </b-list-group-item>

        </b-list-group>

        <b-card-footer>
          <p>
            <small class="text-muted">{{ ago(v.ut) }}</small>
            <b-button-group class="float-right">
              <b-btn variant="outline-warning" @click="modalOpen(v)"><v-icon name="pen"></v-icon></b-btn>
              <b-btn variant="outline-danger" @click="del(v)"><v-icon name="trash"></v-icon></b-btn>
            </b-button-group>
          </p>
        </b-card-footer>
      </b-card>
    </b-card-group>

    <b-row>
      <b-col>
        <b-btn variant="info" @click="list">새로고침</b-btn>
        <b-btn variant="success" @click="add" >회사 추가</b-btn>
      </b-col>
      <b-col>
        <!-- paging 을 위한 바인드 부분을 채워주면 알아서 동작 -->
        <b-pagination align="right" size="md" @input="list" :total-rows="d.cnt" v-model="page" :per-page="s.limit">
        </b-pagination>
      </b-col>
    </b-row>
    <!-- modal 레퍼런스를 만들어 두고 모달을 위한 변수로 핸들링 -->
    <b-modal ref="mdRef" :title="md.set.name">
      <b-row class="mb-2">
        <b-col>
          <b-input-group prepend="회사 이름">
            <b-form-input type="text" v-model="md.set.name"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col>
          <b-input-group prepend="설명">
            <b-form-input type="text" v-model="md.set.remark"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <gmap-map
        :center="md.set.pos"
        :zoom="12"
        style="height: 200px"
        @click="mdSetPos">
        <gmap-marker :position="md.set.pos"></gmap-marker>
      </gmap-map>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="mod(md.set)">
          저장
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'company',
  data () {
    return {
      page: 1,
      keyword: '',
      // 서버에 페이징으로 전달할 값들
      s: {
        draw: 0,
        skip: 0,
        limit: 3,
        order: 'name',
        sort: 1
      },
      // 수신된 데이터
      d: {
        draw: 0,
        cnt: 0,
        dataSet: []
      },
      // model 에서 사용할 데이터
      md: {
        set: {
          _id: '',
          name: '',
          remark: '',
          pos: {
            lat: 37,
            lng: 127
          }
        }
        // name: 'def',
      },
      // 기본 아이콘이 못생겨서 바꿈
      markerIcon: {
        path: this.$fam.BUILDING_O,
        scale: 0.4,
        strokeWeight: 0.0,
        strokeColor: 'black',
        strokeOpacity: 1,
        fillColor: '#3276B1',
        fillOpacity: 0.9
      },
      // 옵션 안주면 검정색 원
      circleOptions: {
        strokeColor: '#1cc3ff',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#99fdff',
        fillOpacity: 0.35
      }
    }
  },
  mounted () {
    this.list()
  },
  computed: {
    // page 는 1부터 시작하지만 디비 입장에선 offset 은 0 부터 줘야 하기 때문에 간단한 계산으로 ...
    setSkip () {
      if (this.page <= 0) return 0
      return (this.page - 1) * this.s.limit
    }
  },
  methods: {
    swalSuccess (msg) {
      return this.$swal({
        icon: 'success',
        // button: false,
        title: '성공',
        text: msg,
        timer: 5000
      })
    },
    swalWarning (msg) {
      return this.$swal({
        icon: 'warning',
        // button: false,
        title: '실패',
        text: msg,
        timer: 5000
      })
    },
    swalError (msg) {
      return this.$swal({
        icon: 'error',
        // button: false,
        title: '에러',
        text: msg,
        timer: 5000
      })
    },
    modalOpen (v) {
      this.md.set = v
      this.$refs.mdRef.show()
    },
    ago (t) {
      return this.$moment(t).fromNow()
    },
    mdSetPos (m) {
      this.md.set.pos = m.latLng
    },
    list () {
      this.$axios.get('http://localhost:3000/api/companies', {
        params: {
          draw: (this.s.draw += 1),
          keyword: this.keyword,
          offset: this.setSkip,
          limit: this.s.limit,
          order: this.s.order,
          sort: this.s.sort
        }
      })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          this.d = res.data.result
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('리스트를 불러올 수 없습니다.')
        })
    },
    add () {
      this.$swal({
        title: '회사 추가',
        content: 'input',
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '추가'
          }
        }
      })
        .then((res) => {
          if (!res) throw new Error('')
          return this.$axios.post('http://localhost:3000/api/companies', {
            name: res
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('회사 추가 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('회사 이름을 입력하세요')
        })
    },
    del (v) {
      this.$swal({
        title: '회사 삭제',
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
          return this.$axios.delete('http://localhost:3000/api/companies', {
            params: { id: v._id }
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('회사 삭제 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('회사 삭제 취소')
        })
    },
    mod (v) {
      this.$swal({
        title: '회사 정보 변경',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '변경'
          }
        }
      })
        .then((sv) => {
          if (!sv) throw new Error('')
          return this.$axios.put('http://localhost:3000/api/companies', {
            _id: v._id,
            name: v.name,
            remark: v.remark,
            pos: v.pos
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          this.$refs.mdRef.hide()
          return this.swalSuccess('회사 정보 변경 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('회사 정보 변경 취소')
        })
    },
    addGroup (cp) {
      this.$swal({
        title: '그룹 추가',
        content: {
          element: 'input',
          attributes: {
            placeholder: '선릉'
          }
        },
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '추가'
          }
        }
      })
        .then((res) => {
          if (!res) throw new Error('') // return; // swal('취소됨');
          return this.$axios.post('http://localhost:3000/api/groups', {
            name: res,
            company_id: cp._id
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('그룹 추가 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('그룹 이름을 입력하세요')
        })
    },
    modGr (gr) {
      this.$swal({
        title: '그룹 이름 변경',
        // dangerMode: true,
        content: {
          element: 'input',
          attributes: {
            placeholder: '소속1',
            value: gr.name
          }
        },
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            className: 'red-bg',
            text: '변경'
          }
        }
      })
        .then((res) => {
          if (!res) throw new Error('')
          return this.$axios.put('http://localhost:3000/api/groups', {
            _id: gr._id,
            name: res
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('그룹 변경 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) this.swalError(err.message)
          else this.swalWarning('그룹 변경 취소')
        })
    },
    delGr (gr) {
      this.$swal({
        title: '그룹 삭제',
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
          return this.$axios.delete('http://localhost:3000/api/groups', {
            params: { _id: gr._id }
          })
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('그룹 삭제 완료')
        })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('그룹 삭제 취소')
        })
    }
  },
  watch: {
    search () {
      // this.inputSync();
      this.list()
    }
  },
  destroyed () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
