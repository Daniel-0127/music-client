<template>
  <div>
    <img id="bg" :src="bg" alt="图片">
    <div id="div1">
      <div id="div2">
        <p style="font-size: 26px">账号登陆</p>
        <div id="box">
          <el-form :model="ruleForm" ref="ruleForm">
            <el-form-item prop="username" :rules="rules.username">
              <el-input class="el-input" v-model="ruleForm.username" placeholder="请输入账号" clearable
                        prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="newPwd" >
              <el-input  @keyup.enter="Loading" class="el-input" v-model="ruleForm.newPwd" placeholder="请输入密码" show-password
                        prefix-icon="Grid"></el-input>
            </el-form-item>
            <el-form-item>
              <div id="butt">
                <el-row class="mb-4">
                  <el-button id="but" type="primary" round @click="Loading">登陆</el-button>
                </el-row>
              </div>
            </el-form-item>
          </el-form>
          <div id="last">
      <span>
        您还没有账号？<router-link to="/HomeMain/HomeRegister">去注册</router-link>
      </span>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>

import store from "@/store";

export default {
  name: "HomeLogin",
  data() {
    return {
      bg: require("@/assets/2.png"),
      i_code: "",
      // changePwdDialog: false,//修改密码弹框
      ruleForm: {
        username: '',
        newPwd: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, message: '长度在 2 到 16 个字符', trigger: 'blur'}
        ],
      }
    }

  },
  methods: {
    Loading() {
      this.axios.get("/user/selectOne", {
        params: {
          username: this.ruleForm.username,
          password: this.ruleForm.newPwd,
        }
      }).then((res) => {
        console.log(res)
        if (res.data != null && res.data !=="") {
          this.$message.success('登陆成功!')
          store.commit('UpdateUser',res.data)
          this.$router.push('/HomeMain')
        } else {
          this.$message.error("登陆失败!")
        }

      })
    }
  }

}
</script>

<style scoped>
#bg {
  float: left;
  width: 49%;
  height: 600px;
}

#div1 {
  float: left;
  width: 49%;
  height: 600px;
  /*background-color: #b61b1b;*/
}

#div2 {
  text-align: center;
  width: 400px;
  height: 200px;
  margin: 12vh auto;
  /*background-color: rgba(218, 165, 165, 0.59);*/
}
#box{
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}


a {
  text-decoration: none;
  color: #2323c5;
}



#butt {
  margin: 0 auto;
}

:deep(#but) {
  width: 250px;
  font-size: 23px;
}

#last {
  width: 80%;
  font-size: 15px;
  margin: 0 auto;
}

#last span:nth-child(1) {
  float: left;
}

</style>
