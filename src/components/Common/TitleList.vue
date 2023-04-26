<template>
  <div style="margin-left: 40px;">
    <el-table :data="myData" style="width: 100%;"
              @cell-mouse-leave="showClickIcon=false"
              @cell-mouse-enter="ncrFormat"
              :row-style="{height: '46px'}"
              :header-cell-style="{textAlign:'center'}"
              :cell-style="{textAlign:'center'}"
              @cell-click="rowChange"
              border stripe>
      <el-table-column type=index prop="index" label="" width="100"/>

      <el-table-column prop="name" label="歌曲名" width="220" show-overflow-tooltip/>
      <el-table-column width="160" label="操作">
        <template #default="scope">
          <div v-if="showClickIcon===true&&scope.row.id===rowid">
            <div title="播放" style="display: inline-block;cursor: pointer;margin-left: 4px">
              <play theme="outline" size="20" fill="#333" strokeLinejoin="bevel" @click="changeSong(scope.row)"/>
            </div>
            <div title="添加播放列表" style="display: inline-block;cursor: pointer;margin-left: 4px">
              <add theme="outline" size="20" fill="#333" strokeLinejoin="bevel" strokeLinecap="square"
                   @click="addPlayList(scope.row)"/>
            </div>
            <div title="下载" style="display: inline-block;cursor: pointer;margin-left: 4px">
              <download theme="outline" size="20" fill="#333" strokeLinejoin="bevel" @click="downloadMp3(scope.row)"/>
            </div>
            <div v-if="isLove===false" title="添加收藏" style="display: inline-block;cursor: pointer;margin-left: 3px">
              <like theme="outline" size="20" fill="#333" @click="myLike(scope.row)"/>

            </div>
            <div v-else title="取消收藏" style="display: inline-block;cursor: pointer;margin-left: 4px">
              <like theme="filled" size="20" fill="#f03044" @click="myDislike(scope.row)"/>
            </div>


          </div>

        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="160" show-overflow-tooltip/>
      <el-table-column prop="album" label="专辑" show-overflow-tooltip/>

    </el-table>
  </div>
</template>

<script>


import store from "@/store";
import global from "@/tools/global"
import {Add, Download, Like, Play} from "@icon-park/vue-next";

export default {
  name: "TitleList",
  components: {Like, Play, Add, Download},
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
      showClickIcon: false,
      showInfo: false,
      rowid: '',
      rowData: [],
      isLove: false,
      user_id: -1,
      playList: [],
    }
  },

  methods: {
    rowChange(row,column){
      if(column&&column.label==="操作"){
        return
      }
      this.changeSong(row)
    },
    //播放歌曲
    changeSong(row) {
      // console.log(row)
      window.localStorage.setItem("song", JSON.stringify({name: row.name, singer: row.singer}));
      const song = row.name + " - " + row.singer;
      store.commit('updateSong', song)
      // window.localStorage.setItem("song2",row.singer);
      // localStorage.setItem("play","true");

    },
    //判断用户是否存在
    isLoading() {
      try {
        this.user_id = store.state.user.id
      } catch (e) {
        this.user_id = -1
      }
    },
    //显示操作
    ncrFormat(row) {

      this.SelectOne(row.id)
      const that = this
      setTimeout(function () {
        that.showClickIcon = true
        that.rowid = row.id   //赋值行id，便于页面判断
        that.rowData = row   //把行数据赋值，用于后续操作
      }, 30);


    },
    //判断是否收藏
    SelectOne(song_id) {
      if (this.user_id !== -1) {
        this.axios.get("/love/SelectOne", {params: {user_id: this.user_id, song_id: song_id}}).then((res) => {
          // console.log(res)
          this.isLove = res.data
        })
      } else {
        this.isLove = false
      }

    },
    //加入收藏
    myLike(row) {
      if (this.user_id !== -1) {
        this.axios.post("love/insert", {user_id: this.user_id, song_id: row.id}).then((res) => {
          console.log(res)
          this.isLove = true
        })
      } else {
        this.$message.warning('请先登陆！')
        this.$router.push('/HomeMain/HomeLogin')
      }

    },
    //删除收藏
    myDislike(row) {
      if (this.user_id !== -1) {
        this.axios.delete("/love/remove", {params: {user_id: this.user_id, song_id: row.id}}).then((res) => {
          console.log(res)
          this.isLove = false
        })
      }
    },
    //添加播放列表
    addPlayList(row) {
      this.playList = store.state.PlayList;
      const song = row.name + " - " + row.singer
      this.playList.push({"song": song})
      store.commit('updatePlayList', this.playList)
      console.log(this.playList)
    },
    //下载mp3
    downloadMp3(row) {
      const filePath = global.SongPath + row.name + " - " + row.singer + ".flac";
      fetch(filePath).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // 指定下载的文件名，就‘’写默认的下载名字。不指定他就根据上传名直接下载了宝。
        a.download = row.name;
        a.click();
        document.body.removeChild(a)
        // 移除blob对象的url
        window.URL.revokeObjectURL(url);
      });
    },

  },
  created() {
    this.isLoading()
  }
}
</script>

<style scoped>
/* 选中某行时的背景色*/
:deep(.current-row) > td {
  color: #6a8ae0;
  /*background: rgb(211, 178, 215) !important;*/
}

* {
  font-size: 16px;
}
</style>
