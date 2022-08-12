
import Vue from 'vue'
import Vuex from 'vuex'
// vuex-along 解决vuex刷新数据失效
import createVuexAlong from 'vuex-along' // vuex-along

Vue.use(Vuex)
// vuex应用场景：多个组件根据同一个数据响应时
export default new Vuex.Store({
  state: {
    // 歌手详情页用的ID
    aitistId: 0,
    // 搜索歌单数据
    SearchMusicLisi: {},
    // 搜索专辑数据  res.result
    searchAlbumCount: {},
    // 搜索歌手数据
    searchSinger: {},
    // 搜索歌曲数据
    searchMusic: {},
    // 搜索关键词
    keywords: '',

    // 歌曲当前的播放时间
    currentTime: 0,
    // 播放状态 默认为true 为暂停
    playState: true,
    // 播放音乐时候用的信息图片歌手等
    musicInfo: '',
    // 播放音乐时用的url
    musicUrl: '',
    // 歌单列表组件的数据id
    musicListId: '',
    // 登录后获得的token
    loginToken: '',
    // 登录状态
    isLogin: 0,
    // 登录后获得的用户信息
    loginUserInfo: {}

  },
  mutations: {
    // 获取登录后获得的用户信息
    getLoginUserInfo (state, data) {
      state.loginUserInfo = data
    },
    // 获取token,并改变登录状态
    getLoginToken (state, data) {
      localStorage.setItem('token', data)
      state.loginToken = data
      state.isLogin = 1
      console.log(data)
    },
    // 获取歌手详情页用的ID
    getAitistId (state, data) {
      state.aitistId = data
      console.log(data)
    },
    // 获取搜索歌单数据
    getsearchMusicLisi (state, data) {
      state.SearchMusicLisi = data
      console.log(data)
    },
    // 获取搜索专辑数据
    getSearchAlbumCount (state, data) {
      state.searchAlbumCount = data
      // console.log(data)
    },
    // 获取搜索歌手数据
    getSearchSinger (state, data) {
      state.searchSinger = data
      // console.log(data)
    },
    // 获取搜索歌曲
    getSearchMusic (state, data) {
      state.searchMusic = data
      // console.log(data)
    },
    // 获取搜索关键词
    getKeywords (state, keywords) {
      state.keywords = keywords
      // console.log(keywords)
    },
    // 获取歌曲当前播放时间
    getcurrentTime (state, time) {
      state.currentTime = time
      // console.log(time)
    },
    // 存储播放状态，app组件提供状态，给其他组件使用
    getPlayState (state, splaytated) {
      state.playState = splaytated
      // console.log(state.playState)
    },
    // 更改播放音乐的url
    // this.$store.commit('getMusicUrl', res1.data[0].url)注意最终参数url
    getMusicUrl (state, url) {
      state.musicUrl = url
      // console.log(state.musicUrl)
    },
    // 更改footer栏播放音乐的图片，实际获取了整个歌曲的信息
    // this.$store.commit('getMusicInfo', res.songs) 注意最终参数是songs
    getMusicInfo (state, Info) {
      state.musicInfo = Info
    },
    // 更改歌单列表组件的数据id
    getMusicListId (state, id) {
      state.musicListId = id
      console.log(id)
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [createVuexAlong()]// vuex-along
})
