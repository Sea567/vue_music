<template>
  <div class="AlbumContent-container">
    <!-- {{$route.query.id}} -->

    <div class="headBox">
      <!-- 左侧图片盒子 -->
      <div class="imgbox">
        <img v-if="AlbumContentData.album" :src="`${AlbumContentData.album.picUrl}?param=200y200`" alt="" />
        <img src="@/assets/img/DVD2.png" alt="" />
      </div>
      <!-- 右侧详情盒子 -->
      <div class="detailsBox">
        <!-- 红色专辑两个字 -->
        <div class="musicListName">专辑</div>
        <!-- 专辑名 -->
        <h2 v-if="AlbumContentData.album">{{ AlbumContentData.album.name }}</h2>
        <!-- 按钮区域 -->
        <div class="buttons hidden-sm-and-down">
          <el-button round>
            <i class="el-icon-caret-right"></i>
            <span
              >播放全部
              <i class="add el-icon-plus"></i>
            </span>
          </el-button>
          <el-button round>
            <i class="el-icon-folder-add"></i>
            <span>收藏 </span>
            <span>({{ AlbumDetailData.subCount }})</span>
          </el-button>
          <el-button round>
            <i class="el-icon-share"></i>
            <span>{{ AlbumDetailData.shareCount }}</span>
          </el-button>
        </div>
        <!-- 歌手 -->
        <div class="singer" v-if="AlbumContentData.album">
          歌手:
          <span>{{ AlbumContentData.album.artist.name }}</span>
        </div>
        <!-- 时间 -->
        <div class="createTime" v-if="AlbumContentData.album">
          时间:
          <span>{{ AlbumContentData.album.publishTime | dateformate }}</span>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="musicListNavigation">
      <el-menu width="100%" default-active="musicLisi" class="el-menu-demo navigationMenu" mode="horizontal">
        <el-menu-item index="musicLisi">歌曲列表</el-menu-item>
        <el-menu-item index="comment">评论({{ AlbumDetailData.commentCount }})</el-menu-item>
        <el-menu-item index="collector">专辑详情</el-menu-item>
      </el-menu>
    </div>
    <!-- 歌曲列表 -->
    <music-list-moudle :musicData="AlbumContentData.songs"></music-list-moudle>
  </div>
</template>

<script>
import MusicListMoudle from '../../search/MusicListMoudle.vue'

export default {
  components: { MusicListMoudle },
  provide () {
    return {
      SearchPage_Offset: this.offset
    }
  },
  data () {
    return {
      offset: { num: 0 },
      // 专辑内容
      AlbumContentData: {},
      // 专辑动态
      AlbumDetailData: {}
    }
  },
  created () {
    this.getAlbumContent()
  },
  methods: {
    // 获取专辑内容和动态
    async getAlbumContent () {
      // 获取内容
      const { data: res } = await this.$api.getAlbumContent({ id: this.$route.query.id })
      // 获取动态
      const { data: res2 } = await this.$api.getAlbumDetail({ id: this.$route.query.id })
      // console.log(res)
      // console.log(res2)
      this.AlbumContentData = res
      this.AlbumDetailData = res2
    }
  }
}
</script>

<style lang="less" scoped>
.AlbumContent-container {
  // 上面整片区域
  .headBox {
    margin-left: 10px;
    margin-top: 30px;
    height: 185px;
    width: 97%;

    // 左边图片
    .imgbox {
      float: left;
      // border: 1px solid red;
      width: 210px;
      height: 100%;
      img {
        border-radius: 5px;
        height: 100%;
      }
    }
    // 右边详情
    .detailsBox {
      position: relative;
      float: left;
      margin-left: 20px;
      width: calc(100% - 234px);
      height: 100%;

      // 红色专辑两个字
      .musicListName {
        margin-top: 5px;
        color: #ec4141;
        font-size: 14px;
        border: 1px solid #ec4141;
        border-radius: 2px;
        padding: 0 3px;
        position: absolute;
      }
      // 专辑名
      h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 47px;
        font-weight: 700;
        font-size: 22px;
        color: #373737;
      }
      // 按钮区域
      .buttons {
        margin-top: 8px;
        .el-button {
          line-height: 21px;
          height: 32px;
          padding: 5px 10px 5px 10px;
        }
        // 第一个button
        .el-button:nth-child(1) {
          border: 1px solid #ec4141;
          color: #fff;
          background-color: #ec4141;

          // 播放icon
          i {
            font-size: 22px;
            vertical-align: middle;
          }
          // 加号icon
          .add {
            margin-left: 15px;
            font-size: 16px;
            color: 252, 243, 243;
          }
        }
        .el-button:nth-child(1):hover {
          background-color: #cc3232;
        }
        // 第二三个button
        .el-button:nth-child(n + 2):hover {
          background-color: #f2f2f2;
          color: #343434;
          border: 1px solid #d8d8d8;
        }
      }
      // 歌手
      .singer {
        margin-top: 20px;
        font-size: 13px;
        color: #373737;
        span {
          margin-left: 8px;
          color: #507daf;
        }
      }
      // 时间
      .createTime {
        margin-top: 10px;
        color: #373737;
        font-size: 13px;
        span {
          margin-left: 8px;
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
</style>
