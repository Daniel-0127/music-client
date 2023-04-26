<template>
  <div>
    <MyLoading></MyLoading>
    <div>
<!--      <LoadSvg></LoadSvg>-->
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="全部歌手" name="first">
          <AllSinger></AllSinger>
        </el-tab-pane>
        <el-tab-pane label="男歌手" name="second">
          <MSinger></MSinger>
        </el-tab-pane>
        <el-tab-pane label="女歌手" name="third">
          <WSinger></WSinger>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>


import AllSinger from "@/components/Singer/AllSinger.vue";
import WSinger from "@/components/Singer/WSinger.vue";
import MSinger from "@/components/Singer/MSinger.vue";

export default {
  name: "HomeSinger",
  components: {MSinger, WSinger, AllSinger},
  data() {
    return {
      activeName: "first",
      loading:true,
    }
  },
  created(){
    // this.$loading()

    setTimeout(()=>{
    this.loading = false
  }, 3000)
}


}

</script>

<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
