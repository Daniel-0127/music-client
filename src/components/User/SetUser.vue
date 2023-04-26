<template>
  <div id="div1">

    <el-divider content-position="left"><h1>设置</h1></el-divider>
    <div id="div2">
      <el-row class="tac">
        <el-col :span="3">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="1">
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span>更改密码</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span>账号和安全</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomeSet"
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
