<template>
<div>
  <TableListSinger :my-data="this.data1"></TableListSinger>
    <el-pagination background layout="prev, pager, next" v-model:page-count="total" v-model:current-page="page"
                   @update:current-page="getM"/>
</div>
</template>

<script>


import TableListSinger from "@/components/Singer/TableListSinger.vue";

export default {
  name: "MSinger",
  components: {TableListSinger},
  data(){
    return{
      size: 15,
      page: 1,
      total:1,
      data1: [{
        address: "中国上海",
        birth: "1991-08-15 23:00:00",
        create_time: "2023-03-23 11:07:19",
        deleted: false,
        id: 1,
        achievements: "第27届美国KCA亚洲最受欢迎艺人、IPFI香港唱片全年最高销量女歌手、第24届金曲奖最佳国语女歌手提名、最年轻登上红馆开个唱的女歌手、叱咤乐坛生力军金奖首位未成年获奖、第二届 QQ音乐年度盛典年度最佳港台女歌手、QQ音乐巅峰榜人气搜索奖",
        name: "G.E.M. 邓紫棋",
        sex: 0
      }],
    }
  },
  methods:{
    getM() {
      this.axios.get("/singer/selectBySex", {params: {page: this.page, size: this.size, sex: 1}}).then((res) => {
        // console.log(res.data)
        this.data1 = res.data.row
        this.total=res.data.total
      })
    },
  },created() {
    this.getM()
  }
}
</script>

<style scoped>
.el-pagination{
  justify-content: center;
}
</style>
