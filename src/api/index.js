// 用于存储发起请求用的各个api
import axios from 'axios'
const api = {
  // 播放器的歌词Api
  getLyric (params) {
    return axios.get('lyric', {
      params
    })
  },
  // 获取相似歌单api
  getSimiPlayList (params) {
    return axios.get('simi/playlist', { params })
  },
  // 获取相似歌手api
  getSimiMusic (params) {
    return axios.get('simi/song', { params })
  },
  // 获取音乐 url
  getMusicUrl (params) {
    return axios.get('song/url', { params })
  },
  // 获取歌曲详细信息
  getMusicInfo (params) {
    return axios.get('song/detail', { params })
  },
  // 搜索api
  search (params) {
    return axios.get('cloudsearch', { params })
  },
  // 获取精品歌单api
  getBoutiqueList (params) {
    return axios.get('top/playlist/highquality', { params })
  },
  // 获取热门歌单分类tag的api
  getHotsongListTag (params) {
    return axios.get('playlist/hot', { params })
  },
  // 获取热门歌单
  getHotsongList (params) {
    return axios.get('top/playlist', { params })
  },
  // 获取排行榜
  getTopLIst () {
    return axios.get('/toplist')
  },
  // 获取歌单（排行榜）详情
  getPlayListDetail (params) {
    return axios.get('playlist/track/all', { params })
  },
  // 获取歌手分类列表
  getArtistList (params) {
    return axios.get('artist/list', { params })
  },

  // 获取最新歌曲-新歌速递
  getNewSong (params) {
    return axios.get('top/song', { params })
  },
  // 新碟上架
  getNewAlbum (params) {
    return axios.get('top/album', { params })
  },
  // 获取专辑内容
  getAlbumContent (params) {
    return axios.get('album', { params })
  },
  // 获取动态信息(如是否收藏,收藏数,评论数,分享数)
  getAlbumDetail (params) {
    return axios.get('album/detail/dynamic', { params })
  },
  // 获取歌手信息
  getArtistDetail (params) {
    return axios.get('artist/detail', { params })
  },
  // 歌手热门 50 首歌曲
  getArtistSongTop50 (params) {
    return axios.get('artist/top/song', { params })
  },
  // 歌手专辑
  getArtistAlbum (params) {
    return axios.get('artist/album', { params })
  },
  // 歌手MV
  getArtistMv (params) {
    return axios.get('artist/mv', { params })
  },
  // 歌手描述
  getArtistDesc (params) {
    return axios.get('artist/desc', { params })
  },
  // 相似歌手
  getSimiArtist (params) {
    return axios.get('simi/artist', { params })
  },
  // 热搜列表（详细）
  getSearchHot (params) {
    return axios.get('search/hot/detail', { params })
  },
  // 搜索建议
  getSearchSuggest (params) {
    return axios.get('/search/suggest', { params })
  },
  // 手机登录
  phoneLogin (params) {
    return axios.get('/login/cellphone', { params })
  },
  // 我喜欢
  iLike (params) {
    return axios.get('/like', { params })
  }
}

export default api
