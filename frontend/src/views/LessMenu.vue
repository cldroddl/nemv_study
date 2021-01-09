<template>
  <div>
    <nav>
      <ul>
        <li><a href="#">홈</a></li>
        <li><a href="#">웹 디자인</a></li>
        <li><a href="#">포토샵</a></li>
        <li><a href="#">제이쿼리</a></li>
        <li><a href="#">HTML</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LessMenu'
}
</script>

<style lang="less" scoped>
// less 는 @ 를 붙여 변수를 선언하고
// sass 는 $ 를 붙여 변수를 선언한다.
@baseColor: #fff;
@bgColor: #f2f2f2;
@colorDDD: #ddd;
@borderColor: #ccc;
@textColor: #333;
@hoverColor: blue;
@Border: 1px solid @borderColor;

* {
  margin: 0;
  padding: 0;
}

div {
  background-color: @bgColor;
  color: @textColor;
  width: 960px;
  margin: 10px auto;
}

nav {
  background: @baseColor;
  border: @Border;
  border-radius: 5px;
  height: 40px;
  ul {
    list-style: none;
  }
}

</style>
