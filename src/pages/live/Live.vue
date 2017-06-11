<template>
  <div class="live">
    <el-footer :choose=3></el-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
export default {
  name: 'live',
  data () {
    return {

    }
  },
  components:{
    'el-footer':Footer
  },
  created(){

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
