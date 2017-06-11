<template>
  <div class="me">
    <el-header title='我' set="true"></el-header>
    <section class="content">
      <div class="about_me">
        <div class="head_img"></div>
        <div class="head_text">
          <h4>客家厨子</h4>
          <p>星级: <span></span><span></span><span></span></p>
          <a>账户管理</a>
        </div>
      </div>
      <div class="my_order cell cl">
        <div class="fl order_img">
          <img src="../../assets/img/me/order.png" alt="">
          <p>我的订单</p></div>
        <ul class="cl fl">
          <li>
            <img src="../../assets/img/me/pay.png" alt="">
            <p>待付款</p>
          </li>
          <li>
            <img src="../../assets/img/me/get-goods.png" alt="">
            <p>待收货</p>
          </li>
          <li>
            <img src="../../assets/img/me/evaluation.png" alt="">
            <p>待评价</p>
          </li>
        </ul>
      </div>
      <div class="my_purse cell cl">
        <div class="fl purse_img">
          <img src="../../assets/img/me/purse.png" alt="">
          <p>我的钱包</p></div>
        <ul class="cl fl">
          <li>
            <h4>520</h4>
            <p>可用菜钱</p>
          </li>
          <li>
            <h4>2</h4>
            <p>优惠券</p>
          </li>
          <li>
            <h4>￥20.59</h4>
            <p>可用余额</p>
          </li>
        </ul>
      </div>
      <div class="my_shop sm_cell pd-1 cl bdt-5" @click="goToMyShop">
        <img src="../../assets/img/me/me-shop.png" alt="">
        <span>我的店铺</span>
      </div>
      <ul class="cl pd-1 bdt-5 ul_list">
        <li class="cl sm_cell">
          <img src="../../assets/img/me/me-cookbook.png" alt="">
          <span>我的菜谱</span>
        </li>
        <li class="cl sm_cell">
          <img src="../../assets/img/me/collect-cookbook.png" alt="">
          <span>我的收藏菜谱</span>
        </li>
        <li class="cl sm_cell">
          <img src="../../assets/img/me/look-cookbook.png" alt="">
          <span>浏览菜谱</span>
        </li>
      </ul>
      <ul class="cl pd-1 bdt-5 ul_list">
        <li class="cl sm_cell">
          <img src="../../assets/img/me/me-shop.png" alt="">
          <span>关注店铺</span>
        </li>
        <li class="cl sm_cell">
          <img src="../../assets/img/me/care-cooker.png" alt="">
          <span>关注厨师</span>
        </li>
      </ul>
      <ul class="cl pd-1 bdt-5 ul_list">
        <li class="cl sm_cell">
          <img src="../../assets/img/me/address.png" alt="">
          <span>地址</span>
        </li>
        <li class="cl sm_cell">
          <img src="../../assets/img/me/server.png" alt="">
          <span>客服</span>
        </li>
      </ul>

    </section>
    <el-footer :choose=5></el-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
  import Header from '@/components/Head'
export default {
  name: 'me',
  data () {
    return {

    }
  },
  components:{
    'el-footer':Footer,
    'el-header':Header
  },
  created(){

  },
  methods:{
    goToMyShop () {
      this.$router.push({name:'MyShop'})
    }
  }
}
</script>

<style scoped>
  .ul_list li.sm_cell{
    float: none;
    border-bottom:1px solid #f6f6f6;
    height:3.028rem;
  }
  .sm_cell img{
    float: left;

  }
  .sm_cell span{
    line-height: 2rem;
    float: left;
    margin-left: 1rem;
  }
  .sm_cell{
    padding-top: .555rem;
    height:3.528rem;
  }
  .my_order{
    border-bottom: 0.805rem solid #f6f6f6;
  }
  .cell>ul{
    width: 77.777%;
  }
  .cell>ul>li>h4{
    line-height: 2.254rem;
    font-weight: 400;
    font-size: 1.33rem;
  }
  .cell>ul>li{
    width:33.333%;
  }
  .cell>div:after{
    content: '';
    width:1px;
    height:5rem;
    position: absolute;
    background-color: #cccccc;
    left:6.666rem;
    top:0;
    bottom:0;
    margin: auto;
  }
  .cell p{
    line-height: 2.2rem;
  }
  .cell>div{
    width: 22.222%;
  }
  .cell img,.sm_cell img{
    width: 1.944rem;
  }
  .cell{
    padding-top: 1.833rem;
    padding-bottom: 1.111rem;
    text-align: center;
    position: relative;
  }
  .head_text>a{
    font-size: .833rem;
    display: block;
    position: absolute;
    right:2rem;
    top:0;
    line-height: 6.611rem;
  }
  .head_text>p>span{
    display: inline-block;
    width:.972rem;
    height:.972rem;
    background: url("../../assets/img/me/star.png") no-repeat center center /.972rem;
  }
  .head_text{
    padding: 2rem 0 0 7rem;
  }
  .head_img{
    position: absolute;
    margin: auto;
    top:0;
    bottom:0;
    left:1.75rem;
    width:4.333rem;
    height:4.333rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    background: url("../../assets/img/me/me-head.png") no-repeat center center /4.333rem;
  }
  .about_me{
    vertical-align: middle;
    height: 6.611rem ;
    width: 100%;
    background-color: #f6f6f6;
    position: relative;
  }
</style>
