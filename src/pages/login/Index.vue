<template>
  <div class="login content" style="padding: 0">
    <div class="login-logo">
      <img src="../../assets/img/login/logo.png" alt="">
      <p>商家版</p>
      <span>让近邻用户选择您的店铺</span>
    </div>
    <div class="login-btn">
      <button @click="goToLogin">用户登录</button>
      <button @click="goToRegister">没有账号 需要注册</button>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import {userNameLogin} from '@/service/service'
  export default {
    name: 'login',
    data () {
      return {}
    },
    created(){
      window.page = 'index'
      if(localStorage.getItem('userName') && localStorage.getItem('password')){
        userNameLogin(localStorage.getItem('userName'),localStorage.getItem('password')).then(res=>{
          console.log(res)
          sessionStorage.setItem('userID',res.data.content.id)
          this.$router.push({name: 'MyShop'})
          Indicator.close();
        }).catch(err=>{
          console.log(err.response)
          Indicator.close();
        })
      }
    },
    methods: {
      goToLogin () {
          this.$router.push({name:'Login'})
      },
      goToRegister () {
          this.$router.push({name:'Register'})
      }

    },
    mounted(){

    },
    destroyed () {
      window.page=''
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-btn{
    position: absolute;
    bottom:0;
    width: 100%;
  }
  .login-btn>button{
    width:81.48%;
    background-color: #efefef;
    color: #008842;
    border-radius:3px;
    display: block;
    margin:2rem auto;
    line-height: 3rem;
    font-size: 1.333rem;
  }
  .login-logo{
    text-align: center;
    margin-top: 10rem;
    color: #000;
  }
  .login-logo>p{
    font-size:1.111rem;
    line-height:5rem;
  }
  .login-logo>span{
    font-size: 1.666rem;
  }
  .login-logo>img{
    width: 13.388rem;
  }
</style>
