<template>
  <div>
    <div style="width: 600px;margin-left: 50px">
      <div style="width: 600px;">
        <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="84px">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input class="el-input" v-model="ruleForm.oldPwd" placeholder="请输入旧密码" clearable
                      prefix-icon="Grid"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd" :rules="rules.newPwd">
            <el-input class="el-input" v-model="ruleForm.newPwd" placeholder="请输入新密码" show-password
                      prefix-icon="Grid"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd" :rules="rules.confirmPwd">
            <el-input class="el-input" v-model="ruleForm.confirmPwd" placeholder="确认密码" show-password
                      prefix-icon="Grid"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin:30px 0 0 250px">
<!--          <el-button>取消</el-button>-->
          <el-button type="primary" @click="Update" >修改</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ChaPwdUser",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      bg: require("@/assets/2.png"),
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
      },
      rules: {
        newPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
        ],
        confirmPwd: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur', required: true}
        ],

      }
    }
  },
  methods:{
    Update(){
      this.axios.put("/user/update",{id:store.state.user.id,password:this.ruleForm.newPwd}).then((res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
