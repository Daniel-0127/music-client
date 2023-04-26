<template>
  <div>
    <div id="left">
      <img :src="img" alt="图片">
      <h2>{{ song }}</h2>
      <p>歌手: {{ singer }}</p>
      <p>专辑: {{ album }}</p>
    </div>
    <div id="right" ref="bgc">
      <div style="background-color: rgba(89,83,83,0.3);">
        <div id="text">
          <!--      // lyricIndex为当前歌曲播放的进度在歌词中的位置，进而改变正在播放的歌词的样式-->
          <ul ref="lyricUL">
            <li v-for="(item, i) in lyricsObjArr"
                :style="{color: lyricIndex === i ? '#8741e0' : '#ffffff',fontSize:lyricIndex === i ? '30px' :'20px',transitionProperty: 'font-size',
  transitionDuration:'0.45s'}"
                :key="item.time"
                :data-index='i' ref="lyric">{{ item.lyric }}
            </li>
          </ul>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "DetailSong",
  data() {
    return {
      name: "",
      album: "",
      singer: "",
      song: "",
      img: "",
      lyricsObjArr: [{time: 0, lyric: '我还想她 - 林俊杰 (JJ Lin)'}],
      lyricIndex: 0,
      currentTime: 0,
      audioTime: 0,
      timer: null
    }
  },

  methods: {
    getData() {
      this.axios.get("/song/getPic", {params: {name: this.name}}).then((res) => {
        console.log(res)
        this.album = res.data.Album;
        this.singer = res.data.Artist;
        this.song = res.data.Title;
        this.img = res.data.img
        this.$refs.bgc.style.background = "url(" + res.data.img + ")"
      })
    },
    getLrc() {
      this.axios.get("/song/getLrc", {params: {name: this.name}}).then((res) => {
        console.log(res)
        this.lyricsObjArr = res.data
      })
    },
    aaa() {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
          try {
            const index = this.$refs.lyric[i].dataset.index
            if (i === parseInt(index)) {
              this.lyricIndex = i
              this.$refs.lyricUL.style.transform = `translateY(${300 - (50 * (i + 1))}px)`
            }
          } catch (err) {
            // console.log(err)
          }


        }
      }
    },
    DSQ() {
      this.currentTime = store.state.currentTime * 1000 + 10

      const vm = this;
      if (vm.currentTime + 1000 >= vm.audioTime * 1000) {
        vm.$router.push({path: "/HomeMain/MyEmpty", query: {id: 3}})
        // clearInterval(vm.timer);

      }
      this.aaa()
    },
  },
  created() {

    this.name = store.state.song
    this.audioTime = store.state.audioTime
    console.log(store.state.song)
    console.log(store.state.audioTime)
    this.getData()
    this.getLrc()

  },
  mounted() {
    this.timer = window.setInterval(this.DSQ, 1);
  }

}
</script>

<style scoped>
* {
  font-family: "微软雅黑", Arial, sans-serif;
}

#left {
  float: left;
  width: 25%;
  /*background-color: #d32020;*/

}

#left img {
  margin-top: 40px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
}

/*#left * {*/
/*  margin-left: 40px;*/
/*}*/

#right {

  float: right;
  width: 880px;
  height: 590px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 99;
  overflow: hidden; /* 隐藏水平滚动栏 */
  /*overflow-y: scroll; !* 添加垂直滚动栏 *!*/
  /*height: 500px;*/
  /*margin: 50px 130px 99px 0;*/
  text-align: center;


}

#text {
  backdrop-filter: blur(30px);

}

#right ul li {
  list-style: none;
  line-height: 50px;
  z-index: 999;
}

/*歌词*/

</style>
