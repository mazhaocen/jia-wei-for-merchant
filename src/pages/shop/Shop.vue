<template>
  <div class="shop">
    <header class="header box pd-1">
      <div class="shop-gps fl"><p>新围仔三巷12号</p></div>
      <div class="search pd-1 fl">
        <input type="text" placeholder="搜索商品">
      </div>
      <div class="scan fl hd-h"></div>
      <div class="more fr hd-h"></div>
    </header>
    <section class="content">
      <div class="banner cl">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in 3"><img src="../../assets/img/shop/banner.png" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="type_modular ">
        <p class="pd-1">选择分类</p>
        <div class="choose_type">
          <p :class="{on:type==1}" @click="typeChoose(1)">农家自产 <span>(最近)</span></p><p :class="{on:type==2}" @click="typeChoose(2)">新鲜商铺 <span>(附近)</span></p>
        </div>
      </div>
      <ul class="type_modular2">
        <li v-for="type in typeArr" :class="{select: selectType==type}" @click="chooseType(type)"><span>{{type}}</span></li>
      </ul>
      <div class="seckill">
         <header class="pd-1">
           <img src="../../assets/img/shop/seckill.png" alt="">
           <strong> 今日倒计时</strong>
           <span> 04: 20: 04</span>
         </header>
        <ul class="seckill_list">
          <li v-for="item in 5">
            <img src="../../assets/img/shop/seckill_list.png" alt="">
            <p>¥110</p>
            <del>¥220</del>
          </li>
        </ul>
      </div>
      <div class="recommend">
        <div class="first_recommend">
          <img src="../../assets/img/shop/recommend.png" alt="">
          <button><img src="../../assets/img/shop/recommend-btn1.png" alt=""></button>
        </div>
        <ul data-width="470" data-height="270" class="recommend_list">
          <li v-for="(a,index) in 5">
            <div class="recommend_img"></div><div class="recommend_msg">
              <h4>{{index % 2==0?'今日推荐':'下单即送'}}</h4>
              <strong>农家自产西红柿</strong>
              <p>原汁原味农家种 吃的放心</p>
              <h3><span>￥</span>2.3 <span>/500g</span></h3>
              <i class="car"></i>
              <i class="recommend_btn"></i>
            </div>
          </li>
        </ul>
      </div>

    </section>
    <el-footer :choose=1></el-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
  import {Swipe,SwipeItem} from 'mint-ui'
  export default {
    name: 'shop',
    data () {
      return {
        type:'',
        selectType:'',
        typeArr:[
          '禽类蛋类',
          '蔬菜',
          '水果',
          '肉类',
          '水产类',
          '速食产品']
      }
    },
    components: {
      'el-footer': Footer,
       'mt-swipe':Swipe,
      'mt-swipe-item':SwipeItem
    },
    created(){

    },
    methods: {
      typeChoose:function (type) {
        this.type = type
      },
      chooseType:function (type) {
        this.selectType = type
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .recommend_img{
    width:13.056rem;
    border:1px solid #333333;
    margin-right:1rem;
  }
  .recommend_msg>h3>span{
    font-size: 1rem;
    font-weight: 400;
  }
  .recommend_msg>h3{
    font-size:2.222rem ;
    color: #fd6357;
  }
  .recommend_msg>p{
    color: #6a6a6a;
    font-size: .889rem;
  }
  .recommend_msg>strong{
    font-size: 1.333rem;
  }
  .recommend_list>li .recommend_btn,.recommend_list>li .car{
    display: block;
    position: absolute;
  }
  .recommend_list>li .recommend_btn{
    width:8rem;
    height:2.222rem;
    background: url(../../assets/img/shop/recommend-btn2.png) no-repeat center center/100%;
    right:0;
    bottom:0;
  }
  .recommend_list>li .car{
    width: 3rem;
    height: 3rem;
    background: url(../../assets/img/shop/car.png) no-repeat center center/1.667rem ;
    top:0;
    right:0;
  }
  .recommend_msg>h4{
    background-color: #e95d39;
    color: #fff;
    font-size: .889rem;
    width:4.74rem;
    text-align: center;
    -webkit-border-radius:2px;
    -moz-border-radius:2px;
    border-radius:2px;
    font-weight: 100;
  }
  .recommend_list>li>div{
    height:7.5rem;
    display: inline-block;
  }
  .recommend_list>li{
    position: relative;
    border-bottom: .417rem solid #efefef;
    padding:.972rem 0 .472rem .972rem;
    width: 100%;
  }
  .first_recommend>button{
    position: absolute;
    bottom:0;
    right:0;
    width:9.722rem;
  }
  .first_recommend{
    position: relative;
  }
  .seckill_list>li>p{
    color: red;
  }
  .seckill_list>li>del{
    color: #bbb;
    font-size: .833rem;
  }
  .seckill_list>li>img{
    width:93.54%;
  }
  .seckill_list::-webkit-scrollbar{
    display: none;
  }
  .seckill_list{
    padding: 0 .5rem;
    overflow-scrolling: touch;
    overflow: auto;
  }
  .seckill_list>li{
    float: none;
    display: inline-block;
    width:28.57%;
    text-align: center;
  }
  .seckill>header{
    height:2.639rem;
    vertical-align: middle;
    display: table-cell;
  }
  .seckill>header>strong{
    font-size: 1.111rem;
    margin-left: .5rem;
  }
  .seckill>header>span{
    color: #595959;
    margin-left: .5rem;
  }
  .seckill>header>img{
    width:10.556rem;
    vertical-align: middle;
  }
  .type_modular2{
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    border-bottom: 1px solid #e3e3e3;
  }
  .type_modular2::-webkit-scrollbar{
    display: none;
  }
  .type_modular2>li.select>span{
    border-bottom: 2px solid #008842;
    color: #008842;
    line-height:2.366rem;
    margin: 0 .5rem;
  }
  .type_modular2>li>span{
    display: block;
    line-height:2.667rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .type_modular2>li{
    display: inline-block;
    width:18.18%;
    float: none;
    text-align: center;
    overflow: auto;
    margin: .5rem auto;
    /*line-height:3.667rem;*/
  }
  .choose_type{
    padding:.805rem 1rem;
    border-bottom: 1px solid #e3e3e3;
  }
  .choose_type>p.on>span{
    color: #fff;
  }
  .choose_type>p>span{
    font-size: .833rem;
    color: #bbb;
  }
  .choose_type>p.on{
    color: #fff;
    background-color: #008842;
  }
  .choose_type>p{
    width:44.94%;
    height:2.945rem;
    line-height:2.945rem;
    border:1px solid #008842;
    display: inline-block;
    text-align: center;
    margin: 0 .628rem;
  }
  .type_modular>p{
    background-color: #efefef;
    color: #313131;
    line-height:2.25rem;

  }
  .banner{
    height:12.389rem;
  }
  .shop-gps > p {
    overflow: hidden;
    width: 4.611rem;
  }
  .shop-gps {
    padding-left: 1.333rem;
    background: url(../../assets/img/shop/gps.png) no-repeat left center/1rem;
    line-height: 3.611rem;
    font-size: .833rem;
  }
  .search {
    width:51.48%;
    line-height: 3.611;
  }
  .search > input {
    border: 1px solid #008842;
    height: 2.083rem;
    width: 100%;
    padding: 0 2rem 0 1rem;
  }
  .hd-h{
    height: 3.611rem;
  }
  .scan{
    background: url(../../assets/img/shop/saomiao.png) no-repeat center center/2.111rem;
    width:2.111rem;
    margin:0 1rem;
  }
  .more{
    background: url(../../assets/img/shop/more.png) no-repeat center center/1.439rem;
    width:1.639rem;
  }
</style>
