<template>
<div v-loading.fullscreen.lock="fullscreenLoading"
     element-loading-text="拼命加载中"
     :element-loading-spinner="svg"
     element-loading-svg-view-box="-10, -10, 50, 50"
     element-loading-background="rgba(0, 0, 0, 0.8)"
     style="width: 100%">

</div>
</template>

<script>
export default {
  name: "LoadSvg",
  data() {
    return {
      activeName: "first",
      svg:  `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
      fullscreenLoading: true,//加载动画
    }
  },
  methods: {
    openFullScreen2() {
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 1250)
    },
  },
  created() {

    this.openFullScreen2()
  }
}
</script>

<style scoped>

</style>
