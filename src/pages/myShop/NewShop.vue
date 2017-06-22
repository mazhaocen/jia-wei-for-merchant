<template>
  <div class="new-shop">
    <el-header className="go_back" title="申请开店"></el-header>
    <section class="content" style="background-color: #efefef">
      <p class="pd-1 open-title">请填写本人实名信息，如非本人实名将无法提现</p>
      <ul class="cl open-option">
        <li>真实姓名 <input type="text" :maxlength="10" placeholder="请输入您的真实姓名" v-model="realName"
                        v-on:input ="inputChange('name',$event.target.value)"
                        v-on:blur ="inputBlur('name',$event.target.value)"
                        v-on:focus ="inputFocus('name',$event.target.value)">
                        <p class="err-msg">{{realNameErrMsg}}</p>
        </li>
        <li>联系电话 <input type="tel" :maxlength="11" placeholder="请输入您的联系电话" v-model="phone"
                        v-on:input ="inputChange('tel',$event.target.value)"
                        v-on:blur ="inputBlur('tel',$event.target.value)"
                        v-on:focus ="inputFocus('tel',$event.target.value)">
                        <p class="err-msg">{{phoneErrMsg}}</p>
        </li>
        <li>身份证号 <input type="text" :maxlength="18" placeholder="请输入您的身份证号码" v-model="idCardNo"
                        v-on:input ="inputChange('idCard',$event.target.value)"
                        v-on:blur ="inputBlur('idCard',$event.target.value)"
                        v-on:focus ="inputFocus('idCard',$event.target.value)">
                        <p class="err-msg">{{idCardNoErrMsg}}</p></li>
      </ul>
      <div class="upload-pic pd-1">
        <p>申请人照片 </p>
        <div class="cl">
          <div class="fl" @click="choosePhoto('front')">
            <div class="up">
              <img :src="upImgUrl" alt="">
            </div>
            <p>身份证正面</p>
          </div>
          <div class="fr" @click="choosePhoto('back')">
            <div class="back">
              <img :src="backImgUrl" alt="">
            </div>
            <p>身份证背面</p>
          </div>
        </div>
      </div>
      <div class="open-type-choose pd-1">
        <p>商家类型（单选，选择后不能更改）</p>
        <button :class="{select:merchantType==='A'}" @click="chooseMerchantType('A')" class="fl">农家自产</button>
        <button :class="{select:merchantType==='B'}" @click="chooseMerchantType('B')" class="fr">附近商铺</button>
      </div>
    </section>
    <footer>
      <button class="save-btn" @click="openShop">提交</button>
    </footer>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <image-clip class="the-top" v-if="imageClip" :imgUrl="imgUrl" v-on:clipImage = 'resultImage' :ratio="0.654"></image-clip>
  </div>
</template>

<script>
  import { Actionsheet,Indicator } from 'mint-ui';
  import ImageClip from '@/pages/takePhoto/ImageClip'
  import Header from '@/components/Head'
  import {uploadImg, openShop} from '@/service/service'
  export default {
    name: 'newShop',
    data () {
      return {
        sheetVisible:false,
        actions:[],
        imgUrl:'',
        upImgUrl:'',
        backImgUrl:'',
        imageClip:false,
        realName: "",
        phone: "",
        idCardNo: "",
        idCardFront: "",
        idCardBack: "",
        merchantType: "A",
        idCardType:"",
        reg:{},
        realNameErrMsg:'',
        phoneErrMsg:'',
        idCardNoErrMsg:''
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
      inputChange (type,value) {
        switch (type){
          case 'name':
            break
          case 'tel':
            break
          case 'idCard':
            if(this.reg.idCard.test(value)){
              console.log(value)
            }
            break
        }
      },
      inputBlur(type,value){
        switch (type){
          case 'name':
              if(this.reg.name.test(this.realName.trim())){
                this.realNameErrMsg = ''
                return true
              }else{
                  this.realNameErrMsg = '姓名有误'
                return false
              }
            break
          case 'tel':
            if(this.reg.tel.test(this.phone.trim())){
              this.phoneErrMsg = ''
              return true
            }else{
                this.phoneErrMsg = '手机号码有误'
              return false
            }
            break
          case 'idCard':
            if(this.reg.idCard.test(this.idCardNo.trim())){
              this.idCardNoErrMsg = ''
              return true
            }else{
                this.idCardNoErrMsg = '身份证号码有误'
              return false
            }
            break
        }
      },
      inputFocus (type,value) {
        switch (type){
          case 'name':
            break
          case 'tel':
            break
          case 'idCard':
            break
        }
      },
      chooseMerchantType(type) {
        this.merchantType=type
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
          } else {
          }
        });
      },
      choosePhoto(type){
        this.sheetVisible = true
        this.idCardType = type  //正面 front  反面back
      },
      resultImage(url){
        this.getBase64Image(url)
        this.imageClip = false
        if(this.idCardType==='front'){
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
          console.log(this.idCardType);
          if(this.idCardType ==='front'){
            this.idCardFront = canvas.toDataURL().split(',')[1]
          }else{
            this.idCardBack = canvas.toDataURL().split(',')[1]
          }
        }
      },
      openShop () {
        let arr = ['name','tel','idCard']
        for (let i = 0;i<arr.length;i++){
          if(!this.inputBlur(arr[i])){
              console.log('cuole')
            return
          }
        }
        if(!this.idCardFront || !this.idCardBack){
            alert('请上传证件照')
            return
        }
        Indicator.open('上传中...');
        let shopInfo = {
          realName: this.realName,
          phone: this.phone,
          idCardNo: this.idCardNo,
          idCardFront: this.idCardFront,
          idCardBack: this.idCardBack,
          merchantType: this.merchantType,
          userId: sessionStorage.getItem('userID')
        }
        console.log(shopInfo)
        openShop(shopInfo).then(res=>{
          console.log(res);
          Indicator.close();
          alert('开店成功，转到店铺页面')
          this.$router.push({name:'MyShop'})
        }).catch(err=>{
            alert('开店失败，请重试')
            console.log(err)
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
      this.reg.tel = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);// 手机号码验证
      this.reg.name = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/) //用户姓名
      this.reg.idCard=new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)
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
    position: relative;
    float: none;
    width: 100%;
    line-height: 4rem;
    border-bottom:1px solid #efefef;
  }

</style>
