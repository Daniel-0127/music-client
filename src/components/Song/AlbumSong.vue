<template>
  <div>
    <div id="left">
      <img :src="'http://localhost:8063/IMG/'+album+'.jpg'" alt="歌手图片">
      <h2>{{album}}</h2>

    </div>
    <div id="right">
      <div style="height: 390px;">
        <TitleList :my-data="this.data_"></TitleList>
      </div>

      <el-pagination background layout="prev, pager, next" v-model:page-count="total" v-model:current-page="page"
                     @update:current-page="getData" />
    </div>
  </div>
</template>

<script>


import TitleList from "@/components/Common/TitleList.vue";

export default {
  name: "DetailSong",
  components: {TitleList},
  data(){
    return{
      size:7,
      page:1,
      total:1,
      album:"",
      data_:null,
    }
  },
  methods:{
    getData(){
      this.axios.get("/song/selectByAlbum",{params:{size:this.size,page:this.page,album:this.album}}).then((res)=>{
        console.log(res)
        this.data_ = res.data.row
      })
    }
  },created() {
    this.album=this.$route.query.album;
    this.getData()
  }

}
</script>

<style scoped>
/** {*/
/*  font-family: "微软雅黑", Arial, sans-serif;*/
/*}*/

#left {
  float: left;
  width: 30%;
  /*background-color: #d32020;*/

}

#left img {
  margin-top: 40px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
}

#left * {
  margin-left: 40px;
}

#right {
  float: left;
  width: 70%;
  /*background-color: rgba(176, 84, 84, 0.76);*/
}

.el-pagination {
  justify-content: center;
}
</style>
