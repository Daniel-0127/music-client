<template>
  <div id="div1">

    <el-divider content-position="left"><h1>设置</h1></el-divider>
    <div id="div2">
      <el-row class="tac">
        <el-col :span="3">
          <el-menu
              default-active="/HomeMain/SetUser/ProfileUser"
              class="el-menu-vertical-demo"
              router

          >
            <el-menu-item index="/HomeMain/SetUser/ProfileUser" >
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="/HomeMain/SetUser/ChaPwdUser">
              <span>更改密码</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span>账号和安全</span>
            </el-menu-item>

          </el-menu>
        </el-col>
        <router-view></router-view>
      </el-row>

    </div>

  </div>
</template>

<script>
export default {
  name: "SetUser"
}
</script>

<style scoped>
#div1 {
  /*width: 1200px;*/
  /*height: 1000px;*/
  margin-top: 100px;
}
#div2{
  width: 1000px;
  margin: 0 auto;
}

</style>
