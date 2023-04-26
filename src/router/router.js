import {createRouter, createWebHashHistory} from "vue-router";
import HomeMain from "@/components/Home/HomeMain.vue";
import HomeSong from "@/components/Song/HomeSong.vue";
import HomePage from "@/components/Home/HomePage.vue";
import HomeSinger from "@/components/Singer/HomeSinger.vue";
import HomeLogin from "@/components/Home/HomeLogin.vue";
import HomeRegister from "@/components/Home/HomeRegister.vue";
import DetailSinger from "@/components/Singer/DetailSinger.vue";
import AlbumSong from "@/components/Song/AlbumSong.vue";
import DetailSong from "@/components/Song/DetailSong.vue";
import HomeSearch from "@/components/Home/HomeSearch.vue";
import MyEmpty from "@/components/Common/MyEmpty.vue";
import HomeUser from "@/components/User/HomeUser.vue";
import SetUser from "@/components/User/SetUser.vue";
import ProfileUser from "@/components/User/ProfileUser.vue";
import ChaPwdUser from "@/components/User/ChaPwdUser.vue";
import MyTest from "@/components/Home/MyTest.vue";


const routes = [
    {path: '/', redirect: '/HomeMain'},
    {
        path: '/HomeMain', component: HomeMain, redirect: '/HomeMain/HomePage', children: [
            {path: 'HomePage', component: HomePage},
            {path: 'HomeSong', component: HomeSong},
            {path: 'HomeSinger', component: HomeSinger},
            {path: 'HomeLogin', component: HomeLogin},
            {path: 'HomeRegister', component: HomeRegister},
            {path: 'DetailSinger', component: DetailSinger},
            {path: 'AlbumSong', component: AlbumSong},
            {path: 'DetailSong', component: DetailSong},
            {path: 'HomeSearch', component: HomeSearch},
            {path: 'MyEmpty', component: MyEmpty},
            {path: 'HomeUser', component: HomeUser},
            {path: 'MyTest', component: MyTest},
            {
                path: 'SetUser', component: SetUser, redirect: '/HomeMain/SetUser/ProfileUser', children: [
                    {path: 'ProfileUser', component: ProfileUser},
                    {path: 'ChaPwdUser', component: ChaPwdUser}
                ]
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
