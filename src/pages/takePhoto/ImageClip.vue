<template>
  <div class="image-clip">
    <!--<div class="top">-->
      <!--<span class="fl">闪光灯</span>-->
      <!--<span class="fr">换摄像头</span>-->
    <!--</div>-->
    <!--<div v-if="imagePath" :style="{width:width+'px',height:height+'px'}"><img :src="imagePath" alt=""></div>-->
    <div class="bottom">
      <div>
        <span class="cancel" @click="imgCancel">取消</span><span class="reset" @click="imgReset">重置</span><span class="sure" @click="imgSave">确定</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'imageClip',
    data () {
      return {
        takeTime: new Date().getTime(),
//        width: window.screen.width,
//        height: window.screen.height - 125,
        imagePath: ''
      }
    },
    created(){
        var FNImageClip = api.require('FNImageClip');
        FNImageClip.open({
          rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight-50
          },
          srcPath: this.imgUrl,
          style: {
            mask: 'rgba(255,255,255,0.3)',
            clip: {
              w: api.winWidth,
              h: api.winWidth*this.ratio,
              x: 0,
              y: (api.winHeight-50-(api.winWidth*this.ratio))/2,
              borderWidth: 0,
              appearance: 'rectangle'
            }
          },
          mode:'image',
          fixedOn: api.frameName
        }, (ret, err)=> {
          if (ret) {
//            alert(JSON.stringify(ret));
          } else {
//            alert(JSON.stringify(err));
          }
        });
    },
    props:{
      imgUrl:String,
      ratio:{
        type:Number,
        default:1
      }},
    methods: {
      imgCancel() {
        let FNImageClip = api.require('FNImageClip');
        FNImageClip.close();
        this.$emit('clipImage','')
      },
      imgSave(){
        let FNImageClip = api.require('FNImageClip');
        FNImageClip.save({
          destPath: 'fs://imageClip/'+this.takeTime+'.png',
          copyToAlbum: false,
          quality: 1
        }, (ret, err)=> {
          if (ret) {
//            alert(JSON.stringify(ret));
//            console.log(JSON.stringify(ret));
//            sessionStorage.setItem('clipImageUrl',ret.albumPath)
            FNImageClip.close();
            this.$emit('clipImage',ret.destPath)
          } else {
//            alert(JSON.stringify(err));
//            console.log(JSON.stringify(err));
          }
        });
      },
      imgReset(){
        let FNImageClip = api.require('FNImageClip');
        FNImageClip.reset();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image-clip .bottom .sure{
    float: right;
    border-left:1px solid #ffffff;
  }
  .image-clip .bottom .cancel{
    float: left;
    border-right:1px solid #ffffff;
  }
  .image-clip .bottom span{
    width: 33.333%;
    text-align: center;
    font-size: 1.1rem;
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .image-clip .bottom{
    background-color: #008842;
    height: 50px;
    color: #fff;
    line-height: 50px;
    position: fixed;
    bottom:0;
    width: 100%;
  }
</style>
