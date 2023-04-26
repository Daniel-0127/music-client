<template>
  <div style="width: 100%;">

    <HomeTop></HomeTop>


    <div style="width: 86%;margin: 73px auto;">
      <router-view></router-view>
    </div>

    <AudioPlayer></AudioPlayer>

    <el-backtop :bottom="120">
      <div
          style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>


import AudioPlayer from "@/components/Common/AudioPlayer.vue";
import HomeTop from "@/components/Home/HomeTop.vue";

export default {
  name: "HomeMain",
  components: {HomeTop, AudioPlayer},
}
</script>

<style scoped>

</style>
