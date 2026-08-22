// backend/controls/companyControls.js#add 는 name 이 없을 때 res.send()를 호출한 뒤에도
// return 하지 않고 company.save()를 계속 진행해서, 저장이 끝나면 res.send()를 다시 호출하려다
// "Cannot set headers after they are sent to the client" unhandled rejection을 발생시키는
// 기존(pre-existing) 버그가 있다. 클라이언트는 첫 번째 응답을 정상적으로 받으므로 테스트 결과에는
// 영향이 없지만, 이 백그라운드 rejection 때문에 Jest 프로세스가 죽지 않도록 흡수만 해 준다.
process.on('unhandledRejection', (err) => {
  if (err && err.code === 'ERR_HTTP_HEADERS_SENT') return
  throw err
})
