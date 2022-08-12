<template>
  <!-- 个性推荐旁边的歌单组件 -->
  <div class="songListHome-container">
    <!-- 精品歌单star -->
    <div class="competitiveSongList">
      <!-- 背景图片 -->
      <img v-if="BoutiqueListData.playlists" :src="`${BoutiqueListData.playlists[0].coverImgUrl}?param=80y80`" alt="" />

      <!-- 模糊层      -->
      <div class="backgroundBox">
        <!-- {{BoutiqueListData}} -->
        <div class="imgbox">
          <img v-if="BoutiqueListData.playlists" :src="`${BoutiqueListData.playlists[0].coverImgUrl}?param=200y200`" alt="" />
        </div>
        <div class="contentBox">
          <!-- 精品歌单文字 -->
          <div class="competitiveSongListText">
            <i class="iconfont icon-huangguan"></i>
            <span> 精品歌单</span>
          </div>
          <!-- 歌单名 -->
          <div v-if="BoutiqueListData.playlists" class="songlistName">{{ BoutiqueListData.playlists[0].name }}</div>
          <!-- 歌单简介 -->
          <div v-if="BoutiqueListData.playlists" class="songlistSynopsis">{{ BoutiqueListData.playlists[0].copywriter }}</div>
        </div>
      </div>
    </div>
    <!-- 精品歌单end -->

    <!-- 标签导航栏star -->
    <div class="tag">
      <div class="leftTag">
        {{ this.cat }}
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="rightTag">
        <span v-for="item in hotSongListTagData.tags" :key="item.id" @click="changTag(item.name)">
          {{ item.name }}
        </span>
      </div>
    </div>
    <!-- 标签导航栏end -->

    <!-- 热门歌单列表star -->
    <div class="hotSongListBox">
      <el-row :gutter="20">
        <el-col :span="25" v-for="item in hotSongListData.playlists" :key="item.id">
          <div class="hotSongLis"  >
            <!-- 图片盒子 -->
            <div class="imgBox" @click="toMusicListPage(item.id)">
              <!-- 上下阴影 使用after伪元素构成-->

              <!-- 经过时显示的播放按钮 -->
              <div class="playBtnBox">
                <i class="iconfont icon-24gf-play"></i>
              </div>
              <!-- 图片 -->
              <img :src="`${item.coverImgUrl}?param=200y200`" alt="" />

              <!-- 创建者名 -->
              <i class="el-icon-user username"
                >{{ item.creator.nickname }}
                <!-- 身份图标 -->
                <img class="identityImg" v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail.identityIconUrl" alt="" />
              </i>
              <!-- 播放数 -->
              <i class="iconfont icon-24gl-play playCount">{{ item.playCount | playvolume }}</i>
            </div>
            <!-- 歌单名 -->
            <span>{{ item.name }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 热门歌单列表end -->

    <!-- 底部分页栏star -->
    <PaginationTwo :Count="this.count" @ChangOffset="this.changOffset"></PaginationTwo>
    <!-- 底部分页栏end -->
  </div>
</template>

<script>
import PaginationTwo from '@/views/findMusic/songList/PaginationTwo.vue'
export default {
  data () {
    return {
      // 获取到的歌单数目
      count: 0,
      // 偏移量，用于分页
      offset: 0,
      // 热门歌单数据
      hotSongListData () {},
      // 热门歌单标签数据
      hotSongListTagData: {},
      // 当前展示的精品歌单的标签
      cat: '华语',
      // 精品歌单数据,
      BoutiqueListData: {}
    }
  },
  components: {
    PaginationTwo
  },

  created () {
    // 获取精品歌单
    this.getBoutiqueList()
    // 获取热门歌单分类标签
    this.getHotsongListTag()
    // 获取热门歌单
    this.getHotsongList()
  },
  methods: {
    // 跳转到歌单列表详细界面
    toMusicListPage (id) {
      // console.log(id)
      this.$store.commit('getMusicListId', id)
      this.$router.push('/musiclist')
    },
    // 改变偏移量
    changOffset (num) {
      this.offset = num
      this.getHotsongList()
    },
    // 改变标签
    changTag (tag) {
      this.cat = tag
      this.getBoutiqueList()
      this.getHotsongList()
    },
    // 获取热门歌单
    async getHotsongList () {
      const { data: res } = await this.$api.getHotsongList({ cat: this.cat, offset: this.offset })
      // console.log(res)
      this.count = res.total
      this.hotSongListData = res
    },
    // 获取热门歌单分类标签
    async getHotsongListTag () {
      const { data: res } = await this.$api.getHotsongListTag({})
      // console.log(res)
      this.hotSongListTagData = res
    },
    // 获取精品歌单
    async getBoutiqueList () {
      const { data: res } = await this.$api.getBoutiqueList({ cat: this.cat })
      // console.log(res)
      this.BoutiqueListData = res
    }
  }
}
</script>

<style lang="less" scoped>
// 自定义el-col宽度,使其每行显示5个
.el-col-25 {
  width: 20%;
}
// 解决排版错乱的问题
.el-row {
  display: flex;
  flex-wrap: wrap;
}
//
//
// 视窗宽度小于1370px时
@media screen and (max-width: 1370px) {
  .competitiveSongList,
  .tag,
  .hotSongListBox {
    width: 100%;
  }
}
// 视窗宽度大于1370px时
@media screen and (min-width: 1370px) {
  .competitiveSongList,
  .tag,
  .hotSongListBox {
    width: 1100px;
  }
}
//
//
//

.songListHome-container {
  box-sizing: border-box;
  padding: 0px 15px;
  // text-align: center;
  // 精品歌单star
  .competitiveSongList {
    position: relative;
    margin: 0 auto;
    height: 170px;
    border-radius: 10px;
    // border: 1px solid red;
    box-sizing: border-box;
    // 背景图片
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    // 模糊层
    .backgroundBox {
      cursor: pointer;
      top: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(30px);
      background-color: rgba(9, 9, 9, 0.3);
      border-radius: 10px;
      // 图片盒子
      .imgbox {
        float: left;
        margin-top: 15px;
        margin-left: 15px;
        width: 140px;
        height: 140px;
        // border: 1px solid red;
        img {
          border-radius: 5px;
        }
      }
      // 内容盒子
      .contentBox {
        margin-top: 15px;
        margin-left: 15px;
        float: left;
        width: 50%;
        height: 140px;
        // border: 1px solid red;
        // 精品歌单文字
        .competitiveSongListText {
          margin-top: 15px;
          width: 100px;
          height: 30px;
          border-radius: 20px;
          font-size: 13px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #e7aa5a;
          color: #e7aa5a;
        }
        // 歌单名
        .songlistName {
          margin-top: 20px;
          color: #fff;
        }
        // 歌单简介
        .songlistSynopsis {
          margin-top: 8px;
          color: #bcb1a0;
          font-size: 12px;
        }
      }
    }
  }
  // 精品歌单end
  // <!-- 标签导航栏star -->
  .tag {
    margin: 15px auto;
    height: 30px;
    // border: 1px solid red;
    // 左侧标签
    .leftTag {
      float: left;
      height: 30px;
      width: 100px;
      // background-color: pink;
      border: 1px solid #d6d6d6;
      border-radius: 20px;
      color: #373737;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
    }
    // 右侧标签
    .rightTag {
      // line-height: 27px;
      float: right;
      span {
        margin-top: 5px;
        display: inline-block;
        line-height: 20px;
        height: 20px;
        // background-color: pink;
        // margin-left: 15px;
        border-radius: 12px;
        padding: 0px 9px;
        font-size: 10px;
        font-weight: 100;
        color: #676767;
      }
      span:hover {
        color: #000000;
        background-color: #fdf5f5;
        // background-color: red;
      }
    }
  }
  // <!-- 标签导航栏end -->

  // <!-- 热门歌单列表star -->
  .hotSongListBox {
    margin: 0px auto;
    // 单个盒子
    .hotSongLis {

      width: 100%;
      margin-top: 5px;
      // 图片盒子
      .imgBox {
        &:hover .playBtnBox{
          display: block;
        }
        .playBtnBox{
          display: none;
          position: absolute;
          height: 40px;
          width: 40px;
          border-radius: 60px;
          bottom: 10px;
          right: 10px;
          background-color: #fff;
          text-align: center;
          line-height: 40px;
          i{
            font-size: 20px;
            margin-left: 3px;
            color: #ec4141;

          }
        }
        overflow: hidden;
        // 上阴影
        &::before{
          content:"";
          position: absolute;
          top: 0px;
          z-index: 1;
          left: 0px;
          display: inline-block;
          // height: 5px;
          width: 100%;
          background-color: red;
          box-shadow: 0px 7px 30px 4px #000000;
        }
        // 下阴影
        &::after{
          content:'';
          position: absolute;
          bottom: 0px;
          z-index: 1;
          left: 0px;
          display: inline-block;
          // height: 5px;
          width: 100%;
          background-color: red;
          box-shadow: 0px -10px 30px 4px #000000;
        }
        i {
          cursor: pointer;
        }
        position: relative;
        width: 100%;
        // 歌单图
        img {
          width: 100%;
          border-radius: 5px;
          cursor: pointer;
        }
        // 创建者名
        .username {
          z-index: 2;
          position: absolute;
          left: 10px;
          bottom: 13px;
          color: white;
          font-size: 12px;
          // 身份图标
          .identityImg {
            width: 12px;
            vertical-align: bottom;
          }
        }
        // 播放数量
        .playCount {
          color: #fff;
          z-index: 10;
          right: 5px;
          top: 5px;
          font-size: 12px;
          position: absolute;
        }
      }
      // <!-- 歌单名 -->
      span {
        color: #373737;
        display: inline-block;
        height: 40px;
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        // 两行文字溢出隐藏...
        // -webkit-line-clamp CSS 属性 可以把
        //  块容器 中的内容限制为指定的行数.
        // 它只有在 display 属性设置成 -webkit-box
        // 或者 -webkit-inline-box 并且
        //  -webkit-box-orient (en-US)
        //   属性设置成 vertical时才有效果
        // 在大部分情况下,也需要设置 overflow
        // 属性为 hidden, 否则,里面的内容不会被裁减,
        // 并且在内容显示为指定行数后还会显示省略号(ellipsis ).
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        // 内容限制为指定的行数
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  // <!-- 热门歌单列表end -->
}
</style>
