<template>
  <div class="register" style="padding: 0">
    <header>登录</header>
    <section class="content">
      <div class="register-logo">
        <!--<img src="../../assets/img/login/logo.png" alt="">-->
      </div>
      <div>
        <ul class="pr cl register-type">
          <li :class="{active:loginType==='account'}" @click="registerType('account')">
            <p>账号密码登录</p>
            <ul class="pa register-input account">
              <li>
                <img src="../../assets/img/login/user.png" alt="">
                <input  type="text" placeholder="请输入用户名"
                        v-on:input="changeInput('userName',$event.target.value)"
                        v-on:blur="inputBlur('userName',$event.target.value)"
                        v-on:focus="inputFocus('userName')"
                        v-model="userName">
                <p class="err-msg">{{userErrMsg}}</p>
                <p class="err-msg" style="color:#008842" v-if="!userErrMsg">{{userNameMsg}}</p>
              </li>
              <li><img src="../../assets/img/login/pwd.png" alt="">
                <input type="password" placeholder="请输入密码" v-model="password"
                       v-on:input="changeInput('password',$event.target.value)"
                       v-on:blur="inputBlur('password',$event.target.value)">
                <p class="err-msg">{{pwdErrMsg}}</p>
              </li>
            </ul>
          </li>
          <li :class="{active:loginType==='tel'}" @click="registerType('tel')">
            <p>手机验证登录</p>
            <ul class="pa register-input phone">
              <li class="security">
                <img src="../../assets/img/login/tel.png" alt="">
                <input  type="tel" maxlength="11" placeholder="请输入手机号"
                        v-on:input="changeInput('photoNum',$event.target.value)"
                        v-on:blur="inputBlur('photoNum',$event.target.value)"
                        v-model="photoNum">
                <p class="err-msg" v-show="photoErrMsg">{{photoErr}}</p>
                <el-get-code v-show="!photoErrMsg" :photoNum="photoNum" type="login" v-on:codeErr = 'codeErr'></el-get-code>
              </li>
              <li><img src="../../assets/img/login/msg.png" alt="">
                <input  type="tel" :maxlength="6" placeholder="请输入验证码"
                        v-on:input="changeInput('msgCode',$event.target.value)"
                        v-on:blur="inputBlur('msgCode',$event.target.value)"
                        v-model="msgCode">
                <p class="err-msg">{{codeErrMsg}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="register-btn">
        <button v-if="loginType==='account'" @click="goToMyShop('account')" :disabled="!goResultAcc" :class="{'disabled':!goResultAcc}">登录</button>
        <button v-if="loginType==='tel'" @click="goToMyShop('tel')" :disabled="!goResultTel" :class="{'disabled':!goResultTel}">登录</button>
        <p @click="goToForgotPwd" v-if="loginType=='account'"><span class="">忘记密码</span></p>
      </div>
    </section>
    <footer @click="goToRegister">注册</footer>
  </div>
</template>

<script>
  import GetCode from '@/components/GetCode'
  import md5 from 'blueimp-md5'
  import { Indicator } from 'mint-ui';
  import {checkUserName, userNameLogin, photoNumberLogin} from '@/service/service'
  export default {
    name: 'register',
    data () {
      return {
        loginType: 'account',
        userName:'',
        password:'',
        photoNum:'',
        msgCode:'',
        userErrMsg:'',
        pwdErrMsg:'',
        photoErrMsg:true,
        codeErrMsg:'',
        userNameMsg:'',
        inputArr:[false,false,false,false],
        reg:{},
        goResultAcc:false,
        goResultTel:false,
        photoErr:'',
        Md5Pwd: ''
      }
    },
    components:{
        'el-get-code':GetCode,
    },
    created(){
    },
    methods: {
      registerType (type) {
        this.loginType = type
      },
      changeInput (type,value) {
          switch (type){
            case 'userName':
              this.userErrMsg = ''
             if(this.nullVerify(value.trim(),0,'userErrMsg')) {
                 return
             }
             break
            case 'password':
              if(this.nullVerify(value.trim(),1,'pwdErrMsg')){
                return
              }
                this.pwdErrMsg = ''
                this.inputArr[1] = true
                this.Md5Pwd = md5(this.password)
                break
            case 'photoNum':
              this.photoVerify(value.trim())
              break;
            case 'msgCode':
              if (this.reg.msgCode.test(value.trim())) {
                this.codeErrMsg = '';
                if (sessionStorage.getItem('photoNum') === this.photoNum) {
                  this.codeErrMsg = ''
                  this.inputArr[3] = true
                } else if(sessionStorage.getItem('photoNum') === null) {
                  this.codeErrMsg = '手机号码未验证'
                  this.inputArr[3] = false
                }else{
                  this.codeErrMsg = '手机号码未验证'
                  this.inputArr[3] = false
                }
              } else {
                this.codeErrMsg = '请输入6位验证码';
                this.inputArr[3] = false
              }
              break
          }
        this.pushRegister()
      },
      inputBlur (type,value) {
          switch (type) {
            case 'userName':
              if(this.nullVerify(value.trim(),0,'userErrMsg')){
                  return
              }
              this.userErrMsg = ''
              this.checkUser(value.trim())
              break
            case 'password':
              if(this.nullVerify(value.trim(),1,'pwdErrMsg')){
                  return
              }
              this.inputArr[1] = true
              break
            case'photoNum':
              this.photoVerify(value.trim())
              break
          }
        this.pushRegister()
      },
      inputFocus () {

      },
      codeErr (value) {
        this.codeErrMsg = value
      },
      nullVerify (value,num,type) {
        if (!value) {this[type] = '输入不能为空';this.inputArr[num] = false;this.pushRegister();return true}
      },
      photoVerify(value){
        if (this.reg.photoNum.test(value)) {
          this.photoErr = ''
          this.photoErrMsg = false
          this.inputArr[2] = true
          if (sessionStorage.getItem('photoNum') === value) {
            this.codeErrMsg = ''
            if (!this.reg.msgCode.test(this.msgCode)) {
              this.codeErrMsg = '请输入6位验证码'
            }else{
              this.codeErrMsg = ''
              this.inputArr[3] = true
            }
          } else if(sessionStorage.getItem('photoNum') === null) {
            this.codeErrMsg = ''
            this.inputArr[3] = false
          }else{
            this.inputArr[3] = false
            this.codeErrMsg = '手机号码未验证'
          }
        } else {
          this.photoErrMsg = true
          this.photoErr = '手机号码有误';
          this.inputArr[2] = false
        }
      },
      checkUser (value) {
        Indicator.open('加载中...');
        checkUserName(value,'NAME').then(res => {
          Indicator.close();
          if (res.data.content) {
            this.userNameMsg = ''
            this.inputArr[0] = true;
            this.pushRegister()
          } else {
            this.userErrMsg = "用户不存在"
            this.inputArr[0] = false;
          }
        }).catch(err => {
          console.log(err.response);
          Indicator.close();
        })
      },
      pushRegister (){
        if((this.inputArr[0] && this.inputArr[1])){
          this.goResultAcc = true
        }else{
          this.goResultAcc = false
        }
        if(this.inputArr[2] && this.inputArr[3]){
          this.goResultTel = true
        }else{
          this.goResultTel = false
        }
      },
      goToRegister () {
        this.$router.push({name: 'Register'})
      },
      goToForgotPwd () {
        this.$router.push({name: 'ForgotPwd'})
      },
      goToMyShop (type) {
        Indicator.open('登录中...');
          if(type==='account'){
            userNameLogin(this.userName,this.Md5Pwd).then(res=>{
              console.log(res)
              localStorage.setItem('userName',this.userName)
              localStorage.setItem('password',this.Md5Pwd)
              sessionStorage.setItem('userID',res.data.content.id)
              this.$router.push({name: 'MyShop'})
              Indicator.close();
            }).catch(err=>{
              console.log(err.response)
              Indicator.close();
            })
          }else{
            photoNumberLogin(this.photoNum,this.msgCode).then(res=>{
              console.log(res)
              sessionStorage.setItem('userID',res.data.id)
              this.$router.push({name: 'MyShop'})
              Indicator.close();
            }).catch(err=>{
              console.log(err.response.data.message)
              this.codeErrMsg = err.response.data.message
              Indicator.close();
            })
          }


      },
      getResult(value,empty) {}
    },
    mounted () {
      this.reg.photoNum = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)// 手机号码验证
      this.reg.msgCode = new RegExp(/^\d{6}$/)// 6个验证码
    },
    destroyed () {
      sessionStorage.removeItem('photoNum')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-btn>button.disabled{
    opacity: .5;
  }
  .active .register-input {
    display: block;
  }
  .register-input {
    width: 100%;
    top: 3.6rem;
    left: 0;
    display: none;
  }
  .register-type > li.active {
    color: #ffffff;
    background-color: #008842;
  }
  .register-type > li {
    width: 50%;
    line-height: 3.6rem;
    height: 3.6rem;
    border-bottom: 1px solid #008842;
    color: #008842;
    background-color: #ffffff;
    font-size: 1.111rem;
  }
  .register-type {
    margin-bottom: 9rem;
  }
  footer{
    height: 4.5rem;
    line-height: 4.5rem;
  }
</style>
