<template>
  <div class="my_shop">
    <el-header title='我的店铺'></el-header>
    <section class="content">
      <div class="about_me">
        <div class="head_img"><img src="../../assets/img/me/me-head.png" alt=""></div>
        <div class="head_text">
          <h4>客家厨子</h4>
          <p>店铺号:123456</p>
          <a @click="goToUserManage">账户管理</a>
        </div>
      </div>
      <ul class="today-data cl">
        <li @click="goToBalanceMoney">
          <span>今日成交总额</span>
          <p>￥234</p>
        </li>
        <li>
        <span>今日访客</span>
        <p>34</p>
      </li>
        <li>
        <span>今日订单</span>
        <p>14</p>
      </li>
      </ul>
      <ul class="order-list">
        <li @click="goToAddGoods"><div></div><p>发布商品</p></li>
        <li @click="goToGoodsManage"><div></div><p>商品管理</p></li>
        <li @click="goToOrderManage"><div></div><p>订单管理</p></li>
        <li class="bd-t"><div></div><p>新手必备</p></li>
        <li class="bd-t"><div></div><p>催单</p></li>
        <li class="bd-t"><div></div><p>客服</p></li>
      </ul>
    </section>
    <!--<el-footer :choose=5></el-footer>-->
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
//    console.log(333);
//    console.log(api.systemVersion)
  },
  methods:{
    goToAddGoods () {
      this.$router.push({name:'AddGoods'})
    },
    goToGoodsManage () {
      this.$router.push({name:'GoodsManage'})
    },
    goToUserManage () {
        this.$router.push({name:'UserManage'})
    },
    goToOrderManage () {
        this.$router.push({name:'OrderManage'})
    },
    goToBalanceMoney () {
      this.$router.push({name:'BalanceMoney'})
    }
  }
}
</script>

<style scoped>
  .bd-t{
    border-top:1px solid #efefef;
  }
  .order-list>li:nth-child(1)>div{
    background: url("../../assets/img/myShop/shop_icon1.png") #feb664 no-repeat center center /1.611rem;
  }
  .order-list>li:nth-child(2)>div{
    background: url("../../assets/img/myShop/shop_icon2.png") #abd788 no-repeat center center /1.611rem;
  }
  .order-list>li:nth-child(3)>div{
    background: url("../../assets/img/myShop/shop_icon3.png") #fc8587 no-repeat center center /1.611rem;
  }
  .order-list>li:nth-child(4)>div{
    background: url("../../assets/img/myShop/shop_icon4.png") #87d9c2 no-repeat center center /1.611rem;
  }
  .order-list>li:nth-child(6)>div{
    background: url("../../assets/img/myShop/shop_icon5.png") #c9a9f4 no-repeat center center /1.611rem;
  }
  .order-list>li:nth-child(5)>div{
    background: url("../../assets/img/myShop/shop_icon6.png") #90caf8 no-repeat center center /1.611rem;
  }
  .order-list>li>p{
    line-height: 3rem;
    font-size: .833rem;
  }
  .order-list>li>div{
    width: 4.111rem;
    height:4.111rem;
    margin: 1.388rem auto 0;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    background-color: #90caf8;
  }
  .order-list>li:not(:nth-child(3n)){
    border-right:1px solid #efefef;
  }
  .order-list>li{
    width: 33.333%;
    text-align: center;
  }
  .today-data{
    padding: 1rem 0;
    border-bottom: 3px solid #efefef;
  }
  .today-data>li>p{
    font-size:1.333rem;
    line-height: 1.8rem;
  }
  .today-data>li>span{
    font-size: .833rem;
  }
  .today-data>li:not(:last-child){
    border-right:1px solid #008842;
  }
  .today-data>li{
    float: left;
    width:33.333%;
    text-align: center;
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
    overflow: hidden;
  }
  .about_me{
    vertical-align: middle;
    height: 6.611rem ;
    width: 100%;
    background-color: #f6f6f6;
    position: relative;
  }
</style>
