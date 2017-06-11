<template>
  <div class="cooker">
    <el-footer :choose=2></el-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Foot'
export default {
  name: 'cooker',
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
