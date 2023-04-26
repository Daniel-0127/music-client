<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HomeMain from "@/components/Home/HomeMain.vue";
import MyTest from "@/components/Home/MyTest.vue";

export default {
  name: 'App',
  components: [HomeMain,MyTest],

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color:#333;
  font-weight: bolder;
}
a:hover{
  color: #409eff;
}
#app{
  font-family: STXingkai,Microsoft YaHei,serif;
}
.el-popover{
  min-width: 90px !important;
}
</style>
