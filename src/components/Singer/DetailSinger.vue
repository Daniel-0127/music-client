<template>
  <div>
    <div id="left">
      <img :src="SingerPath+singer+'.jpg'" alt="歌手图片">
      <h2>基本资料</h2>
      <p>性别: {{ sex }}</p>
      <p>生日: {{ birth }}</p>
      <p>出生地址: {{ address }}</p>
    </div>
    <div id="right">
      <div style="padding: 30px">
        <h3>{{ singer }}</h3>
        <p>{{ introduce }}</p>
      </div>
      <div style="">
        <TitleList :my-data="this.data_" style="height: 400px;"></TitleList>
      </div>

      <div style="margin-top: 20px"></div>
      <el-pagination background layout="prev, pager, next" v-model:page-count="total" v-model:current-page="page"
                     @update:current-page="getSongs()" />
    </div>
  </div>
</template>

<script>


import TitleList from "@/components/Common/TitleList.vue";
import global from "@/tools/global"
export default {
  name: "DetailSinger",
  components: {TitleList},
  data() {
    return {
      SingerPath:global.SingerPath,
      page: 1,
      total: 1,
      size: 8,
      singer_id: "",
      singer: null,
      sex: "",
      address: "",
      introduce: "",
      birth: "",
      img: "",
      data_: [{
        album: "18 Plus ",
        create_time: "2023-03-27 16:53:54",
        id: 1,
        name: "A.I.N.Y.",
        singer: "G.E.M. 邓紫棋",
        update_time: "2023-03-27 16:53:54",
      }]
    }
  },

  methods: {
    getSinger() {
      this.axios.get("/singer/selectById", {params: {id: this.singer_id}}).then((res) => {
        console.log(res)
        this.total = parseInt(res.data.total);
        this.singer = res.data.name;
        this.address = res.data.address;
        this.introduce = res.data.introduce;
        this.birth = res.data.birth;
        if (res.data.sex === 1) {
          this.sex = "男"
        } else {
          this.sex = "女"
        }
        this.getSongs()

      })
    },
    getSongs() {
      this.axios.get("/song/selectSongsMap", {
        params: {
          size: this.size,
          page: this.page,
          singer: this.singer
        }
      }).then((res1) => {
        console.log(res1)
        this.data_ = res1.data.row
        this.total = res1.data.total
      })
    }


  },
  created() {
    this.singer_id = this.$route.query.id
    this.singer = this.$route.query.name
    this.getSinger()
  }
}
</script>

<style scoped>
* {
  font-family: "微软雅黑", Arial, sans-serif;
}

#left {
  float: left;
  width: 23%;
  /*background-color: #d32020;*/

}

#left img {
  margin-top: 40px;
  width: 280px;
  height: 280px;
  border-radius: 10px;
}

#left * {
  margin-left: 30px;
}

#right {
  float: left;
  width: 77%;
  margin-bottom: 90px;
  /*background-color: rgba(176, 84, 84, 0.76);*/
}

.el-pagination {
  justify-content: center;
}
</style>
