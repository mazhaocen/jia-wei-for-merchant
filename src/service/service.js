/**
 * Created by ma on 2017/5/31.
 */
import axios from 'axios'

// let url = '/mock'
let url = 'http://119.23.209.222:8080'

let getGoodsManageList = () => {
  return axios({
    method: 'get',
    url: url+'/goodsManageList.json',
    data: {
      // firstName: 'Fred',
      // lastName: 'Flintstone'
    }
  })
}
// 检查用户可用性
let checkUserName = (loginName) => {
  return axios({
    method: "GET",
    url: url+'service-api/user/'+loginName
  })
}
// 获取手机验证码
let verifyPhoto = (photoNum) =>{
  return axios({
    method:'GET',
    url: url+'/user-component/verify/'+photoNum
  })
}
let userRealInfo = (idCard,idCardFront,idCardBack,name,phoneNumber) => {
  return axios({
    method:'POST',
    url: url+'/user-component/user',
    data: {
      login: userName,
      loginType: "Name",
      password: pwd,
      phone: photo,
      // msgCode:msgCode
    }
  })
}
let register = (userName,pwd,photo,msgCode,staffId) => { //提交注册
  return axios({
    method:'POST',
    url: url+'/service-api/user',
    data: {
      login: userName,
      loginType: "string",
      password: pwd,
      phone: photo,
      referee: staffId,
      verifyCode: msgCode
    }
  })
}
let uploadImg = (sourceId,type,name,flies) => { //图片上传
  return axios({
    method:'POST',
    url: url+'/parameter-component/file/source/'+sourceId+'/type/'+type+'/name/'+name+'/base64',
    data: {
      fileStr:flies
    }
  })
}
export {
  getGoodsManageList,
  checkUserName, // 检查用户可用性
  verifyPhoto,
  register,
  uploadImg

}
