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
    url: url+'/service-api/user/'+loginName
  })
}

let registerVerifyCode = (photoNum) =>{  // 获取注册手机验证码
  return axios({
    method:'POST',
    url: url+'/service-api/register/'+photoNum,
  })
}
let loginVerifyCode = (photoNum) =>{ // 获取登录手机验证码
    return axios({
      method:'POST',
      url: url+'/service-api/login/'+photoNum,
    })
}
let register = (userName,pwd,photo,msgCode,staffId) => { //提交注册
  return axios({
    method:'POST',
    url: url+'/service-api/user',
    data: {
      login: userName,
      loginType: "NAME",
      password: pwd,
      phone: photo,
      referee: staffId,
      verifyCode: msgCode
    }
  })
}
let openShop = (name,phone,idCard,idCardFront,idCardBack,type,userId) => {//申请开店
  return axios({
    method:'POST',
    url: url+'/service-api/merchant',
    data: {
      realName: name,
      phone: phone,
      idCardNo: idCard,
      idCardFront: idCardFront,
      idCardBack: idCardBack,
      merchantType: type,
      userId: userId
    }
  })
}
let userNameLogin  = (userName, password) =>{ //用户名 + 密码登录
  return axios({
    method:'POST',
    url: url+'/service-api/login',
    data: {
      name: userName,
      password: password
    }
  })
}
let photoNumberLogin  = (userName, msgCode) =>{ //手机+验证码登录
  return axios({
    method:'POST',
    url: url+'/service-api/verify-login',
    data: {
      name: userName,
      password: msgCode
    }
  })
}

let updateShopLogo = (base64) =>{ //更新商户LOGO
  return axios({
    method:'PUT',
    url: url + '/service-api/merchant/'+sessionStorage.getItem('shopID')+'/logo',
    data:{
      base64:base64
    }
  })
}
let updateShopName = (shopName) =>{ //更新商户名称
  return axios({
    method:'PUT',
    url: url + '/service-api/merchant/'+sessionStorage.getItem('shopID')+'/name/'+shopName,
  })
}
let updateShopAddress = (addressInfo) =>{ //更新商户地址
  return axios({
    method:'PUT',
    url: url + '/service-api/merchant/'+sessionStorage.getItem('shopID')+'/address/',
    data:addressInfo
  })
}
let updateShopSlogan = (slogan) =>{ //更新商户签名
  return axios({
    method:'PUT',
    url: url + '/service-api/merchant/'+sessionStorage.getItem('shopID')+'/slogan/'+slogan,
  })
}
let getShopInfo = () =>{
  return axios({
    method:'GET',
    url: url + '/service-api/user/'+sessionStorage.getItem('userID')+'/merchant',
  })
}



export {
  getGoodsManageList,
  checkUserName, // 检查用户可用性
  registerVerifyCode, //获取注册手机验证码
  loginVerifyCode, //获取登录手机验证码
  register,//注册
  openShop,//申请开店
  userNameLogin, //用户名 + 密码登录
  photoNumberLogin,//手机+验证码登录
  updateShopLogo,//商户LOGO更新接口
  updateShopName,//更新商户名称
  updateShopAddress,//更新商户地址
  updateShopSlogan,////更新商户签名
  getShopInfo,//获取店铺信息
}
