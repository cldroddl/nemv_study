<template>
  <div class="home container">
    <!-- 여기서는 이미지 경로를 프로젝트 상대 경로로 접근해도 되네??? -->
    <!-- 이렇게 assets 경로에 접근해도 컴파일 후 img 폴더로 변환되고 리소스도 복사된다. -->
    <!-- 그런데 css 에서는 ~@/assets 로 접근해야만 되든데... -->
    <img class="mx-auto d-block" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
