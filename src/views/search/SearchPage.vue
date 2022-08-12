<template>
<!-- 搜索页的整个父组件，负责所有搜索内容的http请求 -->
<!-- 点击发起http请求，并之间传入vuex，子组件在vuex里取数据 -->
  <div class="searchPage">
    <!-- 歌曲数量 -->
    <h1 >找到 {{ count.num }} {{countText}}</h1>
    <!-- 导航栏 -->
    <div class="musicListNavigation">
      <el-menu router width="100%" :default-active="this.$route.path.substr(1)" class="el-menu-demo navigationMenu" mode="horizontal">
        <el-menu-item index="searchMusic" @click="toSearchMusic" >单曲</el-menu-item>
        <el-menu-item index="searchSinger"  @click="toSearchSinger">歌手</el-menu-item>
        <el-menu-item index="searchAlbum" @click="toSearchAlbum">专辑</el-menu-item>
        <el-menu-item index="searchVideo" @click="toSearchVideo">视频</el-menu-item>
        <el-menu-item index="searchMusicLisi" @click="toSearchMusicLisi">歌单</el-menu-item>
        <el-menu-item index="searchUser" @click="toSearchUser">用户</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 判断当前再哪个路由，1为单曲，2为歌手，3为专辑，4为视频，5为歌单，6为用户
      routeState: 1,
      // 歌曲偏移量，控制获取歌曲丛第几首获取
      offset: { num: 0 },
      // count后面的文字
      countText: '',
      // 数量,写成对象形式是为了provide传给子组件时数据是响应式
      count: { num: 0 }
      // 搜索音乐获取到的数据
      // searchMusic: {}
    }
  },
  // 给子组件传值和方法
  provide () {
    return {
      SearchPage_Offset: this.offset,
      SearchPage_Count: this.count,
      // 传方法
      SearchPage_ChangOffset: this.changOffset // 注意方法名不能跟括号
    }
  },
  computed: {
    ...mapState(['keywords'])
  },
  created () {
    // 获取搜索歌曲
    this.getSearchMusic()
  },
  watch: {
    // 监听搜索关键字,(关键字只有在按下enter之后才会被改变),改变后重新获取歌曲
    keywords () {
      this.getSearchMusic()
    }
  },

  methods: {
    // routeState判断当前在哪个路由
    // 1为单曲，2为歌手，3为专辑，4为视频，5为歌单，6为用户
    // 跳转到搜索用户时触发
    toSearchUser () {
      this.routeState = 6
      this.offset.num = 0
      this.getSearchUser()
    },
    // 跳转到搜索歌单时触发
    toSearchMusicLisi () {
      this.routeState = 5
      this.offset.num = 0
      this.getSearchMusicLisi()
    },

    // 跳转到搜索视频时触发
    toSearchVideo () {
      this.routeState = 4
      this.offset.num = 0
      this.getSearchVideo()
    },

    // 跳转到搜索专辑时触发
    toSearchAlbum () {
      this.routeState = 3
      this.offset.num = 0
      this.getSearchAlbum()
    },

    // 跳转到搜索歌手时触发
    toSearchSinger () {
      this.routeState = 2
      this.offset.num = 0
      this.getSearchSinger()
    },
    // 跳转到搜索音乐时触发
    toSearchMusic () {
      this.routeState = 1
      this.offset.num = 0
      this.getSearchMusic()
    },
    // 更改offset偏移量
    changOffset (num) {
      this.offset.num = num
      // 1为单曲，2为歌手，3为专辑，4为视频，5为歌单，6为用户
      // 按下分页时，根据当前路由不同，以向服务器获取不同的数据
      if (this.routeState === 1) {
        this.getSearchMusic()
      } else if (this.routeState === 2) {
        this.getSearchSinger()
      } else if (this.routeState === 3) {
        this.getSearchAlbum()
      } else if (this.routeState === 4) {
        this.getSearchVideo()
      } else if (this.routeState === 5) {
        this.getSearchMusicLisi()
      } else if (this.routeState === 6) {
        this.getSearchUser()
      }
    },
    // 获取搜索用户
    async getSearchUser () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 1002,
        offset: this.offset.num
      })
      // this.$store.commit('getsearchMusicLisi', res.result)
      console.log(res.result.userprofiles)
      // 直接使用路由的编程式导航传参
      this.$router.push({
        // path: '/searchUser',
        query: {
          key: res.result.userprofiles
        }
      })
      this.count.num = res.result.userprofileCount
      this.countText = '位用户'
    },
    // 获取搜索歌单
    async getSearchMusicLisi () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 1000,
        offset: this.offset.num
      })
      this.$store.commit('getsearchMusicLisi', res.result)
      // console.log(res)
      this.count.num = res.result.playlistCount
      this.countText = '个歌单'
    },

    // 获取搜索视频
    async getSearchVideo () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 1014,
        limit: 24,
        offset: this.offset.num
      })

      // console.log(res)
      this.$router.push({
        // path: '/searchVideo',
        query: {
          videoArray: res.result.videos
        }
      })
      this.count.num = res.result.videoCount
      this.countText = '个视频'
    },

    // 获取搜索专辑
    async getSearchAlbum () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 10,
        offset: this.offset.num
      })
      this.$store.commit('getSearchAlbumCount', res.result)
      // console.log(res)
      this.count.num = res.result.albumCount
      this.countText = '张专辑'
    },

    // 获取搜索歌曲
    async getSearchMusic () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 1,
        offset: this.offset.num
      })
      // 提交至vuex
      this.$store.commit('getSearchMusic', res)
      // console.log(res)
      // this.searchMusic = res
      // 更改数量
      this.count.num = res.result.songCount
      // 更改数量后面的文本
      this.countText = '首歌曲'
    },

    // 获取搜索歌手
    async getSearchSinger () {
      const { data: res } = await this.$api.search({
        keywords: this.keywords,
        type: 100,
        offset: this.offset.num
      })
      this.$store.commit('getSearchSinger', res.result)

      console.log(res)
      this.count.num = res.result.artistCount
      this.countText = '位歌手'
    }
  }
}
</script>

<style lang="less" scoped>
.searchPage {
  // padding: 0px,10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 25px;
  padding-bottom: 35px;
  h1 {
    font-size: 16px;
    color: #373737;
  }

  // 导航栏
  .musicListNavigation{
  margin-bottom: 20px;
  // margin-left: 10px;

  .el-menu{
    border-bottom: 0;
  }
  .el-menu-item{
    margin-right: 20px;
    padding: 0;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    // 选中时
    border-bottom: 4px solid #EC4141;
    font-size: 18px;
  }
  .navigationMenu/deep/ .el-menu-item.is-active{
    // 选中时字重
  font-weight: 700;
  }
  .el-menu--horizontal>.el-menu-item{
    // 未选中时的字体大小和颜色
    font-size: 14px;
    color: #373737;
  }
  .el-menu--horizontal>.el-menu-item{
    // 控制选中红线的高度
    height: 48px;
  }
  .el-menu::after, .el-menu::before {
  // 去掉自带的下边框线
  display: table;
  }

  .el-menu-item{
    // width: 10px;
    // 每一项的右距离
    margin-right: 32px;

  }
}
}
</style>
