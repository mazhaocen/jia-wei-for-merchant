<template>
  <div class="send-address" >
    <el-header className="go_back" title='发货地址'></el-header>
    <section class="content" style="background-color: #efefef">
      <ul class="send-address-list cl">
        <li><p>发货人</p><input type="text" value="李桥乡" v-model="sendName" :maxlength="20">
          <p class="err-msg">{{nameErrMsg}}</p>
        </li>
        <li><p>手机号码</p><input type="tel" value="13500012345" v-model="photoNum" maxlength="11"><p class="err-msg">{{telErrMsg}}</p></li>
        <li><p>邮政编码</p><input type="tel" value="518000" v-model="ZipCode" maxlength="6"></li>
        <li @click="chooseAddress"><p>地址</p><span v-if="province">{{province}}{{city}}{{country}}</span></li>
        <li><textarea placeholder="请输入具体地址" v-model="inputAddress" :maxlength="100"></textarea>
          <p class="err-msg" style="left: inherit; right: 0;">{{addressErr}}</p>
        </li>
      </ul>
    </section>
    <footer>
      <button class="save-btn" @click="saveSetting">保存</button>
    </footer>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import {MessageBox,Toast,Indicator} from 'mint-ui';
  import {updateShopAddress} from '@/service/service'
  export default {
    name: 'userManage',
    data () {
      return {
        jsonData:window.ADDRESS,
        sendName:'',
        photoNum:'',
        ZipCode:'',
        province:'',
        city:'',
        country:'',
        inputAddress:'',
        selectAddress:'',
        reg:{},
        nameErrMsg:'',
        telErrMsg:'',
        addressErr:''

      }
    },
    created(){
      let addressInfo = JSON.parse(sessionStorage.getItem('shopInfo')).mainContact
      if(addressInfo){
          this.sendName = addressInfo.name
          this.photoNum = addressInfo.phoneNumber
          this.ZipCode = addressInfo.ZipCode
          this.province = addressInfo.province
          this.city = addressInfo.city
          this.country = addressInfo.district
          this.inputAddress = addressInfo.address
      }else{
        this.sendName = ''
        this.photoNum = ''
        this.ZipCode = ''
        this.province = ''
        this.city = ''
        this.country = ''
        this.inputAddress = ''
      }
//      if(sessionStorage.getItem('inputAddress') && sessionStorage.getItem('selectAddress')){
//        this.selectAddress = sessionStorage.getItem('selectAddress')
//        this.inputAddress = sessionStorage.getItem('inputAddress')
//      }
    },
    components:{
      'el-header':Header,
//      'el-picker':Picker
    },
    methods: {
      goToShopSignature () {
          this.$router.push({name:'ShopSignature'})
      },
      chooseAddress () {
        var UIActionSelector = api.require('UIActionSelector');
        UIActionSelector.open({
          datas: this.jsonData,
          layout: {
            sizeActive: 14,
            colorActive: '#008842',
            colorSelected: '#008842'
          },
          cancel: {
            text: '取消',
            size: 14,
            bgActive: '#008842',
            color: '#008842',
            colorActive: '#fff'
          },
          ok: {
            text: '确定',
            size: 14,
            bg: '#008842',
            bgActive: '#fff',
            color: '#fff',
            colorActive: '#008842'
          },
          title: {
            text: '请选择地区',
            size: 12,
            h: 44,
            bg: '#eee',
            color: '#008842'
          },
        }, (ret, err)=>{
          if (ret) {
            this.province=ret.level1,
              this.city=ret.level2,
              this.country=ret.level3,
            this.selectedAddress = ret.selectedInfo
          } else {
//            alert(JSON.stringify(err));
          }
        });
      },
      saveSetting () {
          console.log(!this.reg.name.test(this.sendName))
          if(!this.reg.name.test(this.sendName)){
            this.nameErrMsg = '请正确填写送货人'
            return
          }else if(!this.reg.tel.test(this.photoNum.trim())){
            this.nameErrMsg = ''
            this.telErrMsg = '请正确填写手机号码'
            return
          }else if(!this.inputAddress){
            this.telErrMsg = ''
            this.addressErr = '请填写具体地址'
            return
          }
        this.nameErrMsg = ''
        this.telErrMsg = ''
        this.addressErr = ''
        MessageBox({
          title: '提示',
          message: '您确认保存修改吗？',
          showCancelButton: true,
          confirmButtonText:'确定'
        }).then(res =>{
          if(res ==='confirm'){
            Indicator.open('提交中...')
            let addressInfo = {
              name: this.sendName,
              phoneNumber: this.photoNum,
              province:this.province,
              city:this.city,
              district:this.country,
              zipCode:this.ZipCode,
              address:this.inputAddress
            }
            updateShopAddress(addressInfo).then(res=>{
              let shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'))
              shopInfo.mainContact.name = this.sendName
              shopInfo.mainContact.phoneNumber = this.photoNum
              shopInfo.mainContact.province = this.province
              shopInfo.mainContact.city = this.city
              shopInfo.mainContact.district = this.country
              shopInfo.mainContact.zipCode = this.ZipCode
              shopInfo.mainContact.address = this.inputAddress
              sessionStorage.setItem('shopInfo',JSON.stringify(shopInfo))
              Indicator.close()
              Toast({
                message: '修改成功',
                iconClass: 'mintui mintui-success'
              });
              history.go(-1)
              console.log(res.data.content)
            }).catch(err =>{
              Toast({
                message: '修改失败，请重试',
              });
              console.log(JSON.stringify(err.response))
              console.log(JSON.stringify(err))
              Indicator.close()
            })
          }else{

          }
        });
      }
    },
    mounted () {
      this.reg.tel = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);// 手机号码验证
      this.reg.name = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/) //用户姓名
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .send-address-list>li>textarea{
    font-size: 1.333rem;
    min-height: 5rem;
    height:auto;
    width: 100%;
    padding-top: 1rem;
    white-space: normal;
  }
  .send-address-list>li>input{
    width: 70%;
    float: right;
    text-align: right;
    height: 3.888rem;
    font-size: 1.333rem;
  }
  .send-address-list>li>span{
    display: inline-block;
    width: 50%;
    float: right;
    text-align: right;
  }
  .send-address-list>li>p.err-msg{
    color: #ff5956;
    font-size: 12px;
    left: 9rem;
    right: initial;
  }
  .send-address-list>li>p{
    display: inline-block;
    color: #5f646e;
  }
  .send-address-list>li{
    width: 100%;
    background-color: #ffffff;
    padding: 0 1rem;
    border-bottom:1px solid #efefef;
    line-height: 3.888rem;
    font-size: 1.333rem;
    position: relative;
  }
</style>
