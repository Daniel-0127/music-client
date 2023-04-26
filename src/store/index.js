import {createStore} from 'vuex'

export default createStore({
    state: {
        song: "我还想她 - 林俊杰",
        audioTime: 248,//总时间
        currentTime: 0,//当前时间
        SearchList: [],//搜索链表
        user: null,//用户
        PlayList: [],//播放列表
        PlayList2: [],//随机播放列表
        index:-1,//播放索引
    },
    mutations: {
        // 定义mutations，用于修改状态(同步)
        updateSong(state, song1) {
            state.song = song1
        },
        updateAudioTime(state, audioTime1) {
            state.audioTime = audioTime1
        },
        updateCurrentTime(state, currentTime1) {
            state.currentTime = currentTime1
        },
        UpdateSearchList(state, SearchList1) {
            state.SearchList = SearchList1
        },
        UpdateUser(state, user1) {
            state.user = user1
        },
        updatePlayList(state, PlayList) {
            state.PlayList = PlayList
        },
        updatePlayList2(state, PlayList2) {
            state.PlayList2 = PlayList2
        },
        updateIndex(state,index){
            state.index=index
        }
    },
    actions: {
        // 定义actions，用于修改状态(异步)
        // 2秒后更新状态
        updateInfo(context, payload) {
            setTimeout(() => {
                context.commit('updateInfo', payload)
            }, 2000)
        }
    },
    getters: {},
    modules: {}
})
