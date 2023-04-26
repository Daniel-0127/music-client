<template>
  <div>
    <div id="bg1"></div>
    <div id="title">
      <div>
        <img :src="global.UserPath+store.state.user.id+'.jpg'+'?'+new Date()" alt="头像"
             @click="centerDialogVisible = true">
      </div>
      <div>
        <p style="font-size: 40px;padding: 20px">{{ store.state.user.username }}</p>
        <p style="font-size: 28px;padding: 20px">{{ store.state.user.introduce }}</p>
      </div>


    </div>
    <el-dialog
        v-model="centerDialogVisible"
        title="修改头像"
        width="30%"
        align-center
    >
      <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          method="put"
          :on-success="OnSuccess"
          :action="action"
          :data="{id:store.state.user.id}"
          multiple
          :auto-upload="false"
      >
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
       <el-button class="ml-3" type="success" @click="this.$refs.uploadRef.submit()">
      确认修改
    </el-button>
      </span>
      </template>
    </el-dialog>
    <div id="love">
      <el-divider content-position="left"><h1>我的收藏</h1></el-divider>
      <div style="margin-bottom: 100px">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <TitleList :my-data="my_data" v-infinite-scroll="load"
                     class="list"
                     :infinite-scroll-disabled="disabled">

          </TitleList>
          <p v-if="loading">Loading...</p>
          <p v-if="noMore">No more</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import global from "@/tools/global"
import store from "@/store";
import {UploadFilled} from "@element-plus/icons-vue";
import {computed} from 'vue'
import TitleList from "@/components/Common/TitleList.vue";

export default {
  name: "HomeUser",
  components: {TitleList, UploadFilled},
  computed: {
    store() {
      return store
    },
    global() {
      return global
    },
  },
  data() {
    return {
      centerDialogVisible: false,
      action: "http://localhost:8063/user/upload",
      all_data: null,
      my_data: null,
      loading: false,
      size: 10,
      noMore: false,
      disabled: computed(() => this.loading || this.noMore)
    }
  },
  methods: {
    SearchLove() {
      this.axios.get("/love/SelectList", {params: {user_id: store.state.user.id}}).then((res) => {
        console.log(res.data)
        this.noMore = computed(() => this.size >= res.data.length)
        this.all_data = res.data
        this.my_data = res.data.slice(0, this.size)
      })
    },
    OnSuccess(res) {
      this.$message.success(res)
      this.$router.push({path: "/HomeMain/MyEmpty", query: {id: 2}})
    },
    load() {
      this.loading = true
      setTimeout(() => {

        this.size += 5
        this.loading = false
        this.my_data = this.all_data.slice(0, this.size)
      }, 2000)
    }
  },
  created() {
    this.SearchLove();
  }
}
</script>

<style scoped>
#bg1 {
  width: 99vw;
  height: 150px;
  background-color: rgba(51, 113, 243, 0.6);
  margin-left: -105px;
  margin-top: -8px;
}

#title {
  margin-top: -100px;
}

#title div:first-child {
  width: 206px;
  height: 206px;
  border-radius: 50%;
  background-color: #fff;
  float: left;
}

#title div:last-child {
  float: left;
  width: 900px;
  height: 200px;
  padding-top: 20px;
  margin-left: 40px;
  /*background-color: #80e171;*/
}

#title img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 3px 0 0 3px;
  cursor: pointer

}

:deep(.upload-demo) {
  font-family: "微软雅黑", Arial, sans-serif;
}

#love {
  margin-top: 250px;
}

#love p {
  font-size: 26px;
  text-align: center;
}
</style>
