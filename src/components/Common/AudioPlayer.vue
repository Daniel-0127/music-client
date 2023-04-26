<template>
  <div id="audio">
    <audio :src="aud" ref="myAudio" @canplay="ready">
      您的浏览器不支持音频播放
    </audio>
    <div class="progress-box">
      <div id="bar" :style="`width:${barWidth}%;`"></div>
    </div>

    <table>
      <tr>
        <td style="padding-left: 30px;">
          <router-link to="/HomeMain/DetailSong">
            <up id="up" theme="outline" size="35" fill="#49a0f8"/>
            <img style="float: left;margin-top: -2px" :class="isPlaying?'animation':'no'"
                 :src="require('@/assets/R-C.png')" alt="歌手图片"
                 ref="img1">
            <div style="float: left;margin-top: 20px">{{ this.title1 }}<p style="color: #333">
              {{ `${currentTimeText} / ${audioTimeText}` }}</p></div>
          </router-link>
        </td>
        <td style="padding-left:75px">
          <div style="margin: 0 auto;display: block">
            <ul>
              <li>
                <div>
                  <play-cycle v-if="playType===1" theme="outline" size="35" fill="#333" @click="myPlayCycle"/>
                  <play-once v-else-if="playType===2" theme="outline" size="35" fill="#333" @click="myPlayOnce"/>
                  <shuffle-one v-else theme="outline" size="35" fill="#333" @click="myShuffleOne"/>
                </div>
              </li>
              <li>
                <go-start theme="outline" size="35" fill="#333" @click="goStart_"/>
              </li>
              <li>
                <play-one v-if="isPlaying===false" theme="outline" size="35" fill="#333" strokeLinejoin="miter"
                          @click="togglePlay"/>
                <pause v-else theme="outline" size="35" fill="#333" @click="togglePlay"/>
              </li>
              <li>
                <go-end theme="outline" size="35" fill="#333" @click="Update"/>
              </li>
              <li>
                <el-popover
                    placement="top-start"
                    :width="200"
                    trigger="hover"
                    :show-arrow="false"
                    style="border-radius: 4px;"
                >
                  <div class="slider-demo-block">
                    <span class="demonstration">音量:</span>
                    <el-slider v-model="value_" size="small"/>
                  </div>
                  <template #reference>
                    <volume-notice v-if="value_>=60" theme="outline" size="32" fill="#333"/>
                    <volume-small v-else-if="value_!==0" theme="outline" size="32" fill="#333"/>
                    <volume-mute v-else theme="outline" size="32" fill="#333"/>
                  </template>
                </el-popover>
              </li>

            </ul>


          </div>

        </td>
        <td style="text-align: right;padding-right: 20px">
          <music-list theme="outline" size="35" fill="#333" style="cursor: pointer;" @click="myDrawer"/>
        </td>

      </tr>
    </table>


    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <h2>播放列表</h2>
      <el-table :data="playList" height="650" style="width: 100%">
        <el-table-column type="index" width="180"/>
        <el-table-column prop="song" label="Name" width="180"/>
      </el-table>
    </el-drawer>

    <div>

    </div>
  </div>
</template>

<script>
import {
  PlayOne,
  Pause,
  GoEnd,
  GoStart,
  VolumeNotice,
  ShuffleOne,
  PlayCycle,
  PlayOnce,
  VolumeMute, VolumeSmall, Up, MusicList
} from "@icon-park/vue-next";
import store from "@/store";
import global from "@/tools/global"

export default {
  name: "AudioPlayer",
  components: {
    PlayOne,
    Pause,
    GoEnd,
    GoStart,
    VolumeNotice,
    ShuffleOne,
    PlayCycle,
    PlayOnce,
    VolumeMute,
    VolumeSmall,
    Up,
    MusicList
  },
  data() {
    return {
      aud: "http://localhost:8063/MUSIC/我还想她 - 林俊杰.flac",
      isPlaying: false,
      audioReady: false,
      playType: 1,
      title1: "我还想她 - 林俊杰",
      timer: null,//定时器
      audioTime: 248,//总时间
      currentTime: 0,//当前时间
      time: 0,//自定义
      value_: 60,//音量,
      drawer: false,//播放列表展示
      playList: [],//播放列表

    }
  },
  watch: {
    value_() {
      let audioPlayer = this.$refs.myAudio;
      audioPlayer.volume = this.value_ / 100;
    }
  },
  computed: {
    //生成总时间
    audioTimeText() {
      return this.getTimeText(this.audioTime);
    },
    //实时生成当前时间
    currentTimeText() {
      return this.getTimeText(this.currentTime);
    },
    //实时计算当前进度条的宽度百分比
    barWidth() {
      return (this.currentTime / this.audioTime) * 100;
    }
  },
  methods: {
    ready() {
      this.audioReady = true
    },
    // 暂停/播放
    togglePlay() {
      this.aud = global.SongPath + store.state.song + ".flac"
      const audio = this.$refs.myAudio;
      if (this.isPlaying) {
        audio.pause();
        clearInterval(this.timer);
        this.isPlaying = false;
      } else {
        audio.play();
        this.isPlaying = true;
        this.timer = window.setInterval(this.DSQ, 1000);
      }
    },
    // 点击播放
    play1() {


      if (!this.audioReady) {
        return
      }
      // this.$refs.myAudio.pause();
      if (this.timer) {
        clearInterval(this.timer);
      }
      store.commit('updateAudioTime', this.audioTime)

      // 加载音频并获取音频的总时长；
      // let vm = this;
      // let passage_audio = this.$refs.myAudio;
      // passage_audio.oncanplay = function () {
      //   vm.audioTime = Math.round(passage_audio.duration);
      // };

      // store.commit('updateAudioTime', vm.audioTime)

      //将当前的时间重置为 0
      this.currentTime = 0;

      this.title1 = store.state.song
      this.aud = global.SongPath + store.state.song + ".flac"
      this.isPlaying = true;
      this.$refs.myAudio.load();
      const that = this
      setTimeout(function () {
        that.$refs.myAudio.play();

      }, 20);
      //设置定时器，每一秒当前时间就增加;
      this.timer = window.setInterval(this.DSQ, 1000);
      setTimeout(function () {
        store.commit('updateAudioTime', that.audioTime)
      }, 20);

    },
    //定时器
    DSQ() {
      const vm = this;
      vm.currentTime = vm.currentTime + 1;
      store.commit('updateCurrentTime', vm.currentTime)
      //当当前秒数超过或者等于总时长，就清除定时器;
      if (vm.currentTime >= vm.audioTime) {
        // vm.currentTime = 0;
        // store.commit('updateCurrentTime', 0)
        vm.isPlaying = false
        this.$refs.myAudio.pause();
        vm.Update(true)
        this.$router.push({path:'/HomeMain/MyEmpty',query:{id:this.$route.path}})
        clearInterval(vm.timer);

      }
    },
    //上一首
    goStart_() {
      try {
        if (!this.audioReady) {
          return
        }
        if (this.timer) {
          clearInterval(this.timer);
        }
        if (this.playType === 1) {
          const index = store.state.index
          const song = store.state.PlayList[index > 0 ? index - 1 : index]
          console.log(song)

          store.commit('updateSong', song.song)
          store.commit('updateIndex', index > 0 ? index - 1 : index)
          store.commit('updateCurrentTime', 0)
          store.commit('updateAudioTime', this.audioTime)
          //将当前的时间重置为 0
          this.currentTime = 0;

          this.title1 = song.song
          this.aud = global.SongPath + song.song + ".flac"
          this.isPlaying = true;
          this.$refs.myAudio.load();
          let that = this
          setTimeout(function () {
            that.$refs.myAudio.play();

          }, 20);
          //设置定时器，每一秒当前时间就增加;
          this.timer = window.setInterval(this.DSQ, 1000);
          setTimeout(function () {
            store.commit('updateAudioTime', that.audioTime)
          }, 20);
        } else if (this.playType === 2) {
          store.commit('updateCurrentTime', 0)
          store.commit('updateAudioTime', this.audioTime)
          //将当前的时间重置为 0
          this.currentTime = 0;

          this.title1 = store.state.song
          this.aud = global.SongPath + this.title1 + ".flac"
          this.isPlaying = true;
          this.$refs.myAudio.load();
          let that = this
          setTimeout(function () {
            that.$refs.myAudio.play();

          }, 20);
          //设置定时器，每一秒当前时间就增加;
          this.timer = window.setInterval(this.DSQ, 1000);
          setTimeout(function () {
            store.commit('updateAudioTime', that.audioTime)
          }, 20);
        } else {
          const array_1 = store.state.PlayList2
          const index = store.state.index
          const song = array_1[index > 0 ? index - 1 : index]

          store.commit('updateSong', song.song)
          store.commit('updateIndex', index > 0 ? index - 1 : index)
          store.commit('updateCurrentTime', 0)
          store.commit('updateAudioTime', this.audioTime)
          //将当前的时间重置为 0
          this.currentTime = 0;

          this.title1 = song.song
          this.aud = global.SongPath + song.song + ".flac"
          this.isPlaying = true;
          this.$refs.myAudio.load();
          let that = this
          setTimeout(function () {
            that.$refs.myAudio.play();

          }, 20);
          //设置定时器，每一秒当前时间就增加;
          this.timer = window.setInterval(this.DSQ, 1000);
          setTimeout(function () {
            store.commit('updateAudioTime', that.audioTime)

          }, 20);


        }
        this.$router.push({path:'/HomeMain/MyEmpty',query:{id:this.$route.path}})
      } catch (e) {
        console.log(e)
      }
    },
    //更新播放歌曲--下一曲
    Update(a) {
      let aa = false;
      aa = a
      try {
        if (!this.audioReady) {
          return
        }
        if (this.timer) {
          clearInterval(this.timer);
        }
        let array_ = this.playList
        this.shuffleSelf(array_, array_.length)
        if (this.playType === 1) {

          const index = store.state.index
          const song = store.state.PlayList[index + 1]
          console.log(song)

          store.commit('updateSong', song.song)
          store.commit('updateIndex', index + 1)
          store.commit('updateCurrentTime', 0)
          // store.commit('updateAudioTime', this.audioTime)
          //将当前的时间重置为 0
          this.currentTime = 0;

          this.title1 = song.song
          this.aud = global.SongPath + song.song + ".flac"
          this.isPlaying = true;
          this.$refs.myAudio.load();
          const that = this;
          setTimeout(function () {
            that.$refs.myAudio.play();
            store.commit('updateAudioTime', Math.round(that.$refs.myAudio.duration))
            that.togglePlay()
            that.togglePlay()
            this.audioReady = false
          }, 30);
          //设置定时器，每一秒当前时间就增加;
          this.timer = window.setInterval(this.DSQ, 1000);

        } else if (this.playType === 2) {
          if(aa===true){
            store.commit('updateCurrentTime', 0)
            // store.commit('updateAudioTime', this.audioTime)
            //将当前的时间重置为 0
            this.currentTime = 0;

            this.title1 = store.state.song
            this.aud = global.SongPath + this.title1 + ".flac"
            this.isPlaying = true;
            this.$refs.myAudio.load();

            const that =this
            setTimeout(function () {
              that.$refs.myAudio.play();
              that.togglePlay()
              that.togglePlay()
            }, 30);
            //设置定时器，每一秒当前时间就增加;
            this.timer = window.setInterval(this.DSQ, 1000);
            setTimeout(function () {
              store.commit('updateAudioTime',that.audioTime)

            }, 30);


            this.audioReady = false
          }else {
            const index = store.state.index
            const song = store.state.PlayList[index + 1]
            console.log(song)

            store.commit('updateSong', song.song)
            store.commit('updateIndex', index + 1)
            store.commit('updateCurrentTime', 0)
            // store.commit('updateAudioTime', this.audioTime)
            //将当前的时间重置为 0
            this.currentTime = 0;

            this.title1 = song.song
            this.aud = global.SongPath + song.song + ".flac"
            this.isPlaying = true;
            this.$refs.myAudio.load();
            let that = this
            setTimeout(function () {
              that.$refs.myAudio.play();

            }, 30);
            //设置定时器，每一秒当前时间就增加;
            this.timer = window.setInterval(this.DSQ, 1000);
            setTimeout(function () {
              store.commit('updateAudioTime', that.audioTime)
            }, 30);
            this.togglePlay()
            this.togglePlay()
          }

        } else {

          const array_1 = store.state.PlayList2
          const index = store.state.index
          const song = array_1[index + 1]
          console.log(song)

          store.commit('updateSong', song.song)
          store.commit('updateIndex', index + 1)
          store.commit('updateCurrentTime', 0)
          // store.commit('updateAudioTime', this.audioTime)
          //将当前的时间重置为 0
          this.currentTime = 0;

          this.title1 = song.song
          this.aud = global.SongPath + song.song + ".flac"
          this.isPlaying = true;
          this.$refs.myAudio.load();
          let that = this
          setTimeout(function () {
            that.$refs.myAudio.play();

          }, 20);
          //设置定时器，每一秒当前时间就增加;
          this.timer = window.setInterval(this.DSQ, 1000);
          setTimeout(function () {
            store.commit('updateAudioTime', that.audioTime)

          }, 20);
          this.togglePlay()
          this.togglePlay()
        }
        this.$router.push({path:'/HomeMain/MyEmpty',query:{id:this.$route.path}})
      } catch (e) {
        console.log(e)
      }


    },
    //洗牌算法
    shuffleSelf(arr, size) {
      const array = arr.slice(0, size)
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        // var rand = baseRandom(index, lastIndex),
        var rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        var value = array[rand];

        array[rand] = array[index];

        array[index] = value;
      }
      array.length = size;
      console.log(array)
      store.commit('updatePlayList2', array)
    },
    // 获取播放时间
    getTimeText(seconds) {
      let minute;
      let second;
      minute = Math.floor(seconds / 60);
      second = Math.floor(seconds) - minute * 60;
      // 让个位数的时间正常显示
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;
      return minute + ":" + second;
    },
    // 修改播放样式
    // 单曲循环
    myPlayCycle() {
      this.playType = 2

    },
    //随机播放
    myPlayOnce() {
      this.playType = 3

    },
    //顺序播放
    myShuffleOne() {
      this.playType = 1
      // this.playList = store.state.PlayList

    },

    myDrawer() {
      this.playList = store.state.PlayList;
      this.drawer = true

    }

  },
  mounted() {
    // 加载音频并获取音频的总时长；
    let vm = this;
    let passage_audio = this.$refs.myAudio;
    passage_audio.oncanplay = function () {
        vm.audioTime = Math.round(passage_audio.duration);
    };


    // 监听localhostStorage的数据变化，结合utils/tool.js配合使用
    const that = this
    window.addEventListener('setItemEvent', function (e) {
          let newData = JSON.parse(e.newValue)
          // that.name = newData.name
          // that.singer = newData.singer
          // that.song1 = newData
          store.commit('updateSong', newData.name + " - " + newData.singer)
          that.play1()


        }
    )


  },

}
</script>

<style scoped>
table {
  width: 100%;
}

table tr td {
  width: 33.5%;
  /*border: 1px black solid;*/
}

ul li {
  float: left;
  list-style: none;
  width: 70px;
  display: inline-block;
  text-align: center;
}

ul li {
  margin: auto 0;
  cursor: pointer;
}

#audio {
  position: fixed;
  z-index: 99;
  height: 70px;
  width: 100vw;
  bottom: 0;
  background-color: #a0cca6;

}

#audio img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 6px 0 0 10px;
}

/*无限旋转动画*/
@keyframes changDeg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*图片旋转*/
.animation {
  animation: changDeg 2s linear 0.2s infinite
}

.no {
  background-color: #fff;
}

/*歌曲播放进度条*/
.progress-box {
  border-radius: 5px;
  background-color: #ccc;
  height: 2px;
  padding: 3px 4px;
  min-width: 500px;
}

#bar {
  background: #41b883;
  height: 100%;
  border-radius: 3px;
  /*/ / 进度条的动画，加上之后动画会过过渡流畅 */
  transition: 1s linear;
}

/*音量*/
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  white-space: nowrap;
  margin-bottom: 0;
}

/*歌曲详情up图标*/
#up {
  position: absolute;
  left: 10px;
  top: 20px;
}
</style>
