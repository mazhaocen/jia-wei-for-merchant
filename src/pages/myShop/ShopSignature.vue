<template>
  <div class="shop-signature">
    <el-header className="go_back" :title="title"></el-header>
    <section class="content" style="background-color: #efefef">
      <textarea v-model="shopText" maxlength="40"></textarea>
      <div class="pd-1">
        <span>店铺座右铭说明：</span>
        <p>1.不能包含（￥%&*@）等特殊字符;</p>
        <p>2.签名长度不能超过40个字符;</p>
      </div>
    </section>
    <footer>
      <button class="save-btn" @click="saveSetting">保存</button>
    </footer>
  </div>
</template>

<script>
  import Header from '@/components/Head'
  import {MessageBox,Toast} from 'mint-ui';

  export default {
    name: 'userManage',
    data () {
      return {
        title: '',
        shopText: ''
      }
    },
    created(){
      this.getTitle(this.$route.params.title)
      this.shopText = sessionStorage.getItem('my-shop-content')
    },
    components: {
      'el-header': Header
    },
    methods: {
      getTitle (title) {
        if (title === 'sign') {
          return this.title = '店铺签名'
        } else if (title === 'name') {
          return this.title = '店铺名称'
        }
      },
      saveSetting () {
        MessageBox({
          title: '提示',
          message: '您确认修改吗？',
          showCancelButton: true,
          confirmButtonText:'确定'
        }).then(res =>{
          if(res ==='confirm'){
            sessionStorage.setItem(this.$route.params.title,this.shopText)
            Toast({
              message: '修改成功',
              iconClass: 'mintui mintui-success'
            });
            history.go(-1)
          }else{

          }
        });

      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shop-signature .pd-1 {
    color: #999999;
  }

  .shop-signature textarea {
    resize: none;
    width: 100%;
    padding: 1rem;
    height: 8rem;
    font-size: 1.333rem;
    margin: .3rem 0;
  }

</style>
