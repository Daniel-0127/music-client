<template>
  <div style="width: 600px;margin-left: 50px">
    <div style="width: 600px;">
      <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="84px">
        <el-form-item label="用户" prop="username" :rules="rules.username">
          <el-input class="el-input" v-model="ruleForm.username" placeholder="请输入账号" clearable
                    prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio-button :label="1" defult>男</el-radio-button>
            <el-radio-button :label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" :rules="rules.mobile">
          <el-input v-model="ruleForm.mobile" class="w-50 m-2" placeholder="手机号码"/>
        </el-form-item>
        <el-form-item prop="email" label="Email" :rules="rules.email">
          <el-input v-model="ruleForm.email"/>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
                v-model="ruleForm.birth"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input v-model="ruleForm.introduce" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin:30px 0 0 250px">
      <el-button>取消</el-button>
      <el-button type="primary" @click="Update">修改</el-button>
    </div>

  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ProfileUser",
  data() {
    return {
      bg: require("@/assets/2.png"),
      ruleForm: {
        id: "",
        username: '',
        sex: 1,
        mobile: "",
        email: "",
        birth: "",
        introduce: "",
        aaa: false,
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, message: '长度在 2 到 16 个字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号必填', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}

        ],
        email: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          }, {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]
      }
    }
  },

  methods: {
    Update() {
      console.log(typeof this.ruleForm.birth)
      this.axios.put("/user/update", {
        id: this.ruleForm.id,
        username: this.ruleForm.username,
        password: this.ruleForm.confirmPwd,
        sex: this.ruleForm.sex,
        email: this.ruleForm.email,
        birth: this.ruleForm.birth,
        introduce: this.ruleForm.introduce,
        phone_number: this.ruleForm.mobile

      }).then((res) => {
        console.log(res)
        if (res.data) {
          this.$message.success('修改成功!')
        } else {
          this.$message.error("错误！")
        }
      })
    }
  },
  created() {
    this.ruleForm.id = store.state.user.id;
    this.ruleForm.username = store.state.user.username;
    this.ruleForm.sex = store.state.user.sex;
    this.ruleForm.mobile = store.state.user.phone_number;
    this.ruleForm.email = store.state.user.email;
    this.ruleForm.introduce = store.state.user.introduce;
    this.ruleForm.birth = store.state.user.birth;
  }
}
</script>

<style scoped>

</style>
