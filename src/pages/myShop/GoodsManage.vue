<template>
  <div class="goods-manage">
    <el-header title='宝贝管理' className="go_back"></el-header>
    <section class="content" style="background-color: #efefef;padding-bottom: 0;">
      <ul class="goods-type cl">
        <li :class="{active:goodsType==''}" @click="goodsListChange('')">全部宝贝 <span v-if="goodsType==''">({{items.length}})</span></li>
        <li :class="{active:goodsType=='ON'}" @click="goodsListChange('ON')">出售中<span v-if="goodsType=='ON'">({{items.length}})</span></li>
        <li :class="{active:goodsType=='OFF'}" @click="goodsListChange('OFF')">仓库中<span v-if="goodsType=='OFF'">({{items.length}})</span></li>
      </ul>
      <ul class="goods-manage_list cl">
        <li v-for="(item,index) in items" >
          <div class="goods-info cl">
            <div class="fl goods-info_img"><img :src="item.headImageLink" alt=""></div>
            <div class="fl goods-info_text">
              <h3>{{item.title}}</h3>
              <span>￥{{toDecimal2(item.price)}} <i>/500g</i></span>
              <p><span> 已售:0份</span><span>库存：{{item.stockQuantity}}份</span></p>
            </div>
          </div>
          <ul>
            <li @click="goToEditGoods(item)">编辑宝贝</li>
            <li @click="statusChange(item,$event,index)" >{{(item.commodityStatus==='IN_STORE')?'上架':'下架'}}</li>
            <li @click="share(item.title)">分享</li>
            <li @click="statusChange(item,$event,index)">删除</li>
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
  import { MessageBox, Indicator ,Toast} from 'mint-ui';
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
      let data = sessionStorage.getItem('goodsData'+this.goodsType)
//    if (data){
//      this.items = JSON.parse(data)
//    }else{
      Indicator.open('加载中...')
      getGoodsList().then(res=>{
        Indicator.close()
        this.items = res.data.content
        sessionStorage.setItem('goodsData'+this.goodsType,JSON.stringify(this.items))
      }).catch(err=>{
        Indicator.close()
        console.log(err.response)
      })
//    }

  },
  methods:{
    goToAddGoods () {
      this.$router.push({name:'AddGoods'})
    },
    // 选择列表类型 全部 上架 仓库选择
    goodsListChange(type){
      this.goodsType= type
//      if (sessionStorage.getItem('goodsData'+type)){
//        this.items = JSON.parse(sessionStorage.getItem('goodsData'+type))
//      }else{
        Indicator.open('加载中...')
        getGoodsList(type).then(res=>{
          this.items = res.data.content
          sessionStorage.setItem('goodsData'+type,JSON.stringify(res.data.content))
          Indicator.close()
        }).catch(err=>{
          console.log(err.response)
          Indicator.close()
        })
//      }
    },
    // 状态更改 上架 下架 删除
    statusChange (item,e,index) {
      MessageBox({
        title: '提示',
        message: '确定将此商品'+e.target.innerText+'么?',
        showCancelButton: true
      }).then(res=>{
        if(res ==='confirm'){
          this.goodsDataEdit(item,e,index)
        }else{
          console.log('bu删除')
        }
      });
    },
    //数据处理
    goodsDataEdit (item,e,index) {
      Indicator.open()
      let status
      if (e.target.innerText==='下架'){
        status = 'OFF'
      }else if(e.target.innerText==='上架') {
        status = 'ON'
      }else if(e.target.innerText === '删除'){
        status = 'DELETE'
      }
      // 向服务端发送更改状态请求
      goodsManage(item.id,status).then( res=>{
        Indicator.close()
        if(this.goodsType===''){  //在全部商品列表，上下线更改状态，删除删除当前项
          if(e.target.innerText==='下架'){
            this.items[index].commodityStatus='IN_STORE'
            this.goodsStorage(item,'goodsDataON','goodsDataOFF')
          }else if(e.target.innerText==='上架') {
            this.items[index].commodityStatus='ON_SALE'
            this.goodsStorage(item,'goodsDataOFF','goodsDataON')
          }else if(e.target.innerText==='删除'){
            this.deleteSure(item,index)
          }
          sessionStorage.setItem('goodsData',JSON.stringify(this.items))//保存全部列表
        }else {// 在其他页面 更改状态 删除当前项
          if(e.target.innerText!=='删除'){
            if(this.goodsType==='ON') {
              item.commodityStatus='IN_STORE'
              this.goodsStorage(item,'goodsDataON','goodsDataOFF')

            }else if(this.goodsType==='OFF'){
              item.commodityStatus='ON_SALE'
              this.goodsStorage(item,'goodsDataOFF','goodsDataON')
            }
            this.items.splice(index,1)
          }else{
            let data = JSON.parse(sessionStorage.getItem('goodsData'))
            for (let i = 0;i<data.length;i++){
              if(item.id===data[i].id){
                data.splice(i,1)
              }
            }
            sessionStorage.setItem('goodsData',JSON.stringify(data))
            this.deleteSure(item,index)
          }
        }
        Toast({
          message: '操作成功！',
          iconClass: 'mintui mintui-success'
        });
      }).catch(err=>{

        Indicator.close()
        Toast({
          message: '操作失败，请重试！',
        });
        console.log(err)
        console.log(err.response)
        console.log(JSON.stringify(err.response))
        console.log(JSON.stringify(err))
      })

    },
    deleteSure(item,index){ //删除当前选项
      this.items.splice(index,1)
      if(item.commodityStatus==='IN_STORE'){
        let data = JSON.parse(sessionStorage.getItem('goodsDataOFF'))
        for (let i = 0;i<data.length;i++){
          if(item.id===data[i].id){
            data.splice(i,1)
          }
        }
        sessionStorage.setItem('goodsDataOFF',JSON.stringify(data))
      }else if(item.commodityStatus==='ON_SALE'){
        let data = JSON.parse(sessionStorage.getItem('goodsDataON'))
        for (let i = 0;i<data.length;i++){
          if(item.id===data[i].id){
            data.splice(i,1)
          }
        }
        sessionStorage.setItem('goodsDataON',JSON.stringify(data))
      }
    },
    // 数据存储处理
    goodsStorage(item,data1,data2) {
      if(sessionStorage.getItem(data1)){
        let data = JSON.parse(sessionStorage.getItem(data1))
        console.log(data)
        for (let i = 0;i<data.length;i++){
          if(item.id===data[i].id){
            data.splice(i,1)
          }
        }
        sessionStorage.setItem(data1,JSON.stringify(data))
      }

      if(sessionStorage.getItem(data2)){
        let data = JSON.parse(sessionStorage.getItem(data2))
        data.push(item)
        console.log(data)
        sessionStorage.setItem(data2,JSON.stringify(data))
      }
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
    margin-right: 1rem;
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
