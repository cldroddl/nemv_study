// 모델 테스트 용도
// 두 개가 같다.
// $ DEBUG=backend:* yarn start 로 테스트

// company 에 데이터 테스트
const Company = require('./models/companies')
// Group 테스트
const Group = require('./models/groups')

// module.exports.test = {
exports.test = {
  model: () => {
    console.log('모델 테스트')

    const cp = new Company({
      name: '테스트'
    })
    // save()는 추가한 객체를 반환하고 insert()는 성공여부를 반환한다.
    cp.save()
      .then((r) => {
        console.log(r);
      })
      .catch(err => console.error(err))

    // 결과에서 __v 는 mongoose 에서 자동으로 부여하는 필드이다.

    Company.findOne({name: '테스트'})
      .then(r => {
        console.log(r)
      })
      .catch(err => console.error(err))

    // Group 은 꼭 company_id 가 필요하므로 검색 후 사용한다.
    Company.findOne({name: '테스트'})
      .then(company => {
        // 조회값이 없을수도 있으므로 예외처리. promise chain 에서 나갈 때는 꼭 throw 로 보내야 한다.
        // return 할 경우 다음 then 으로 간다.
        if (!company) throw new Error('회사가 존재하지 않음'); // Exception 객체는 없네
        const group = new Group({
          name: '소속1',
          company_id: company._id
        })
        return group.save() // 그룹을 반환해서 ~~~
      })
      .then(group => {  // ~~~ 그룹이 넘어온다. 순차적으로 실행되므로
        console.log(group)
        // array 에 추가는 $addToSet, 값 변경은 $set
        // return Company.updateOne({_id: group.company_id}, {$addToSet: { group_ids: group._id}})
        // updateOne 은 성공여부만 알려주므로 객체를 반환하여 확인용으로 사용하도록 수정
        // findOneAndUpdate 와 옵션 { new: true } 로 갱신된 도큐먼트를 출력
        return Company.findOneAndUpdate({
          _id: group.company_id
        }, {
          $addToSet: { group_ids: group._id }
        }, { new: true
        }).populate('group_ids')
      })
      .then(result => {
        console.log(result)
      })
      .catch(err => console.error(err))
  }
}