import Vue from 'vue'
import VueRouter from 'vue-router'
import FindMusic from '@/views/findMusic/FindMusic.vue'
// import RecommendPage from '@/views/findMusic/Recommend/RecommendPage.vue'
import MusicList from '@/views/musicList/MusicList.vue'
import MusicListPage from '@/views/musicList/MusicListPage.vue'
// 搜索
import SearchPage from '@/views/search/SearchPage.vue'
import SearchMusic from '@/views/search/SearchMusic.vue'
import SearchSinger from '@/views/search/searchSinger.vue'
import SearchAlbum from '@/views/search/SearchAlbum.vue'
import SearchMusicLisi from '@/views/search/SearchMusicLisi.vue'
import SearchUser from '@/views/search/searchUser.vue'
import SearchVideo from '@/views/search/searchVideo.vue'

// import SongListHome from '@/views/findMusic/songList/SongListHome.vue'
// import TopList from '@/views/findMusic/topList/TopListHome.vue'
// import ArtistList from '@/views/findMusic/artistList/artistListHome.vue'
// import NewestMusicHome from '@/views/findMusic/newestmusic/NewestMusicHome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/findmusic' },
  // 发现音乐重定向到个性推荐
  { path: '/findmusic', redirect: '/recommend' },
  { path: '/musiclistpage', redirect: '/musiclist' },
  // 歌曲列表
  {
    path: '/musiclistpage',
    component: MusicListPage,
    children: [
      { path: '/musiclist', component: MusicList }
    ]
  },
  // 专辑内容
  { path: '/albumcontent', component: () => import('@/views/findMusic/newestmusic/AlbumContent.vue') },
  // 歌手详情
  {
    path: '/artistdetail',
    redirect: '/artistalbum',
    component: () => import('@/views/findMusic/artistList/ArtistDetail.vue'),
    children: [
      // 歌手详情里的专辑
      { path: '/artistalbum', component: () => import('@/views/findMusic/artistList/AritstAlbum.vue') },
      // mv
      { path: '/artistmv', component: () => import('@/views/findMusic/artistList/ArtistMv.vue') },
      // 详情介绍
      { path: '/ArtistDetailText', component: () => import('@/views/findMusic/artistList/artistDetailText.vue') },
      // 相似歌手
      { path: '/artistSimilarity', component: () => import('@/views/findMusic/artistList/Artistsimilarity.vue') }
    ]
  },
  // 发现音乐
  {
    path: '/findmusic',
    component: FindMusic,
    children: [
      // 个性推荐
      { path: '/recommend', component: () => import('@/views/findMusic/Recommend/RecommendPage.vue') },
      // 歌单
      { path: '/songlist', component: () => import('@/views/findMusic/songList/SongListHome.vue') },
      // 排行榜
      { path: '/toplist', component: () => import('@/views/findMusic/topList/TopListHome.vue') },
      // 歌手
      { path: '/artistlist', component: () => import('@/views/findMusic/artistList/artistListHome.vue') },
      // 最新音乐
      {
        path: '/newestmusic',
        component: () => /* webpackChunkName:"NewestMusicHome.vue" */ import('@/views/findMusic/newestmusic/NewestMusicHome.vue')

      }
    ]
  },

  // 搜索页面
  // 进入搜索页面自动跳转到歌曲页面
  { path: '/searchpage', redirect: '/searchMusic' },
  {
    path: '/searchpage',
    component: SearchPage,
    children: [
      // 搜索歌曲页面
      { path: '/searchMusic', component: SearchMusic },
      { path: '/searchSinger', component: SearchSinger },
      { path: '/searchAlbum', component: SearchAlbum },
      { path: '/searchMusicLisi', component: SearchMusicLisi },
      { path: '/searchUser', component: SearchUser },
      { path: '/searchVideo', component: SearchVideo }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
