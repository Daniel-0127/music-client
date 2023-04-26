<template>
  <div id="bg" v-show="my_show">
    <div id="text">
      <div class="spinner-box">
        <div class="configure-border-1">
          <div class="configure-core"></div>
        </div>
        <div class="configure-border-2">
          <div class="configure-core"></div>
        </div>
      </div>
      <h2 style="color: white;text-align: center;margin-top: -60px">努力加载中ing</h2>
    </div>
  </div>

</template>

<script>
export default {
  name: "MyLoading",
  data() {
    return {
      my_show: true,
    }
  },
  created() {
    setTimeout(() => {
      this.my_show = false
    }, 1500)
  }

}
</script>

<style scoped>
#bg {
  top:0;
  left: 0;
  /*margin: auto;*/
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
}

/* KEYFRAMES */
#text {
  width: 325px;
  /*height: 400px;*/
  margin: 200px auto;
  /*position: fixed;*/

  /*top: 0;*/
  z-index: 99;
  /*background-color: #fff;*/
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes configure-clockwise {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes configure-xclockwise {
  0% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-135deg);
  }
  75% {
    transform: rotate(-215deg);
  }
  100% {
    transform: rotate(-305deg);
  }
}

@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}

/* GRID STYLING */

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background-color: #37474f;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}


/* X-ROTATING BOXES */

.configure-border-1 {
  width: 88px;
  height: 88px;
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffab91;
  animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
}

.configure-border-2 {
  width: 88px;
  height: 88px;
  padding: 3px;
  left: -115px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(63, 249, 220);
  transform: rotate(45deg);
  animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
  width: 100%;
  height: 100%;
  background-color: #37474f;
}


</style>
