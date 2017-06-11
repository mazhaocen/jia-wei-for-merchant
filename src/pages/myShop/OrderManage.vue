<template>
  <div class="order_manage">
    <el-header title='订单管理' className="go_back"></el-header>
    <section class="content" style="padding-bottom: 0">
      <ul class="order-manage-type cl">
        <li :class="{active:chooseType=='all'}" @click="orderChoose('all')">全部</li>
        <!--<li> &nbsp </li>-->
        <li :class="{active:chooseType=='sending'}" @click="orderChoose('sending')">以配送</li>
        <li :class="{active:chooseType=='waitDistribution'}" @click="orderChoose('waitDistribution')">待配送</li>
        <li :class="{active:chooseType=='refund'}" @click="orderChoose('refund')">退款中</li>
        <!--<li @click="orderChoose('more')">更多</li>-->
      </ul>
      <div class="order-manage-list" v-for=" (item ,index) in 3">
        <h3>#{{index + 1}}</h3>
        <div class="buyer-info">
          <h4>配送信息</h4>
          <p><i>配送时间</i><span>立即配送／2107-04-11  18:00---18:30</span></p>
          <p class="cl" style="border: none;"><i>配送地址</i><span>马某某 <i>13500012345</i></span><span
            class="buyer-info-address">深圳南山白石洲新塘三坊74号805室深圳南山白石洲新塘三坊74号805室</span></p>
          <div class="buyer-info-btn">
            <button v-if="!chooseSend" @click="sendChoose('自己配送')">自己配送</button>
            <button v-if="!chooseSend" @click="sendChoose('发起配送')">发起配送</button>
            <button v-if="chooseSend" class="active">已经{{chooseSend}}</button>
          </div>
        </div>
        <div class="order-info">
          <h4>订单详情</h4>
          <ul class="cl pd-1">
            <li>
              <span class="dishes">西红柿</span><span class="price">
             ¥2.50/500g</span><span class="number">1000g</span><span class="total-price">¥5.00</span>
            </li>
            <li>
              <span class="dishes">青菜</span><span class="price">
             ¥6.50/500g</span><span class="number">500g</span><span class="total-price">¥6.50</span>
            </li>
            <li>
              <span class="dishes">生姜</span><span class="price">
             ¥10.0/500g</span><span class="number">100g</span><span class="total-price">¥2.00</span>
            </li>
          </ul>
          <ul class="cl pd-1 order-other">
            <li><span>小计</span><span></span><span></span><span class="fr">¥13.5</span></li>
            <li><span>配送费</span><span></span><span>自己配送</span><span class="fr">¥1.00</span></li>
            <li><span>活动支出</span><span></span><span></span><span class="fr">¥1.20</span></li>
            <li><span>平台服务费</span><span></span><span></span><span class="fr">-¥0.00</span></li>
            <li><p>本单预计收入<span>¥15.7</span></p></li>
            <li>
              <button @click="cancelOrder" v-if="orderStatus">取消订单</button>
              <button v-if="orderStatus">打包打印订单</button>
              <button v-if="!orderStatus" :class="{status:!orderStatus}">订单以取消</button>
            </li>
            <li>04-21 15:30:56下单  / 订单编号：55566554568745</li>
          </ul>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
  import Header from '@/components/Head'
  import {MessageBox, Toast} from 'mint-ui';

  export default {
    name: 'orderManage',
    data () {
      return {
        popupVisible: false,
        value: [],
        options: [],
        chooseType: 'all',
        chooseSend: '',
        orderStatus:'1'
      }
    },
    components: {
      'el-footer': Footer,
      'el-header': Header,
    },
    created(){

    },
    mounted () {
    },
    methods: {
      orderChoose (type){
        this.chooseType = type
      },
      sendChoose (type) {
        MessageBox({
          title: '提示',
          message: '您确定' + type + '？',
          showCancelButton: true,
          confirmButtonText: '确定'
        }).then(res => {
          if (res === 'confirm') {
            this.chooseSend = type
            Toast({
              message: '选择' + type + '成功',
              iconClass: 'mintui mintui-success'
            });
          } else {

          }
        });
      },
      cancelOrder(){
        MessageBox({
          title: '提示',
          message: '您确定取消订单吗？',
          showCancelButton: true,
          confirmButtonText: '确定'
        }).then(res => {
          if (res === 'confirm') {
              this.orderStatus = 0
            Toast({
              message: '订单取消成功',
              iconClass: 'mintui mintui-success'
            });
          } else {

          }
        });
      }
    }
  }
</script>

<style scoped>
  .order-manage-type > :not(:last-child) {
    border-right: 1px solid #008842;
  }

  .order-manage-type > li.active {
    background-color: #008842;
    color: #ffffff;
  }

  .order-manage-type {
    border-top: 3px solid #efefef;
    border-bottom: 3px solid #efefef;
    padding: .3rem 0;
  }

  .order-manage-type > li {
    width: 25%;
    text-align: center;
    line-height: 2rem;
  }

  .order-other > li:nth-child(7) {
    color: #999;
    font-size: .733rem;
  }

  .order-other > li:nth-child(6) > button.status {
    border: 1px solid gray;
  }
  .order-other > li:nth-child(6) > button {
    background-color: #ffffff;
    border: 1px solid #008842;
    border-radius: 2px;
    padding: .5rem 1rem;
    margin-left: .5rem;
  }

  .order-other > li:nth-child(6) {
    text-align: right;
  }

  .order-other > li:nth-child(5) > p > span {
    color: #008842;
    float: right;
    width: 15%;
  }

  .order-other > li:last-child > p {
    font-size: 1.111rem;
  }

  .order-info > ul > li > span:nth-child(1) {
    width: 40%;
  }

  .order-info > ul > li > span:nth-child(2) {
    width: 25%;
  }

  .order-info > ul > li > span:nth-child(3) {
    width: 20%;
    color: #999;
  }

  .order-info > ul > li > span:nth-child(4) {
    width: 15%;
  }

  .order-info > ul {
    border-bottom: 1px solid #efefef;
  }

  .order-info > ul > li {
    width: 100%;
    line-height: 2.2rem;
  }

  .order-info > ul > li > span {
    display: inline-block;
  }

  .buyer-info-btn {
    text-align: right;
    padding: 0 1rem;
  }

  .buyer-info-btn > button.active {
    background-color: #008842;
    color: #ffffff;
  }

  .buyer-info-btn > button {
    background-color: #ffffff;
    border: 1px solid #008842;
    color: #008842;
    padding: .2rem .5rem;
    margin-left: .5rem;
  }

  .order-manage-list {
    line-height: 2.8rem;
    border: 1px solid #efefef;
    margin: .5rem;
  }

  .order-manage-list > h3 {
    padding: 0 1rem;
    border-top: 1px solid #efefef;
  }

  .buyer-info > p {
    border-bottom: 1px solid #efefef;
    padding: 0 1rem;
  }

  .order-manage-list h4 {
    background-color: #efefef;
    color: #008842;
    padding: 0 1rem;
    line-height: 2.8rem;
    font-weight: normal;
  }

  .buyer-info > p > span {
    float: right;
    width: 83%;
  }

  .buyer-info-address {
    line-height: 2rem;
    white-space: pre-wrap;
  }

  .buyer-info > p > i {
    color: #747474;
  }
</style>
