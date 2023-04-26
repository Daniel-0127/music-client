<template>
  <div style="margin: 0 auto;">
    <table v-show="myData!=null">
      <tr v-for="(n,m) in 3" :key="m">
        <td v-for="item in myData.slice(5*n-5,5*n)" :key="item.id">

          <router-link :to="{path:'/HomeMain/DetailSinger',query:{id:item.id,name:item.name}}">
            <img :src="SingerPath+item.name+'.jpg'" :alt="item.name">
            <p style="float: bottom;">{{ item.name }}</p>
          </router-link>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import global from "@/tools/global"

export default {
  name: "TableListSinger",
  props: {
    myData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      SingerPath:global.SingerPath,
      data_: this.myData
    }
  },
}
</script>

<style scoped>
* {
  font-family: "微软雅黑", Arial, sans-serif;
}

tr td {
  width: 232px;
  height: 250px;
  padding: 10px;
  /*border: 1px solid;*/
}

img {
  width: 210px;
  height: 210px;
  border-radius: 8px;
}


</style>
