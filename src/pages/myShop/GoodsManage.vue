<template>
  <div class="goods-manage">
    <el-header title='宝贝管理' className="go_back"></el-header>
    <section class="content" style="background-color: #efefef;padding-bottom: 0;">
      <ul class="goods-type cl">
        <li :class="{active:goodsType==''}" @click="goodsManageType('')">全部宝贝 <span v-if="goodsType==''">({{items.length}})</span></li>
        <li :class="{active:goodsType=='ON'}" @click="goodsManageType('ON')">出售中<span v-if="goodsType=='ON'">({{items.length}})</span></li>
        <li :class="{active:goodsType=='OFF'}" @click="goodsManageType('OFF')">仓库中<span v-if="goodsType=='OFF'">({{items.length}})</span></li>
      </ul>
      <ul class="goods-manage_list cl">
        <li v-for="(item,index) in items" >
          <div class="goods-info cl">
            <div class="fl goods-info_img"><img src="" alt=""></div>
            <div class="fl goods-info_text">
              <h3>{{item.title}}</h3>
              <span>￥{{toDecimal2(item.price)}} <i>/500g</i></span>
              <p><span> 已售:0份</span><span>库存：{{item.stockQuantity}}份</span></p>
            </div>
          </div>
          <ul>
            <li @click="goToEditGoods(item)">编辑宝贝</li>
            <li @click="statusChange(item.id ,$event)" >{{(goodsType==='OFF')?'上架':(goodsType==='ON')?'下架':'下架'}}</li>
            <li @click="share(item.title)">分享</li>
            <li @click="deleteGoodsLi(index)">删除</li>
          </ul>
        </li>
      </ul>
      <div class="my-shop-btn">
        <!--<button>新的产品</button>-->
        <button @click="goToAddGoods">发布宝贝</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import { MessageBox } from 'mint-ui';
  import {getGoodsManageList,getGoodsList,goodsManage} from '../../service/service'
export default {
  name: 'GoodsManage',
  data () {
    return {
      goodsType:'',
      items:[],
    }
  },
  components:{
    'el-header':Header
  },
  created(){
    getGoodsList().then(res=>{
        console.log(res)
        this.items = res.data.content
    }).catch(err=>{
        console.log(err.response)
    })
  },
  methods:{
    goToAddGoods () {
      this.$router.push({name:'AddGoods'})
    },
    goodsManageType(type){
      this.goodsType= type
      getGoodsList(type).then(res=>{
        console.log(res)
        this.items = res.data.content
      }).catch(err=>{
        console.log(err.response)
      })
    },
    deleteSure(index){
      this.items.splice(index,1)
    },
    deleteGoodsLi (index) {
      MessageBox({
        title: '提示',
        message: '确定删除此商品吗?',
        showCancelButton: true
      }).then(res =>{
        if(res ==='confirm'){
          this.deleteSure(index)
        }else{
          console.log('bu删除')
        }
      });
    },
    statusChange (id,e) {
        console.log(id)
      let status
      if (e.target.innerText === '上架'){
        status = 'ON'
      }else if(e.target.innerText === '下架') {
        status = 'OFF'
      }else if(e.target.innerText === '删除'){
        status = 'DELETE'
      }
      goodsManage (id,status).then(res=>{
          console.log(res)
      }).catch(err=>{
          console.log(err.response)
      })
      MessageBox({
        title: '提示',
        message: '确定将此商品'+e.target.innerText+'么?',
        showCancelButton: true
      }).then(res =>{
        if(res ==='confirm'){
          goodsManage (id,status).then(res=>{
            console.log(res)
            if(e.target.innerText==='下架'){
              e.target.innerText = '上架'
//              this.items[index].status='warehouse'
            }else{
              e.target.innerText='下架'
//              this.items[index].status='selling'
            }
          }).catch(err=>{
            console.log(err.response)
          })


        }else{
          console.log('bu删除')
        }
      });
    },
    goToEditGoods(item){
        console.log(JSON.stringify(item))
      sessionStorage.setItem('goodsInfo',JSON.stringify(item))
      this.$router.push({name:'AddGoods'})
    },
    toDecimal2 (x) { // 保留两位小数
      let f = parseFloat(x);
      if (isNaN(f)) {
        return 0;
      }
      f = Math.round(f * 100) / 100;
      let s = f.toString();
      let rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      return s;
    },
    share (title) {
      var sharedModule = api.require('shareAction');
      sharedModule.share({
        text: title,
        type: 'url'
      });
    }

  }
}
</script>

<style scoped>
  .goods-info{
    padding: .5rem 1rem;
    border-bottom:1px solid #efefef;
  }
  .goods-info_text>p>span{
    margin-right: 2rem;
  }
  .goods-info_text>h3{
    font-size: 1.333rem;
  }
  .goods-info_text>span>i{
    font-size: .8333rem;
    font-style: normal;
  }
  .goods-info_text>span{
    color: #fd6357;
    font-size: 1.333rem;
  }
  .goods-manage_list>li{
    width: 100%;
    margin-bottom: .3rem;
    background-color: #ffffff;
  }
  .goods-manage_list>li>ul>li{
    width: 25%;
    text-align: center;
    line-height: 2rem;
    color: #008842;
  }
  .goods-manage_list{
  }
  .goods-info_img{
    width:8.25rem;
    height:5.444rem;
  }
  .goods-type>li:last-child{
    border:none;
  }
  .goods-type{
    margin: .2rem 0;
    padding:.5rem 0;
    background-color: #ffffff;
  }
  .goods-type>li.active{
    color: #008842;
  }
  .goods-type>li{
    width: 33.333%;
    text-align: center;
    border-right: 1px solid #008842;
    line-height: 2rem;
    color: #585858;
  }
</style>
