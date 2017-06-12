<template>
  <div class="register" style="padding: 0">
    <header>注册</header>
    <section class="content" style="padding-bottom: 0">
      <div style="margin-top: 2rem">
        <ul class=" register-input account cl">
          <li>
            <img src="../../assets/img/login/user.png" alt="">
            <input type="text" placeholder="请输入用户帐号" :maxlength="30"
                   v-on:input="changeInput('userName',$event.target.value)"
                   v-on:blur="inputBlur('userName',$event.target.value)"
                   v-model="userName">
            <p class="err-msg">{{userErrMsg}}</p>
            <p class="err-msg" style="color:#008842" v-if="!userErrMsg">{{userNameMsg}}</p>
          </li>
          <li>
            <img src="../../assets/img/login/pwd.png" alt="">
            <input type="password" placeholder="请输入6位以上用户密码"
                   v-on:input="changeInput('password1',$event.target.value)"
                   v-on:blur="inputBlur('password1',$event.target.value)"
                   v-model="password1">
            <p class="err-msg">{{pwdErrMsg1}}</p>
          </li>
          <li>
            <img src="../../assets/img/login/pwd.png" alt="">
            <input type="password" placeholder="请输入相同密码"
                   v-on:input="changeInput('password2')"
                   v-on:blur="inputBlur('password2',$event.target.value)"
                   v-model="password2">
            <p class="err-msg">{{pwdErrMsg2}}</p>
          </li>
          <li class="security">
            <img src="../../assets/img/login/tel.png" alt="">
            <input type="tel" maxlength="11" placeholder="请输入手机号"
                   v-on:input="changeInput('photoNum',$event.target.value)"
                   v-on:blur="inputBlur('photoNum',$event.target.value)"
                   v-model="photoNum">
            <p class="err-msg">{{photoErrMsg}}</p>
            <!--<button v-show="photoErrMsg">获取验证码</button>-->
            <el-get-code v-show="inputArr[3]" :photoNum="photoNum" v-on:codeErr='codeErr'></el-get-code>
          </li>
          <li>
            <img src="../../assets/img/login/msg.png" alt="">
            <input type="tel" maxlength="6" placeholder="请输入验证码"
                   v-on:input="changeInput('msgCode',$event.target.value)"
                   v-on:blur="inputBlur('msgCode',$event.target.value)"
                   v-on:focus="inputFocus('msgCode')"
                   v-model="msgCode">
            <p class="err-msg">{{codeErrMsg}}</p>
          </li>
          <li>
            <img src="../../assets/img/login/user.png" alt="">
            <input type="text" placeholder="请输入推广人工号">
          </li>
        </ul>
      </div>
      <div class="register-btn">
        <!--<button @click="goToNewShop" :disabled="!goResult" :class="{disabled:!goResult}">注册</button>-->
        <button @click="goToNewShop">注册</button>
        <p @click="goToLogin"><!--<span class="fl">注册</span>--><span class="">已有账号 登录</span></p>
      </div>
    </section>
  </div>
</template>

<script>
  import md5 from 'blueimp-md5'
  import GetCode from '@/components/GetCode'
  import Input from '@/components/Input'
  import {Indicator} from 'mint-ui';
  import {checkUserName, register} from '@/service/service'
  export default {
    name: 'register',
    data () {
      return {
        loginType: 'account',
        userName: '',
        password1: '',
        password2: '',
        photoNum: '',
        msgCode: '',
        userNameMsg: '',
        goResult: false,
        userErrMsg: '',
        pwdErrMsg1: '',
        pwdErrMsg2: '',
        photoErrMsg: '' ,
        codeErrMsg: '',
        reg: {},
        inputArr: [false, false, false, false, false],
        Md5Pwd: ''
      }
    },
    components: {
      'el-get-code': GetCode,
    },
    created(){

    },
    methods: {
      changeInput(type, value){
        switch (type) {
          case 'userName':
            this.userNameMsg = '';
            this.userErrMsg = '';
            if (!value.trim()) {
              this.userErrMsg = '输入不能为空';
              this.inputArr[0] = false;
              return
            }
            break;
          case 'password1':
            this.pwdErrMsg1 = '';
            if (!value.trim()) {
              this.pwdErrMsg1 = '输入不能为空';
              this.inputArr[1] = false;
              return
            }
            if (this.reg.password.test(value)) {
              this.pwdErrMsg1 = '';
              this.inputArr[1] = true;

              if (this.password1 !== this.password2) {
                this.pwdErrMsg2 = '请输相同密码';
                this.inputArr[2] = false
              } else {
                this.pwdErrMsg2 = '';
                this.inputArr[2] = true;
                this.Md5Pwd = md5(this.password1)
              }
            } else {
              this.inputArr[1] = false;
//              this.pwdErrMsg1 = '请输6位以上密码'
            }
            break;
          case 'password2':
            if (this.password1 === this.password2) {
              this.pwdErrMsg2 = '';
              this.inputArr[2] = true;
              this.Md5Pwd = md5(this.password2)
            } else {
              this.pwdErrMsg2 = '请输相同密码';
              this.inputArr[2] = false
            }
            break;
          case 'photoNum':
              this.photoErrMsg = '';
            if (this.reg.photoNum.test(value.trim())) {
              this.photoErrMsg = '';
              this.inputArr[3] = true;
              console.log(sessionStorage.getItem('photoNum'));
              if (sessionStorage.getItem('photoNum') === value.trim()) {
                this.codeErrMsg = ''
              } else if(sessionStorage.getItem('photoNum') === null) {
                this.codeErrMsg = ''
              }else{
                this.codeErrMsg = '手机号码未验证'
              }
            } else {
              this.inputArr[3] = false
            }
            break;
          case 'msgCode':
            if (this.reg.msgCode.test(value.trim())) {
              this.codeErrMsg = '';
              if (sessionStorage.getItem('photoNum') === this.photoNum) {
                this.codeErrMsg = ''
                this.inputArr[4] = true
              } else if(sessionStorage.getItem('photoNum') === null) {
                this.codeErrMsg = '手机号码未验证'
                this.inputArr[4] = false
              }else{
                this.codeErrMsg = '手机号码未验证'
                this.inputArr[4] = false
              }
            } else {
              this.codeErrMsg = '请输入6位验证码';
              this.inputArr[4] = false
            }
            break
        }
        this.pushRegister()
      },
      inputBlur(type, value){
        switch (type) {
          case 'userName':
            if (!value.trim()) {
              this.userErrMsg = '输入不能为空';
              this.inputArr[0] = false;
              return
            }
            this.userErrMsg = '';
            this.inputArr[0] = true;
            Indicator.open('加载中...');
            checkUserName(value,'NAME').then(res => {
              Indicator.close();
              if (res.data.content) {
                this.userErrMsg = '用户名已经存在'
                this.inputArr[0] = false;
              } else {
                this.userNameMsg = "用户可用"
              }
            }).catch(err => {
              console.log(err);
              Indicator.close();
            })
            break;
          case 'password1':
            if (!value.trim()) {
              this.pwdErrMsg1 = '输入不能为空';
              this.inputArr[1] = false
              return
            }
            if (this.reg.password.test(value)) {
              this.pwdErrMsg1 = '';
              this.inputArr[1] = true;

              if (this.password1 !== this.password2) {
                this.pwdErrMsg2 = '请输相同密码';
                this.inputArr[2] = false
              } else {
                this.pwdErrMsg2 = '';
                this.inputArr[2] = true;
                this.Md5Pwd = md5(this.password1)
              }
            } else {
              this.inputArr[1] = false;
              this.pwdErrMsg1 = '请输6位以上密码'
            }
            break;
          case 'password2':
            if (this.password1 !== this.password2) {
              this.pwdErrMsg2 = '请输相同密码';
              this.inputArr[2] = false
            }
            break;
          case'photoNum':
            if (!value.trim()) {
              this.photoErrMsg = '手机号不能为空';
              this.inputArr[3] = false;
              return
            }
            if (this.reg.photoNum.test(value.trim())) {
              this.photoErrMsg = '';
              this.inputArr[3] = true;
            } else {
              this.photoErrMsg = '手机号码不存在';
              this.inputArr[3] = false
            }
              break
          case 'msgCode':
            if (!this.reg.msgCode.test(value.trim())) {
              this.codeErrMsg = '请输入6位验证码';
              this.inputArr[4] = false
            }
            break
        }
        this.pushRegister()
      },
      inputFocus(type){
      },
      goToLogin () {
        this.$router.push({name: 'Login'})
      },
      goToNewShop () { //点击注册
//        Indicator.open('加载中...');
//        register(this.userName,this.Md5Pwd,this.photoNum,this.msgCode).then(res=>{
//          console.log(res)
//          Indicator.close();
        this.$router.push({name: 'NewShop'})
//        }).catch(err=>{
//          console.log(err)
//          Indicator.close();
//        })

      },
      codeErr(value){
        this.codeErrMsg = value
      },
      pushRegister (){
        var num = 0
        for (var i = 0; i < this.inputArr.length; i++) {
          if (this.inputArr[i]) {
            num++
          } else {
            this.goResult = false;
            return
          }
        }
        if (num === this.inputArr.length) {
          this.goResult = true
        }
      }
    },
    mounted(){
      this.reg.isEmpty = new RegExp(/^\s*$/);
      this.reg.userName = new RegExp(/^[A-Za-z0-9_-]{4,}$/); //字母 数字 下划线
      this.reg.password = new RegExp(/\S{6,}/); // 密码6个以上字符
      this.reg.photoNum = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);// 手机号码验证
      this.reg.msgCode = new RegExp(/^\d{6}$/)// 6个验证码
    },
    destroyed(){
      sessionStorage.removeItem('photoNum')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-btn > button.disabled {
    opacity: .5;
  }
</style>
