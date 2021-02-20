# nemv_study
### npm i express-generator -g
### express --view=pug backend
### cd backend
### npm i
### DEBUG=backend:* npm start
### cd ..
### npm install -g yarn
### yarn global add @vue/cli
### vue create frontend
### cd frontend
### vue add bootstrap-vue
### vue 에서 build 해서 backend 로 복사해주므로 DEBUG=backend:* yarn start 한 후
### localhost:3000 으로 접속하면 frontend 의 내용이 나와야 한다.
### backend 에서 /api 라우터 추가하고 static 폴더 처리 위에 정의해서 public 폴더 전체 라우터 타도록 수정
### frontend 에서 e404 처리 페이지 및 라우트 추가
### backend 에서 잘못된 url 을 frontend 로 보내 주어 frontend 에서 적절한 처리 하도록
### connect-history-api-fallback 추가하고 static 라우터 위에 history 사용한다고 선언
### cd backend
### yarn connect-history-api-fallback
### frontend 에서 yarn build 후 localhost:3000/zxv 등이 e404.vue 로 잘 처리 되는직 확인
### backend 의 에러 처리 부분은 /api 등 정의된 url 로 갔지만 인자등 내부적인 다른 요인에 의한 에러를 처리 하는데 사용된다
### sass 는 @vue/cli 3.x 의 템플릿으로 만들경우 기본으로 들어 있고 less 는 설치를 해 줘야 한다.
### yarn add less less-loader --dev