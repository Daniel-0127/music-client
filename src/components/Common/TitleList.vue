<template>
  <div style="margin-left: 40px;">
    <el-table :data="myData" stripe style="width: 100%;cursor: pointer;" highlight-current-row @row-click="changeSong"
              @cell-mouse-enter="MyEnter" @cell-mouse-leave="MyLeave">
      <el-table-column type=index prop="index" label="" width="100"/>

      <el-table-column prop="name" label="歌曲名" width="220"/>
      <el-table-column width="160">
        <template #default>
          <div v-show="row.show">
            <play-one theme="outline" size="24" fill="#333" strokeLinejoin="bevel"/>
            <add theme="outline" size="24" fill="#333" strokeLinejoin="bevel" strokeLinecap="square"/>
            <download theme="outline" size="24" fill="#333" strokeLinejoin="bevel"/>
            <like theme="outline" size="24" fill="#333"/>
            <like theme="filled" size="24" fill="#f03044"/>
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="160"/>
      <el-table-column prop="album" label="专辑"/>

    </el-table>
  </div>
</template>

<script>


import store from "@/store";
import {Add, Download, Like, PlayOne} from "@icon-park/vue-next";

export default {
  name: "TitleList",
  components: {Like, PlayOne, Add, Download},
  props: {
    myData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      name1: "背对背拥抱",
      singer: "林俊杰",
      isPlaying: false,
      show: false,
    }
  },
  methods: {
    changeSong(row) {
      // console.log(row)
      window.localStorage.setItem("song", JSON.stringify({name: row.name, singer: row.singer}));
      const song = row.name + " - " + row.singer;
      store.commit('updateSong', song)
      // window.localStorage.setItem("song2",row.singer);
      // localStorage.setItem("play","true");

    },
    MyEnter(row) {
      row.show = true
    },
    MyLeave(row) {
      row.show = false
    }

  }
}
</script>

<style scoped>
/* 选中某行时的背景色*/
:deep(.current-row) > td {
  color: #6a8ae0;
  /*background: rgb(211, 178, 215) !important;*/
}

</style>
