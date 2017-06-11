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
    url: url+'/user-component/user/'+loginName+'/login-type/NAME'
  })
}
// 获取手机验证码
let verifyPhoto = (photoNum) =>{
  return axios({
    method:'GET',
    url: url+'/user-component/verify/'+photoNum
  })
}
let register = (userName,pwd,photo,msgCode) => { //提交注册
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
let uploadImg = (sourceId,type,flies) => { //图片上传
  return axios({
    method:'POST',
    url: url+'/parameter-component/file/source/'+sourceId+'/type/'+type,
    data: {
      flies:flies
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
