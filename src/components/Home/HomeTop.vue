<template>
  <div id="top">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        text-color="black"
        active-text-color=""
        router
        default-active="/HomeMain"

    >
      <div id="logo">
        <performance theme="outline" size="45" fill="black"/>
        <strong id="text1">Yz-music</strong>

      </div>
      <el-menu-item index="/HomeMain/HomePage">首页</el-menu-item>
      <el-menu-item index="/HomeMain/HomeSong">歌单</el-menu-item>
      <el-menu-item index="/HomeMain/HomeSinger">歌手</el-menu-item>

      <div class="demo-input-size" style="margin: auto 10px" @keyup.enter="MySearch">
        <el-input
            v-model="input"
            class="w-50 m-2"
            placeholder=" 搜索"
            :prefix-icon="Search"
        />
      </div>
      <div style="width: 20vw;"></div>

      <el-menu-item index="/HomeMain/HomeLogin" class="log" v-if="store.state.user==null">登陆</el-menu-item>
      <el-menu-item index="/HomeMain/HomeRegister" class="log" v-if="store.state.user==null">注册</el-menu-item>
      <div v-else id="user">


        <el-popover
            placement="bottom"
            :width="50"
            trigger="click"
        >
          <ul>
            <li @click="GRZX">个人中心</li>
            <li @click="SZ">设置</li>
            <li @click="TC">退出</li>
          </ul>
          <template #reference>
            <img :src="global.UserPath+store.state.user.id+'.jpg'+'?'+new Date()" alt="11" style="cursor: pointer;">
          </template>
        </el-popover>

      </div>

    </el-menu>
  </div>
</template>

<script>
import {Performance, Search} from "@icon-park/vue-next";
import store from "@/store";
import global from "@/components/tools/global"


export default {
  name: "HomeTop",
  computed: {
    global() {
      return global
    },
    store() {
      return store
    },
    Search() {
      return Search
    }
  },
  components: {Performance},
  data() {
    return {
      input: "",
      show1: true,
      data_: null,
      user: null,
    }
  },
  methods: {
    MySearch() {
      this.axios.get("/song/SelectByUser", {params: {data: this.input}}).then((res) => {
        // console.log(res);
        // this.data_ = res.data;

        store.commit('UpdateSearchList', res.data)
        this.$router.push({path: '/HomeMain/MyEmpty',query:{id:1}})
      })
    },
    // 个人中心
    GRZX() {
      this.$router.push('/HomeMain/HomeUser')
    },
    // 设置
    SZ() {
      this.$router.push('/HomeMain/SetUser')
    },
    // 退出
    TC() {
      store.commit('UpdateUser',null),
          this.$router.push('/')
    }

  },
  created() {
    this.user = store.state.user

  }
}
</script>

<style scoped>
#top {
  width: 99vw;
  top: -3px;
  position: fixed;
  z-index: 99;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

/*logo*/
#logo {
  float: left;
  margin-left: 6vw;
  margin-top: 1vh;
  width: 15vw;
}

#text1 {

  font-family: STKaiti, Microsoft YaHei, serif;
  float: right;
  margin-right: 1vw;
  width: 10vw;
  text-align: center;
  font-size: 32px;
}

/*菜单*/
:deep(.el-menu-item) {
  font-size: 24px;
}

/*搜索框*/

:deep(.el-input__wrapper) {
  border-radius: 10px;
  width: 300px;
  box-shadow: none;
  background-color: rgba(229, 225, 225, 0.35);
}

:deep(.el-input__prefix) svg {
  width: 20px;
  height: 20px;
  display: block;

}

:deep(.el-input__inner) {
  font-size: 16px;
  font-weight: bolder;
}

/*登陆*/

.log {
  float: right;
}

/*用户*/
#user {
  padding-left: 160px;
  padding-top: 10px;
}

#user img {
  height: 50px;;
  width: 50px;
}

ul li {
  list-style: none;
  margin-top: 10px;
  /*padding-left: 20px;*/
  cursor: pointer;
  text-align: left;
}

</style>
