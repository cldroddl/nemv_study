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
    list-style: none; // none 으로 li 태그의 블릿 제거
    li {
      // 수평형 메뉴 만드는 규칙
      display: inline;  // inline 으로 아래로 나오는 li 들을 옆으로 나오게
      a {
        display: inline-block;
        float: left;
        text-decoration: none;  // 밑줄 제거
        line-height: 40px;    // nav 의 높이를 사용해서 텍스트가 중앙에 정렬 되도록...
        padding: 0 20px;      // 좌우 패딩을 2필셀씩 적용해서 다른 텍스트와 일정한 간격 유지
        color: @textColor;
        &:hover { // & 는 부모 요소를 의미
          color: @hoverColor;
        }
      }
    }
  }
}

</style>
