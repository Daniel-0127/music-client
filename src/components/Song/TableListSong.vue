<template>
  <div style="margin: 20px auto;">
    <table v-show="myData!=null">
      <tr v-for="(n,m) in 3" :key="m">
        <td v-for="item in myData.slice(5*n-5,5*n)" :key="item.id">

          <router-link :to="{path:'/HomeMain/AlbumSong',query:{album:item.album}}">
            <img :src="AlbumPath+item.album+'.jpg'" :alt="item.album">
            <p style="float: bottom;">{{ item.album }}</p>
          </router-link>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import global from "@/tools/global"
export default {
  name: "TableListSong",
  props: {
    myData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      AlbumPath:global.AlbumPath,
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
p{
  height: 42px;
}

</style>
