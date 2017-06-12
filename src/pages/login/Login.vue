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
                <!--<p class="err-msg">{{photoNum}}</p>-->
                <!--<button v-show="photoErrMsg">获取验证码</button>-->
                <p class="err-msg" v-show="photoErrMsg">{{photoErr}}</p>
                <el-get-code v-show="!photoErrMsg" :photoNum="photoNum" v-on:codeErr = 'codeErr'></el-get-code>
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
        <button @click="goToMyShop" :style="{}" :disabled="!goResult" :class="{'disabled':!goResult}">登录</button>
        <p @click="goToForgotPwd" v-if="loginType=='account'"><span class="">忘记密码</span></p>
      </div>
    </section>
    <footer @click="goToRegister">注册</footer>
  </div>
</template>

<script>
  import GetCode from '@/components/GetCode'
  import md5 from 'blueimp-md5'
  //  import Input from '@/components/Input'
  import { Indicator } from 'mint-ui';
  import {checkUserName} from '@/service/service'
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
        goResult:false,
        photoErr:''
      }
    },
    components:{
        'el-get-code':GetCode,
//      'el-input':Input
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
              if(!value.trim()){
                this.userErrMsg = '输入不能为空'
                this.inputArr[0] = false
                return
              }
                this.userErrMsg = ''
                break
            case 'password':
              if(!value.trim()){
                this.pwdErrMsg = '输入不能为空'
                this.inputArr[1] = false
                return
              }
                this.pwdErrMsg = ''
                this.inputArr[1] = true
                break
            case 'photoNum':
              if(this.reg.photoNum.test(value.trim())){
                this.photoErrMsg = false
                console.log(sessionStorage.getItem('photoNum'))
                if(sessionStorage.getItem('photoNum')!==value.trim() && sessionStorage.getItem('photoNum')!==null){
                  this.codeErrMsg = '手机号码未验证'
                  this.inputArr[2] = false
                }else{
                  this.codeErrMsg = ''
                  this.inputArr[2] = true
                }
              }else{
                this.photoErrMsg = true
                this.inputArr[2] = false
              }
              break;
            case 'msgCode':
              console.log(sessionStorage.getItem('photoNum'))
              if(sessionStorage.getItem('photoNum')!==this.photoNum && sessionStorage.getItem('photoNum')!==null){
                this.codeErrMsg = '手机号码未验证'
                this.inputArr[2] = false
                return
              }else{
                this.inputArr[2] = true
                if(this.reg.msgCode.test(value.trim())){
                  this.codeErrMsg = ''
                  this.inputArr[3] = true
                }else{
                  this.codeErrMsg = '请输入6位验证码'
                  this.inputArr[3] = false
                }
              }
              break
          }
        this.pushRegister()
      },
      inputBlur (type,value) {
          switch (type) {
            case 'userName':
              if(!value.trim()){this.userErrMsg = '输入不能为空'
                this.inputArr[0] = false
                return}
//              if(this.reg.userName.test(value.trim())){
                this.userErrMsg = ''
                Indicator.open('加载中...');
                checkUserName (value).then( res => {
                  Indicator.close();
                  if(!res.data.content){
                    this.userErrMsg = '用户名不存在'
                    this.inputArr[0] = false
                  }else{
                    this.inputArr[0] = true
                    this.userNameMsg=""
                  }
                }).catch(err=>{
                  console.log(err.response);
                  Indicator.close();
                })
//              }else{
//                this.userErrMsg = '用户名不存在'
//                this.inputArr[0] = false
//              }
                break
            case 'password':
              if(!value.trim()){this.pwdErrMsg = '输入不能为空'
                this.inputArr[1] = false
                return}else{
                this.inputArr[1] = true
              }
              this.Md5Pwd = md5(this.password)
              console.log(this.password,this.Md5Pwd)
                break
            case'photoNum':
              if(this.reg.photoNum.test(value.trim())){
                this.photoErr = ''
              }else{
                  this.photoErr = '号码有误'
              }
                break
          }
        this.pushRegister()
      },
      inputFocus () {

      },
      codeErr (value) {
        this.codeErrMsg = value
      },
      pushRegister (){
        if((this.inputArr[0] && this.inputArr[1]) ||(this.inputArr[2] && this.inputArr[3]) ){
          this.goResult = true
        }else{
          this.goResult = false
        }
      },
      goToRegister () {
        this.$router.push({name: 'Register'})
      },
      goToForgotPwd () {
        this.$router.push({name: 'ForgotPwd'})
      },
      goToMyShop () {
        this.$router.push({name: 'MyShop'})
      },
      getResult(value,empty) {}
    },
    mounted () {
      this.reg.userName = new RegExp(/^[A-Za-z0-9_-]{4,}$/) //字母 数字 下划线
      this.reg.photoNum = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)// 手机号码验证
      this.reg.msgCode = new RegExp(/^\d{6}$/)// 6个验证码

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
