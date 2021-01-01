<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <v-btn :color="btnColor" @click="test">test</v-btn>
    <v-chip v-for="chip in chips" :color="chip.cl" :key="chip.name">{{chip.name}}</v-chip>
  </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      title: 'Vuetify.js',
      btnColor: 'success',
      chips: [
        {
          cl: 'primary',
          name: 'abc'
        },
        {
          cl: 'red',
          name: 'bbb'
        },
        {
          cl: 'green',
          name: 'ccc'
        }
      ]
    }
  },
  methods: {
    test () {
      console.log('test done')
      this.title = 'nnnn'
      this.btnColor = 'warning'
    }
  }
}
</script>

<style scoped>

</style>
