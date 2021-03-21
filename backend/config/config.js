// config.json 으로 만들지 않고 module로 만든 이유는 주석 처리도 가능하고 필요하면 함수도 만들어 사용할 수 있기 때문
module.exports = {
  db: {
    url: 'mongodb://localhost:27017/nemv',  // 제일 끝은 db 명
    // url: 'mongodb://계정:비밀번호@cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017,cluster0-xxx.mongodb.net:27017/nembv?ssl=true&replicaSet=Cluster0-xxx&authSource=admin',
  },
  web: {
    cors: true, // 개발용
  }
}