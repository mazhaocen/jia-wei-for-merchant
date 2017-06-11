<template>
  <div class="bank-card">
    <el-header className="go_back" title="添加银行卡"></el-header>
    <section class="content" style="background-color: #efefef">
      <div class="bank-card-msg">
        <p>请绑定本人的银行卡</p>
        <ul class="cl">
          <li><span>持卡人</span><input type="text" placeholder="请输入持卡人姓名"></li>
          <li><span>卡号</span><input type="text" placeholder="请输入卡号"></li>
        </ul>
        <p>请选择银行卡类型</p>
        <ul class="cl">
          <li><span>卡类型</span><i></i></li>
          <li><span>手机号</span><input type="text" placeholder="请输入银行预留手机号码"></li>
        </ul>
        <label class="pd-1"><p class="fl pd-1" @click="agreeBind"><i :class="{active:agree}"></i> 同意</p><span>《用户协议》</span></label>
        <button class="pd-1" @click="goToVerifyPhone">下一步</button>
      </div>

    </section>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'balanceMoney',
    data () {
      return {
        agree:true
      }
    },
    created(){

    },
    components: {
      'el-header': Header
    },
    methods: {
      agreeBind () {
        this.agree = !this.agree
      },
      goToVerifyPhone () {
        this.$router.push({name:'VerifyPhone'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bank-card-msg>button{
    width:100%;
    background-color: #008842;
    color: #ffffff;
    height: 4rem;
    display: block;
    font-size: 1.111rem;
  }
  .bank-card-msg>label{
    line-height: 3rem;
    /*display: flex;*/
  }
  .bank-card-msg>label i.active{
    background-color: #008842;
  }
  .bank-card-msg>label i.active:before{
    content: '';
    display: block;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    border: 2px solid #ffffff;
    position: absolute;
    left: -4px;
    top: -8px;
    width: 10px;
    height: 10px;
  }
  .bank-card-msg>label i{
    display:inline-flex;
    width:10px;
    height: 10px;
    background-color: #fff;
    position:relative;
    overflow: hidden;
  }
  .bank-card-msg>ul>li>input{
    width: 82%;
    float: right;
    font-size: 1.111rem;
    height: 3rem;
  }
  .bank-card-msg>ul>li{
    float: none;
    font-size: 1.111rem;
    width:100%;
    line-height: 3rem;
    border-break: 1px solid #efefef;
    border-bottom:1px solid #efefef;
  }
  .bank-card-msg> ul{
    padding: 0 1rem;
    background-color: #fff;
  }
  .bank-card-msg>p{
    padding: 0 1rem;
    line-height: 3rem;
  }
</style>
