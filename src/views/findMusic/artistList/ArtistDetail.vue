<template>
  <!-- 歌手详情组件 -->
  <div class="ArtistDetail-container" v-infinite-scroll="load" infinite-scroll-immediate="false">
    <!-- 歌手详情组件-->
    <div class="headerBox">
      <div class="imgBox">
        <!-- {{ArtistDetailData.user.avatarUrl}} -->

        <!-- {{ArtistDetailData.user.avatarUrl?ArtistDetailData.user.avatarUrl:ArtistDetailData.artist.cover}} -->
        <!-- <img  v-if="ArtistDetailData.user||ArtistDetailData.artist" :src="`${ArtistDetailData.user.avatarUrl?ArtistDetailData.user.avatarUrl:ArtistDetailData.artist.cover}?param=200y200`" alt=""> -->
        <img v-if="ArtistDetailData.user" :src="`${ArtistDetailData.user.avatarUrl}?param=200y200`" alt="" />
        <img v-if="ArtistDetailData.artist && !ArtistDetailData.user" :src="`${ArtistDetailData.artist.cover}?param=200y200`" alt="" />
      </div>
      <div class="detailBox">
        <!-- 名字 -->
        <h1 v-if="ArtistDetailData.artist">{{ ArtistDetailData.artist.name }}</h1>
        <!-- 两个按钮 -->
        <div class="buttonBox">
          <span><i class="el-icon-folder-add"></i> 收藏</span>
          <span>
            <i class="el-icon-user"></i>
            个人主页
          </span>
        </div>
        <!-- 作品数量 -->
        <div class="NumberBox">
          <span v-if="ArtistDetailData.artist">单曲数:{{ ArtistDetailData.artist.musicSize }}</span>
          <span v-if="ArtistDetailData.artist">专辑数:{{ ArtistDetailData.artist.albumSize }}</span>
          <span v-if="ArtistDetailData.artist">MV数:{{ ArtistDetailData.artist.mvSize }}</span>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="musicListNavigation">
      <el-menu width="100%"  :default-active="$route.path.slice(1)" class="el-menu-demo navigationMenu" mode="horizontal">
        <el-menu-item index="artistalbum" @click="toArtistalbum" >专辑</el-menu-item>
        <el-menu-item index="artistMV" @click="toArtistMV"  >MV</el-menu-item>
        <el-menu-item index="artistDetailText" @click="toArtistDetailText">歌手详情</el-menu-item>
        <el-menu-item index="artistSimilarity" @click="toArtistsimilarity" >相似歌手</el-menu-item>
      </el-menu>
    </div>
    <router-view ref="routerRef"></router-view>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['aitistId'])
  },
  watch: {
    aitistId () {
      this.getArtistDetail()
    }
  },
  data () {
    return {
      // artistID: this.$route.query.id,

      // 歌手详情数据
      ArtistDetailData: {}
    }
  },
  created () {
    this.getArtistDetail()
  },

  methods: {
    // 路由跳转4个
    toArtistsimilarity () {
      if (this.$route.path === '/artistSimilarity') return
      this.$router.push({
        path: '/artistSimilarity',
        query: { id: this.aitistId }
      })
    },
    toArtistDetailText () {
      if (this.$route.path === '/artistDetailText') return
      this.$router.push({
        path: '/artistDetailText',
        query: { id: this.aitistId }
      })
    },
    toArtistMV () {
      if (this.$route.path === '/artistMV') return
      this.$router.push({
        path: '/artistMV',
        query: { id: this.aitistId }
      })
    },
    toArtistalbum () {
      if (this.$route.path === '/artistalbum') return
      this.$router.push({
        path: '/artistalbum',
        query: { id: this.aitistId }
      })
    },
    // 获取歌手详情
    async getArtistDetail () {
      const { data: res } = await this.$api.getArtistDetail({ id: this.aitistId })
      console.log(res)

      this.ArtistDetailData = res.data
      console.log('被调用了')
      this.$forceUpdate()
    },
    // 懒加载
    load () {
      if (this.$route.path !== '/artistMV') return
      console.log('懒加载了')
      this.$refs.routerRef.getArtistMv()
    }
  }
}
</script>

<style lang="less" scoped>
.ArtistDetail-container {
    // height:550px;
  height: 99%;
  overflow: auto;
  // background-color: pink;

  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  .headerBox {
    height: 185px;
    width: 100%;

    .imgBox {
      float: left;

      height: 100%;
      width: 185px;
      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
      }
    }
    .detailBox {
      float: left;
      margin-left: 20px;
      height: 100%;
      width: calc(100% - 210px);

      // 名字
      h1 {
        color: #373737;
        font-size: 22px;
      }
      // 两个按钮
      .buttonBox {
        margin-top: 10px;

        span:nth-child(1) {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          // width: 100px;
          padding: 0px 15px;
          color: #373737;
          border: 1px solid #d8d8d8;
          border-radius: 20px;
          text-align: center;
          font-size: 14px;
          &:hover {
            background-color: #f2f2f2;
          }
          i {
            display: inline-block;
            // margin-top: 10px;
            font-size: 16px;
            // vertical-align: middle;
            // vertical-align: top;
          }
        }
        span:nth-child(2) {
          margin-left: 10px;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          // width: 100px;
          padding: 0px 15px;
          color: #373737;
          border: 1px solid #d8d8d8;
          border-radius: 20px;
          text-align: center;
          font-size: 14px;
          &:hover {
            background-color: #f2f2f2;
          }
          i {
            display: inline-block;
            // margin-top: 10px;
            font-size: 16px;
            // vertical-align: middle;
            // vertical-align: top;
          }
        }
      }
      // 作品数量
      .NumberBox {
        span {
          display: inline-block;
          font-size: 13px;
          color: #373737;
          margin-right: 20px;
          margin-top: 20px;
        }
      }
    }
  }
  // 导航栏
  .musicListNavigation {
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 10px;

    .el-menu {
      border-bottom: 0;
    }
    .el-menu-item {
      margin-right: 20px;
      padding: 0;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      // 选中时
      border-bottom: 4px solid #ec4141;
      font-size: 18px;
    }
    .navigationMenu/deep/ .el-menu-item.is-active {
      // 选中时字重
      font-weight: 700;
    }
    .el-menu--horizontal > .el-menu-item {
      // 未选中时的字体大小和颜色
      font-size: 14px;
      color: #373737;
    }
    .el-menu--horizontal > .el-menu-item {
      // 控制选中红线的高度
      height: 48px;
    }
    .el-menu::after,
    .el-menu::before {
      // 去掉自带的下边框线
      display: table;
    }
  }
}
// top50和后面的专辑
.top50 {
  margin-bottom: 50px;
  // 伪元素清除浮动
  &:after {
    content: '';
    height: 0px;
    line-height: 0px;
    display: block;
    visibility: hidden;
    clear: both;
  }
  // height: 400px;
  // border: 1px solid red;
  .top50-img {
    cursor: pointer;
    float: left;
    width: 150px;
    height: 150px;
    // border: 1px solid red;
    img{
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
  }
  .top50-songlist {

    margin-left: 60px;
    float: left;
    width: calc(100% - 230px);
    // height: 100%;
    // border: 1px solid red;
    .top50-songlist-title {
      h4 {
        display: inline-block;
        color: #373737;
      }
      i {
        vertical-align: middle;
      }
      // 播放icon
      i:nth-child(2) {
        cursor: pointer;
        margin-left: 23px;
        font-size: 24px;
        color: #666666;
      }
      // 竖线icon
      i:nth-child(3) {
        margin-left: 2px;
        font-size: 16px;
        color: #d8d8d8;
      }
      // 收藏icon
      i:nth-child(4) {
        cursor: pointer;
        margin-left: 5px;
        font-size: 22px;
        color: #666666;
      }
    }
    .top50-songlist-list {
        // mv红字
        .mv{
        cursor: pointer;
        display: inline-block;
        margin-left: 5px;
        border: 1px solid #ec4141;
        height: 10px;
        line-height: 9px;
        border-radius: 3px;
        padding: 0px 3px;
        font-size: 12px;
        color: #ec4141;
      }
      height: 355px;
      // height: '';
      overflow: auto;
      // 歌曲列表
      /deep/.el-table.musicList {
        font-size: 12px !important;
        // margin-left: 1.5%;
      }
      /deep/.el-table .el-table__cell {
        // 每一行的高度
        padding: 6px 0;
      }
      // 去掉每行的bottom线
      /deep/.el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border-bottom: 0px;
      }
      // 去掉table底部的线
      /deep/.el-table::before{
        height: 0px;
      }
      //去掉头部的空行
      /deep/.el-table th {
        display: none;
      }
    }
  }
  .look-all {
    // border-top: 1px solid #e1e1e1;
    line-height: 35px;
    cursor: pointer;
    height: 35px;
    font-size: 12px;
    color: #9b9b9b;
    background-color: #f9f9f9;
    span{
      cursor: pointer;
      float: right;
    }
  }
}

</style>
