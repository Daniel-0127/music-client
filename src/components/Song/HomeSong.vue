<template>
  <div>
    <MyLoading></MyLoading>
      <TableListSong :my-data="data1"></TableListSong>
      <el-pagination background layout="prev, pager, next," v-model:page-count="total" v-model:current-page="page"
                     @update:current-page="getDate"/>


  </div>
</template>

<script>
import TableListSong from "@/components/Song/TableListSong.vue";

export default {
  name: "HomeSong",
  components: {TableListSong},
  data() {
    return {
      page: 1,
      size: 15,
      data1: [{id: 1, album: '当真 ', create_time: '2023-04-03 14:42:54', update_time: '2023-04-03 14:42:54'}],
      total: 1,
    }
  },
  methods: {
    getDate() {
      this.axios.get("/song/selectAllAlbum", {params: {page: this.page, size: this.size}}).then((res) => {
        // console.log(res)
        this.data1 = res.data.row
        this.total = res.data.total

      })
    },

  },

  created() {
    this.getDate()
  }
}
</script>

<style scoped>
/*不能动*/
.el-pagination {
  justify-content: center;
  /*text-align: center;*/
}
</style>
