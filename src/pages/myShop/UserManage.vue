<template>
  <div class="user-manage">
    <el-header className="go_back" title='用户管理'></el-header>
    <section class="content manage-cell" style="padding-bottom: 0">
      <p>店铺信息</p>
      <div class="shop_img" @click="sheetVisible = true">
        <p>店铺头像</p>
        <span>
          <i><img :src="shopImg" alt=""></i>
        </span>
        <!--<p>店铺头像</p><span><img :src="thumbImg" alt=""></span>-->
      </div>
      <div><p>店铺名称</p><span @click="goToShopSignature('name',$event)">{{shopName ? shopName : '李婆婆菜档'}}</span></div>
      <div><p>店铺二维码</p><span></span></div>
      <div>
        <p>发货地址</p>
        <span @click="goToSendAddress($event)">
          {{selectAddress = selectAddress ? selectAddress : '广东深圳南山区'}}{{inputAddress = inputAddress ? inputAddress : '新伟仔三项12号333号222'}}
        </span>
      </div>
      <!--<div><p>地区（省 市）</p><span>深圳市南山区</span></div>-->
      <div><p>店铺说明</p><span @click="goToShopSignature('sign',$event)">{{shopSign ? shopSign : '店铺签名 '}}</span></div>
      <p>安全设置</p>
      <div><p>支付密码</p><span></span></div>
      <p>其他</p>
      <div><p>退出</p><span></span></div>
    </section>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <image-clip class="the-top" v-if="imageClip" :imgUrl="imgUrl" v-on:clipImage='resultImage' :ratio="1"></image-clip>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import {Actionsheet} from 'mint-ui';
  import ImageClip from '@/pages/takePhoto/ImageClip'
  import {uploadImg} from '@/service/service'
  export default {
    name: 'userManage',
    data () {
      return {
        sheetVisible: false,
        actions: [],
        shopImg: '',
        imgUrl: '',
        fsPath: '',
        shopName: '',
        shopSign: '',
        shopAddress: '',
        selectAddress: '',
        inputAddress: '',
        imageClip: false
      }
    },
    created(){
      if (sessionStorage.getItem('takePhotoUrl')) {
        this.shopImg = sessionStorage.getItem('takePhotoUrl')
        sessionStorage.removeItem('takePhotoUrl')
      }
      if (sessionStorage.getItem('name')) {
        this.shopName = sessionStorage.getItem('name')
      }
      if (sessionStorage.getItem('sign')) {
        this.shopSign = sessionStorage.getItem('sign')
      }
      if (sessionStorage.getItem('inputAddress') && sessionStorage.getItem('selectAddress')) {
        this.selectAddress = sessionStorage.getItem('selectAddress')
        this.inputAddress = sessionStorage.getItem('inputAddress')
      }
    },
    components: {
      'el-header': Header,
      'mt-actionsheet': Actionsheet,
      'image-clip': ImageClip
    },
    methods: {
      takePhoto () { //拍照
        this.getPhoto('camera')
      },
      getPic () { // 相册
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
      resultImage(url){  //图片地址
        this.getBase64Image(url)
        this.imageClip = false
        this.shopImg = url
      },
      getBase64Image(url,width,height,callback){//转base64
        let img = new Image();
        img.src = url;
        img.onload = ()=>{
          let canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          this.base64Url = canvas.toDataURL()
          this.uploadImg()
        }
      },
      uploadImg(){

      },
      // 前往编辑页面
      goToShopSignature (title, e) {
        this.$router.push({name: 'ShopSignature', params: {title: title}})
        sessionStorage.setItem('my-shop-content', e.target.innerText)
      },
      goToSendAddress (e) {
        sessionStorage.setItem('inputAddress', this.inputAddress)
        sessionStorage.setItem('selectAddress', this.selectAddress)
        this.$router.push({name: 'SendAddress'})
      }
    },
    mounted () {
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '在相册中选择',
        method: this.getPic
      }]
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul.mint-actionsheet-list > li {
    float: none;
  }

  .manage-cell > div.shop_img {
    height: 5.355rem;
    padding: .3rem 1rem;
    line-height: 5.033rem;
  }

  .manage-cell > div.shop_img > span {
    text-align: right;
    height: 5rem;
  }

  .manage-cell > div.shop_img > span > i {
    width: 4.555rem;
    display: block;
    float: right;
    height: 4.555rem;
    background: url("../../assets/img/myShop/shopimg.png") no-repeat center center/cover;
  }

  .manage-cell > div > span {
    display: inline-block;
    width: 68%;
    float: right;
    padding-right: 1.5rem;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3.4rem;
  }

  .manage-cell > div > p {
    display: inline-block;
  }

  .manage-cell > div {
    padding: 0 1rem;
    border-bottom: 1px solid #efefef;
    line-height: 3.4rem;
    font-size: 1.333rem;
    color: #5f646c;
    background: url("../../assets/img/myShop/arr-ri.png") no-repeat 97% center /.778rem;
  }

  .manage-cell > p {
    padding: 0 1rem;
    background-color: #efefef;
    color: #999;
    line-height: 2.6rem;
  }
</style>
