<template>
  <div class="new-shop">
    <el-header className="go_back" title="申请开店"></el-header>
    <section class="content" style="background-color: #efefef">
      <p class="pd-1 open-title">请填写本人实名信息，如非本人实名将无法提现</p>
      <ul class="cl open-option">
        <li>真实姓名 <input type="text" placeholder="请输入您的真实姓名"></li>
        <li>联系电话 <input type="tel" placeholder="请输入您的联系电话"></li>
        <li>身份证号 <input type="text" placeholder="请输入您的身份证号码"></li>
      </ul>
      <div class="upload-pic pd-1">
        <p>申请人照片 </p>
        <div class="cl">
          <div class="fl" @click="choosePhoto('front')">
            <div class="up">
              <img :src="upImgUrl" alt="">
            </div>
            <p>手持正面身份证</p>
          </div>
          <div class="fr" @click="choosePhoto('reverse')">
            <div class="back">
              <img :src="base64Url" alt="">
            </div>
            <p>手持背面身份证</p>
          </div>
        </div>
      </div>
      <div class="open-type-choose pd-1">
        <p>商家类型（单选，选择后不能更改）</p>
        <button :class="{select:type==1}" @click="merchantType(1)" class="fl">农家自产</button>
        <button :class="{select:type==2}" @click="merchantType(2)" class="fr">新鲜商铺</button>
      </div>
    </section>
    <footer>
      <button class="save-btn" @click="">提交</button>
    </footer>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <image-clip class="the-top" v-if="imageClip" :imgUrl="imgUrl" v-on:clipImage = 'resultImage' :ratio="0.654"></image-clip>
  </div>
</template>

<script>
  import { Actionsheet,Indicator } from 'mint-ui';
  import ImageClip from '@/pages/takePhoto/ImageClip'
  import Header from '@/components/Head'
  import {uploadImg} from '@/service/service'
  export default {
    name: 'newShop',
    data () {
      return {
        type:1,
        sheetVisible:false,
        actions:[],
        imgUrl:'',
        choose:'',
        upImgUrl:'',
        backImgUrl:'',
        imageClip:false,
        base64Url:''
      }
    },
    created(){
    },
    components: {
      'el-header': Header,
      'mt-actionsheet' :Actionsheet,
      'image-clip':ImageClip
    },
    methods: {
      merchantType(type) {
        this.type=type
      },
      getPic(){
        this.getPhoto('album')
      },
      takePhoto(){
        this.getPhoto('camera')
      },
      getPhoto (type) {
        api.getPicture({
          sourceType: type,
          encodingType: 'jpg',
          destinationType: 'url',
          allowEdit: false,
          quality: 100,
          saveToPhotoAlbum: true
        }, (ret, err)=> {
          if (ret) {
              if(ret.data) {
                this.imgUrl = ret.data
                this.imageClip = true
              }
//            console.log(JSON.stringify(ret));
          } else {
//            console.log(JSON.stringify(err));
          }
        });
      },
      choosePhoto(type){
        this.sheetVisible = true
        this.choose = type  //正面 front  反面reverse
      },
      resultImage(url){
        this.getBase64Image(url)
        this.imageClip = false
        if(this.choose==='front'){
               this.upImgUrl = url
            }else{
              this.backImgUrl = url
            }
      },
      getBase64Image(url,width,height,callback){
        let img = new Image();
        img.src = url;
        img.onload = ()=>{
          let canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          this.base64Url = canvas.toDataURL()
          let name = new Date().getTime()+'.png'
          Indicator.open('上传中...');
          this.uploadImg(111111,'ID_CARD_FROND',name,this.base64Url)
        }
      },
      uploadImg(id,type,name,files){
          uploadImg(id,type,name,files).then(res=>{
            console.log(res)
            Indicator.close();
          }).catch(err=>{
            console.log(err.response);
            Indicator.close();
          })
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
  .the-top{
    position: absolute;
    top:0;
    left:0;
    z-index: 99999;
  }
  .open-type-choose>button.select{
    color: #ffffff;
    background-color: #008842;
  }
  .open-type-choose>button{
    width: 45%;
    height: 3.4rem;
    border-radius: 3px;
    background-color: #c3c5c8;
  }
  .open-type-choose>p{
    line-height: 4rem;
  }
  .upload-pic{
    background-color: #ffffff;
  }
  .upload-pic>p>span{
    color: #3462ff;
  }
  .upload-pic>p{
    line-height: 4rem;
  }
  .upload-pic>div>div>p{
    color: #008842;
    font-size: .733rem;
    line-height: 2rem;
  }
  .upload-pic>div>div .back{
    background: url("../../assets/img/myShop/open-img2.png") no-repeat center center /100%;
    height: 8.611rem;
  }
  .upload-pic>div>div .up{
    background: url("../../assets/img/myShop/open-img2.png") no-repeat center center /100%;
    height: 8.611rem;
  }
  .upload-pic>div>div{
    width: 48%;
  }
  .open-title{
    line-height: 4rem;
  }
  .open-option{
    background-color: #fff;
    padding: 0 1rem;
  }
  .open-option>li>input{
    width: 80%;
    height: 4rem;
    padding-left: 1rem;
  }
  .open-option>li{
    float: none;
    width: 100%;
    line-height: 4rem;
    border-bottom:1px solid #efefef;
  }

</style>
