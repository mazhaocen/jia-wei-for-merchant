<template>
  <div class="shoppingCart">
    <el-header title="购物车" className="go_back"></el-header>
    <section class="content pr">
      <div class="no_goods" v-if="false">
        <img src="../../assets/img/shoppingCart/car_img.png" alt="">
        <p>空空的购物车</p>
        <button>去购物</button>
      </div>
      <div class="">
        <address class="address pd-1">配送地点:<span>南山区白石洲新塘三坊74号805室</span></address>
        <div class="about_goods">
          <div class="address pd-1">配送时间:<span>2017-4-12</span> <span>17:00-18:00</span></div>
          <ul class=" shoppingCart_list">
            <li class="cl">
              <div class="goods_img fl"><img src="../../assets/img/shoppingCart/buy_goods.png" alt=""></div>
              <div class="goods_msg fl">
                <h3>农家茶树菇</h3>
                <p>买三斤送一斤</p>
                <div class="buy_num">
                  <i>-</i><input type="number"><i>+</i>
                </div>
              </div>
              <div class="goods_price fr">
                <h3 class="price">2.3 <span>/500g</span></h3>
                <h3 class="li_price_all">￥4.6</h3>
              </div>
            </li>
          </ul>
        </div>
        <div class=""></div>
        <div class="shoppingCart_foot pa">
          <div class="check_coupon pd-1"> 查看优惠券 <i></i></div>
          <div class="settlement">
            <h3>总金额 <span>￥21</span></h3>
            <button> 结算</button>
          </div>
        </div>

      </div>
    </section>
    <el-footer :choose=4></el-footer>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import Footer from '@/components/Foot'
export default {
  name: 'shoppingCar',
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .check_coupon>i{
    display: block;
    float: right;
    width: 4rem;
    height:4rem;
    background: url("../../assets/img/shoppingCart/go_new.png") no-repeat right center/.5rem;
  }
  .check_coupon{
    background-color: #fff;
    line-height: 4rem;
    margin-bottom: 1.3rem;
    font-size: 1.333rem;
    color: #4a90e2;
  }
  .shoppingCart_foot{
    bottom:3.811rem;
    width: 100%;
  }
  .settlement{
    text-align: center;
    background-color: #fff;
  }
  .settlement>button{
    color: #fff;
    background-color: #008842;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    font-size: 1.333rem;
    width:91.66%;
    height:3.333rem;
    margin-bottom: .5rem;
  }
  .settlement>h3>span{
    color: #008842;
    padding-left: 2rem;
  }
  .settlement>h3{
    line-height: 4rem;
    font-size: 1.333rem;
  }
  .price{
    font-size: 1.111rem
  }
  .price>span{
    font-size: .667rem;
    font-weight: 300;
  }
  .li_price_all{
    margin-top:2.4rem;
    font-size: 1.111rem
  }
  .goods_price{
    text-align: right;
    line-height: 2.4rem;
    font-size: 1.111rem
  }
  .shoppingCart_list{
    border-top:1px solid #f6f6f6;
  }
  .shoppingCart_list>li{
    float: none;
    width: 100%;
    padding: .7rem 1rem 0 1rem;
  }
  .buy_num>input{
    width:2.777rem;
    border-left:1px solid #dddddd;
    border-right:1px solid #dddddd;
    height: 1.833rem;
    line-height:1.833rem;
    text-align: center;
  }
  .buy_num>i{
    display:inline-block;
    line-height: 1.833rem;
    width: 1.833rem;
    text-align: center;
  }
  .buy_num{
    border:1px solid #dddddd;
    margin-top: 1rem;
    width: 6.443rem;

  }
  .goods_msg>h3{
    line-height: 2.4rem;
    font-size: 1.111rem
  }
  .goods_msg{
    width:48.18%;
  }
  .goods_img{
    margin-right: .8rem;
    width: 25.19%;
    height:7.777rem;
  }
  .about_goods{
    background-color: #fff;
  }
  .address>span{
    color: #000;
    margin-left:2.444rem;
  }
  .address{
    font-style: normal;
    color: #1026ff;
    line-height: 3rem;
    background-color: #ffffff;
    margin: 0.3rem auto;
  }
  .no_goods>button{
    width:18.444rem;
    height:3.333rem;
    background-color: transparent;
    color: #008842;
    border:1px solid #008842;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    font-size: 1.333rem;
  }
  .no_goods>p{
    line-height:4rem;
  }
  .no_goods{
    font-size: 1.333rem;
    padding-top: 2.333rem;
    text-align: center;
  }
  .no_goods>img{
    width: 11.111rem;
  }
.shoppingCart .content{
  background-color: #efefef;
}
</style>
