<template>
  <button class="get-code" @click="getSecurityCode"  :class="{active:securityCode=='获取验证码'}">{{securityCode}}</button>
</template>

<script>
  import {verifyPhoto} from '@/service/service'
export default {
  name: 'getCode',
  data () {
    return {
      securityCode:'获取验证码',
      waitTime:90,
      getCodeTime:90
    }
  },
  created(){
  },
  props:['title','className','goTo','set','photoNum'],
  methods:{
    getSecurityCode(){
      if(parseInt( this.securityCode)){
        return
      }else{
        this.securityCode = this.getCodeTime +'s'
        let msgTime = setInterval( () => {
          this.securityCode = this.getCodeTime-1+'s'
          this.getCodeTime--
          if(this.getCodeTime===-1){
            clearInterval(msgTime)
            this.securityCode = '获取验证码'
            this.getCodeTime = this.waitTime
          }
        },1000)

        verifyPhoto(this.photoNum).then(res=>{
          sessionStorage.setItem('photoNum',this.photoNum)
            console.log(res)
        }).catch(err=>{
          console.log(err.response.data.message)
          sessionStorage.setItem('codeErrMsg',err.response.data.message)
          this.codeErr(err.response.data.message)
        })
      }
    },
    codeErr(value){
      this.$emit('codeErr',value)
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
