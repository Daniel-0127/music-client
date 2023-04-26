<template>
  <div style="margin-top: 20px" v-loading.fullscreen.lock="fullscreenLoading">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in values" :key="item.img">
        <h3 text="2xl" justify="center"><img :src="item.img" alt=""></h3>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>


export default {
  name: "HomePage",

  data() {
    return {
      values: [
        {img: require("@/assets/Slideshow/card1.jpg")},
        {img: require("@/assets/Slideshow/card2.jpg")},
        {img: require("@/assets/Slideshow/card3.jpg")},
      ],
      fullscreenLoading: true,//加载动画
    }
  }, methods: {
    openFullScreen2() {
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 500)
    },
  },
  created() {
    this.openFullScreen2()

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  display: block;
  width: 100%;
  background-repeat: no-repeat; /*背景图片不重复*/
  background-size: cover; /*背景图片拉伸铺满*/
}
</style>
