<template>
  <div>
    <div>
      <header>
        <h1><a href="javascript:void(0);">Less is more</a></h1>
      </header>
      <nav>
        <ul>
          <li><a href="javascript:void(0);">홈</a></li>
          <li><a href="javascript:void(0);">웹디자인</a></li>
          <li><a href="javascript:void(0);">포토샵</a>
            <ul>
              <li><a href="javascript:void(0);">사진효과</a></li>
              <li><a href="javascript:void(0);">필터효과</a>
                <ul>
                  <li><a href="javascript:void(0);">사진효과</a></li>
                  <li><a href="javascript:void(0);">필터효과</a></li>
                  <li><a href="javascript:void(0);">애니메이션</a></li>
                  <li><a href="javascript:void(0);">글자효과</a>
                    <ul>
                      <li><a href="javascript:void(0);">사진효과</a></li>
                      <li><a href="javascript:void(0);">필터효과</a></li>
                      <li><a href="javascript:void(0);">애니메이션</a></li>
                      <li><a href="javascript:void(0);">글자효과</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="javascript:void(0);">애니메이션</a></li>
              <li><a href="javascript:void(0);">글자효과</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);">제이쿼리</a></li>
          <li><a href="javascript:void(0);">HTML/CSS</a>
            <ul>
              <li><a href="javascript:void(0);">HTML</a></li>
              <li><a href="javascript:void(0);">HTML5aaaaaaaaaaaaaaa</a></li>
              <li><a href="javascript:void(0);">CSS</a></li>
              <li><a href="javascript:void(0);">CSS3</a></li>
            </ul>
          </li>
        </ul>

      </nav>

    </div>

    <div class="box-bg color1"></div>
    <div class="box-bg color2"></div>
    <div class="box-bg color3"></div>
    <div class="box-bg color4"></div>
    <div class="box-bg color5"></div>
    <div class="box-bg color6"></div>
    <div class="box-bg color7"></div>
    <div class="box-bg color8"></div>
    <div class="box-bg color9"></div>
    <div class="box-bg color10"></div>
    <div class="box-bg color11"></div>
    <div class="box-bg color12"></div>
    <div class="box-bg color13"></div>
    <div class="box-bg color14"></div>

    <div class="box-bg2">
      <p>안녕하세요. 저희 사이트에 오신 것을 환영합니다. 이번주부터 사은행사가 있으니 많은 참여를 부탁드립니다.</p>
    </div>

    <div id="gradient-bg">
      <p>안녕하세요. 저희 사이트에 오신 것을 환영합니다. 이번주부터 사은행사가 있으니 많은 참여를 부탁드립니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessMenu'
}
</script>

<style lang="less" scoped>
@import url("http://fonts.googleapis.com/earlyaccess/nanumgothic.css");
//@import '/src/assets/styles/less/variables';  // 이것도 가능
//@import '/src/assets/styles/less/mixins';     // 이것도 가능
@import 'stylesPath/less/variables'; // ~ 없이도 정상 동작
@import '~stylesPath/less/mixins';
// less 는 @ 를 붙여 변수를 선언하고
// sass 는 $ 를 붙여 변수를 선언한다.
// 여기서 * 는 이 페이지의 모든 요소를 의미한다.
// 페이지 생성시 임의의 data- 속성을 제일 상위의 요소에 생성하고
// 하위 모든 요소에서도 그 속성을 가지도록 생성되므로
// 하위 모든 요소들을 의미할 수 있다.
* {
  .Nanum;
  .BGC;
  .TC;
  //width: 960px;
  //margin: 10px auto;
}

nav {
  background: @basecolor;
  .BW-gradient(#dddddd, 220, 255);
  .Border(5px, #777);
  .BR(10px) ;
  height: 40px;

  ul {
    list-style: none;
  }

  li {
    display: inline;
    position: relative;
    float: left;

    a {
      display: inline-block;
      float: left;
      .TextShadow(2px 2px 2px rgba(0, 0, 0, 0.5)) ;
      text-decoration: none;
      line-height: 40px;
      padding: 0 20px;
      color: spin(hsl(hue(@textColor), 45%, 60%), 180);

      &:hover {
        color: @hoverColor;
        color: @colorDDD;
        background: @textColor;
      }
    }

    ul {
      display: none;
      position: absolute;
      top: 40px;
      .BR;
      background: @basecolor;
      border: @Border;
      border-top: none;

      li {
        a {
          width: 120px;
        }

        ul {
          display: none;
        }

        &:hover & > ul {
          display: block;
          top: 0;
          left: 100%;
          border: @Border;
        }
      }
    }

    &:hover & > ul {
      display: block;
    }
  }
}

.box-bg {
  height: 40px;
  margin: 10px;
}

</style>
