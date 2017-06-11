<template>
  <div class="add_goods">
    <el-header title='发布宝贝' className="go_back"></el-header>
    <section class="content" style="padding-bottom: 0">
      <div class="goods-img" @click="sheetVisible = true">
        <i><img :src="goodsImg" alt=""></i>
      </div>
      <form action="">
        <div class="pd-1 goods-title pr">
          <p>输入商品的标题</p>
          <input type="text" v-model.trim="item.title" maxlength="60" required >
          <span>{{item.title.length}}/60</span>
          <b v-if="!item.title">请输入商品标题</b>
        </div>
        <div class="goods-msg">
          <div @click="popupVisible = true">
            <span>类目 </span>
            <input type="text" :value="item.category | typeFilter(value)" placeholder="请选择商品类型" readonly >
            <b v-if="!item.category[0]">请选择商品类型</b>
          </div>
          <div>
            <span>价格 </span>
            <input maxlength="10" type="text" v-model="item.price" v-on:blur="univalence(item.price,'price')"><i>/500g</i>
            <b v-if="price">请输入正确单价(数字)</b>
          </div>
          <div>
            <span>库存 </span>
            <input maxlength="10" type="text" v-model="item.inventory" v-on:blur="univalence(item.inventory,'inventory')" placeholder="0"><i>/份</i>
            <b v-if="inventory">请输入库存数量(数字)</b>
          </div>
          <div>
            <span>运费 </span>
            <input maxlength="10" type="text" v-model="item.freight" v-on:blur="univalence(item.freight,'freight')"><i>/元</i>
            <b v-if="freight">请输入数字</b>
          </div>
          <div><p>宝贝描述</p><textarea v-model.trim="item.describe" maxlength="100"></textarea><i
            style="top: 0;">{{item.describe.length}}/100</i></div>
          <!--<div><p>发货地址</p><textarea></textarea><i></i></div>-->
        </div>
        <div class="my-shop-btn">
          <button @click="saveWarehouse" type="submit">放入仓库</button>
          <button @click="putAway" >立即发布</button>
        </div>
      </form>
    </section>
    <mt-popup v-model="popupVisible" position="bottom" class="type-list">
      <mt-checklist
        title="类目选项"
        v-model="item.category"
        :options="options">
      </mt-checklist>
    </mt-popup>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <image-clip class="the-top" v-if="imageClip" :imgUrl="imgUrl" v-on:clipImage='resultImage' :ratio="0.3963"></image-clip>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
  import Header from '@/components/Head'
  import {Popup, Checklist, MessageBox,Toast,Actionsheet} from 'mint-ui';
  import ImageClip from '@/pages/takePhoto/ImageClip'
  import {uploadImg} from '@/service/service'
  export default {
    name: 'AddGoods',
    data () {
      return {
        sheetVisible: false,
        actions: [],
        popupVisible: false,
        value: [],
        options: [],
        item: {title: '',category:[] ,price: 0, inventory:0,freight: 0, describe: ''},
        price: false,
        freight: false,
        inventory: false,
        goodsImg:'',
        imgUrl:'',
        imageClip:false
      }
    },
    components: {
      'el-footer': Footer,
      'el-header': Header,
      'mt-popup': Popup,
      'mt-checklist': Checklist,
      'mt-actionsheet' :Actionsheet,
      'image-clip': ImageClip
    },
    created(){
      if (sessionStorage.getItem('goodsInfo')) {
        this.item = JSON.parse(sessionStorage.getItem('goodsInfo'))
        sessionStorage.removeItem('goodsInfo')
      }
      if (sessionStorage.getItem('takePhotoUrl')){
        this.goodsImg = sessionStorage.getItem('takePhotoUrl')
        sessionStorage.removeItem('takePhotoUrl')
      }
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '在相册中选择',
        method: this.getPic
      }]
    },
    mounted () {
      this.options = ['水果', '蔬菜', '生肉', '海鲜', '禽类', '水产品', '速冻食品', '农副产品','土特产','山货','粮食','茶','其他'];
    },
    methods: {
      univalence (value, text){ //   数字校验
        console.log(value)
        if (!(/^\d+(\.\d+)?$/.test(value))) {
          this[text] = true;
          return
        }
        if(value){

        }
        this[text] = false;
        if (text === 'price') {
          this.item.price = this.toDecimal2(value)
        } else if (text === 'freight') {
          this.item.freight = this.toDecimal2(value)
        } /*else if(text === 'inventory') {
          this.item.inventory = this.toDecimal2(value)
        }*/
      },
      toDecimal2 (x) { // 保留两位小数
        var f = parseFloat(x);
        if (isNaN(f)) {
          return '';
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      putAway () {  // 立即发布
        MessageBox({
          title: '提示',
          message: '您确认将此商品上架吗？',
          showCancelButton: true,
          confirmButtonText:'确定'
        }).then(res =>{
          if(res ==='confirm'){
            Toast({
              message: '上架成功',
              iconClass: 'mintui mintui-success'
            });
          }else{

          }
        });
      },
      saveWarehouse () {
        MessageBox({
          title: '提示',
          message: '您确认将此商品放入仓库吗？',
          showCancelButton: true,
          confirmButtonText:'确定'
        }).then(res =>{
          if(res ==='confirm'){
            Toast({
              message: '存放成功',
              iconClass: 'mintui mintui-success'
            });
          }else{

          }
        });
      },
      inputVerify () {  //输入验证

      },
      takePhoto () { // 拍照
        this.getPhoto('camera')
      },
      getPic () {// 选择照片
        this.getPhoto('album')
      },
      getPhoto (type) {//获取图片
        api.getPicture({
          sourceType: type,
          encodingType: 'jpg',
          destinationType: 'url',
          allowEdit: false,
          quality: 100,
          saveToPhotoAlbum: true
        }, (ret, err) => {
          if (ret) {
            if (ret.data) {
              this.imgUrl = ret.data
              this.imageClip = true
            }
//            console.log(JSON.stringify(ret));
          } else {
//            console.log(JSON.stringify(err));
          }
        });
      },
      resultImage (url) {  //图片地址
        this.getBase64Image(url)
        this.imageClip = false
        this.goodsImg = url
      },
      getBase64Image (url,width,height,callback) {//转base64
        let img = new Image();
        img.src = url;
        img.onload = ()=>{
          let canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          this.base64Url = canvas.toDataURL()
//          this.uploadImg()
        }
      },
      uploadImg () {
      }
    },
    filters: {
      typeFilter (string){
        return string.join(',')
      }
    },
//    watch:{
//        item:{
//          handler (val,oldval){
//          console.log((this.item.title).length)
//          },
//          deep:true
//        }
//        }
  }
</script>

<style scoped>

  .type-list {
    width: 100%;
    background-color: #efefef;
    height: 40vh;
  }

  .goods-msg > div > span, .goods-msg > div > p {
    text-align: left;
  }

  .goods-msg > div > span {
    display: block;
    float: left;
  }

  .goods-msg > div > b, .goods-title b {
    color: orangered;
    display: block;
    line-height: 1.6rem;
    text-align: right;
  }

  .goods-msg > div {
    padding: 0 1.111rem;
    border-bottom: 0.3rem solid #efefef;
    line-height: 4rem;
    text-align: right;
    position: relative;
  }

  .goods-msg textarea {
    width: 100%;
    height: 4rem;
    border: 1px solid #efefef;
    padding: .5rem 1rem;
    white-space: normal;
  }

  .goods-msg input {
    width: 85%;
    margin-left: 1rem;
    padding-left: 1rem;
  }

  .goods-title > span, .goods-msg > div > i {
    right: 2rem;
    color: #cccccc;
    position: absolute;
  }

  .add_goods input {
    border: 1px solid #efefef;
    height: 3rem;
    padding-right: 4rem;
  }
  .goods-title input {
    width: 100%;
    margin-bottom: 1rem;
    padding-left: 1rem;
  }

  .goods-title {
    border-bottom: .5rem solid #efefef;
    line-height: 2rem;
  }

  .goods-img>i {
    display: block;
    background: url("../../assets/img/addGoods/add-goods.png") no-repeat center center/100%;
    height: 12.333rem;
  }
  .goods-img {
    border-bottom: 2px solid #efefef;


  }
</style>
