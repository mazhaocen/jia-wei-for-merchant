<template>
  <div class="add_goods">
    <el-header title='发布宝贝' className="go_back"></el-header>
    <section class="content" style="padding-bottom: 0">
      <div class="goods-img" @click="sheetVisible = true">
        <i><img :src="item.headImageLink" alt=""></i>
      </div>
      <form action="">
        <div class="pd-1 goods-title pr">
          <p>输入商品的标题</p>
          <input type="text" v-model.trim="item.title" maxlength="30" v-on:blur="inputBlur(item.title,'title')" >
          <span style="line-height: 3rem;">{{item.title.length}}/30</span>
          <b>{{titleErrMsg}}</b>
        </div>
        <div class="goods-msg">
          <div @click="popupVisible = true">
            <span>类目 </span>
            <input type="text" :value="item.type | typeFilter(value)" placeholder="请选择商品类型" readonly >
            <b>{{typeErrMsg}}</b>
          </div>
          <div>
            <span>价格 </span>
            <input maxlength="10" type="number" v-model.trim="item.price" v-on:blur="inputBlur(item.price,'price')" placeholder="0.00"><i>/500g</i>
          </div>
          <div>
            <span>库存 </span>
            <input maxlength="10" type="number" v-model.trim="item.stockQuantity" v-on:blur="inputBlur(item.stockQuantity,'stockQuantity')" placeholder="0"><i>/份</i>
          </div>
          <div>
            <span>运费 </span>
            <input maxlength="10" type="number" v-model.trim="item.shippingCost" v-on:blur="inputBlur(item.shippingCost,'shippingCost')" placeholder="0.00"><i>/元</i>
          </div>
          <div><p>宝贝描述</p><textarea v-model.trim="item.description" maxlength="100" v-on:blur="inputBlur(item.description,'description')"></textarea><i
            style="top: 0;">{{item.description.length}}/100</i>
            <b>{{descriptionErr}}</b>
          </div>
          <!--<div><p>发货地址</p><textarea></textarea><i></i></div>-->
        </div>
        <div class="my-shop-btn">
          <button type="button" @click="saveORPutAway('OFF')">放入仓库</button>
          <button type="button" @click="saveORPutAway('ON')" >立即发布</button>
        </div>
      </form>
    </section>
    <mt-popup v-model="popupVisible" position="bottom" class="type-list">
      <mt-checklist
        title="类目选项"
        v-model="item.type"
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
  import {Popup, Checklist, MessageBox,Toast,Actionsheet,Indicator} from 'mint-ui';
  import ImageClip from '@/pages/takePhoto/ImageClip'
  import {saveGoodsInfo} from '@/service/service'
  export default {
    name: 'AddGoods',
    data () {
      return {
        sheetVisible: false,
        popupVisible: false,
        actions: [],
        value: [],
        options: [],
        item: {title: '',type:[] ,price: 0, stockQuantity:0,shippingCost: 0, description: '',id:'',headImageLink:''},
        titleErrMsg:'',
        typeErrMsg:'',
        descriptionErr:'',
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
      if(sessionStorage.getItem('goodsInfo')){
          let item = JSON.parse(sessionStorage.getItem('goodsInfo'))
        this.item =item
        this.item.type = item.type.split(',')
//          title: item.title,
//          type:item.type.split(',') ,
//          price: item.price,
//          stockQuantity:item.stockQuantity,
//          shippingCost: item.shippingCost,
//          description: item.description,
//          id:item.id,
//          headImageLink:item.headImageLink
//        }
        sessionStorage.removeItem('goodsInfo')
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
      this.options = ['水果', '蔬菜', '生肉', '海鲜', '禽类', '水产品', '速冻食品', '农副产品','土特产','山货','粮食','茶','其他'];
    },
    methods: {
      inputBlur(value, type){
//          console.log(!value)
        switch (type){
          case 'title':
//              if(!value){
//                  this.titleErrMsg = '请输入商品名称'
//              }else{
//                this.titleErrMsg = ''
//              }
            break
          case 'type':
            break
          case 'price':
            this.item.price = this.toDecimal2(value)
            break
          case 'stockQuantity':
            this.item.stockQuantity = parseInt(value)
            break
          case 'shippingCost':
            this.item.shippingCost = this.toDecimal2(value)
            break
          case 'description':
            break

        }
      },
//      univalence (value, text){ //   数字校验
//        console.log(/^\d+(\.\d{0,2})?$/.test(value))
//        if (!(/^\d+(\.\d{0,2})?$/.test(value))) {
//          return false
//        }
//      },
      toDecimal2 (x) { // 保留两位小数
        var f = parseFloat(x);
        if (isNaN(f)) {
          return 0;
        }
        f = Math.round(f * 100) / 100;
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
      // 保存仓库  立即发布
      saveORPutAway (type) {
        if(!this.verifiedInput()) {
          return
        }
        MessageBox({
          title: '提示',
          message: '您确认将此商品'+ (type==='OFF'?'放入仓库':'上架')+'吗？',
          showCancelButton: true,
          confirmButtonText:'确定'
        }).then(res =>{
          if(res ==='confirm'){
            Indicator.open('正在'+(type==='OFF'?'保存':'上架')+'...')
            this.saveGoodsInfo(type)
          }else{
          }
        });
      },

      verifiedInput(){
        this.titleErrMsg=''
        this.typeErrMsg=''
        this.descriptionErr=''
        console.log(!this.item.title,this.item.type.length===0,!this.item.description);
        if(!this.item.title){
          this.titleErrMsg='请输入商品标题'
          return false
        }else
        if(this.item.type.length===0){
          this.typeErrMsg='请选择商品类型'
          return false
        }else
        if(!this.item.description){
          this.descriptionErr='请输入商品描述'
          return false
        }
        return true
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
        if(url){
          this.getBase64Image(url)
          this.item.headImageLink = url
        }
        this.imageClip = false
      },
      getBase64Image (url,callback) {//转base64
        let img = new Image();
        img.src = url;
        img.onload = ()=>{
          let canvas = document.createElement("canvas");
          canvas.width = api.winWidth;
          canvas.height = api.winWidth*0.3963;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          this.item.headImage = canvas.toDataURL().split(',')[1]
//          this.uploadImg()
        }
      },
      saveGoodsInfo (type) {
        let item = JSON.parse(JSON.stringify(this.item))
        item.type = item.type.join(',')
        console.log(JSON.stringify(item))

        saveGoodsInfo(type,item).then(res=>{
          Indicator.close()
          Toast({
            message: (type==='ON'?'上架':'保存')+'成功',
            iconClass: 'mintui mintui-success'
          });
            console.log(res)
        }).catch(err=>{
            console.log(err)
            console.log(err.response)
          console.log(JSON.stringify(err))
          console.log(JSON.stringify(err.response))
          Indicator.close()
          Toast({
            message: '保存失败,请重试！',
          });
        })
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
