<template>
  <div>
    <img id="bg" :src="bg" alt="图片">
    <div id="div1">
      <div id="div2">
        <p style="font-size: 26px">账号注册</p>
        <div id="box" @keyup.enter="Loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="84px">
            <el-form-item label="用户" prop="username" :rules="rules.username">
              <el-input class="el-input" v-model="ruleForm.username" placeholder="请输入账号" clearable
                        prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="newPwd" :rules="rules.newPwd">
              <el-input class="el-input" v-model="ruleForm.newPwd" placeholder="请输入密码" show-password
                        prefix-icon="Grid"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd" :rules="rules.confirmPwd">
              <el-input class="el-input" v-model="ruleForm.confirmPwd" placeholder="确认密码" show-password
                        prefix-icon="Grid"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio-button :label="1" defult>男</el-radio-button>
                <el-radio-button :label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item  prop="mobile" label="手机号" :rules="rules.mobile">
              <el-input v-model="ruleForm.mobile" class="w-50 m-2" placeholder="手机号码"/>
            </el-form-item>
            <el-form-item prop="email" label="Email" :rules="rules.email">
              <el-input v-model="ruleForm.email" />
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
            <el-form-item>
              <div id="butt">
                <el-row class="mb-4">
                  <el-button id="but" type="primary" round @click="Loading">注册</el-button>
                </el-row>
              </div>
            </el-form-item>
          </el-form>
          <div id="last">
            <span>
            已有账号？<router-link to="/HomeMain/HomeLogin">去登陆</router-link>
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRegister",
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
        username: '',
        newPwd: '',
        confirmPwd: '',
        sex: 1,
        mobile: "",
        email:"",
        birth: "",
        introduce: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, message: '长度在 2 到 16 个字符', trigger: 'blur'}
        ],
        newPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
        ],
        confirmPwd: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur', required: true}
        ],
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }

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
    formatDateTime(date, format) {
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
        a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
        A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
              RegExp.$1,
              RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
      return format;
    },
    Loading() {
      // const router=useRouter()
      this.axios.post("/user/insert", {

        username: this.ruleForm.username,
        password: this.ruleForm.confirmPwd,
        sex: this.ruleForm.sex,
        email:this.ruleForm.email,
        birth: this.formatDateTime(this.ruleForm.birth, 'yyyy-MM-dd HH:mm:ss'),
        introduce: this.ruleForm.introduce,
        phone_number: this.ruleForm.mobile

      }).then((res) => {
        console.log(res)
        if (res.data) {
          this.$message.success('注册成功!')
          this.$router.push('/HomeMain/HomeLogin')
        } else {
          this.$message.error("账号已存在")
          this.$router.push('/HomeMain/HomeLogin')
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
  margin: 10vh auto;
  /*background-color: rgba(218, 165, 165, 0.59);*/
}

#box {
  /*margin-top: 20px;*/
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
