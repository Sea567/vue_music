<template>
  <div class="topListHome-container autoCenter">
    <!-- 官方榜单star -->
    <div class="officialList">
      <!-- 标题 -->
      <h1>官方榜</h1>
      <!-- 榜单的每一个 -->
      <!-- 由于不知道如果用循环渲染出里面的歌曲列表数据，于是手写4个，等待后续重构 -->
      <!-- 飙升榜 -->
      <div class="topListItemBox">
        <!-- 封面图盒子 -->
        <div class="coverImgBox">
          <!-- 图片 -->
          <img @click="toMusicListPage(firstFourTopList[0].id)" v-if="firstFourTopList[0]" :src="firstFourTopList[0].coverImgUrl" alt="" />
          <!-- 更新时间文字 -->
          <span v-if="firstFourTopList[0]">{{ firstFourTopList[0].updateFrequency }}</span>
          <!-- 经过时的播放图标 -->
          <i class="iconfont icon-24gf-play"></i>
        </div>
        <!-- 排行榜右侧歌曲展示列表盒子 -->

        <div class="musicListBox">
          <!-- {{getPlayListDetail (item.id)}} -->
          <!-- 每一行 -->
          <div :style="index % 2 === 0 ? 'background-color: #f9f9f9;' : ''" class="item" v-for="(item1, index) in firstFiveMusicDataOne" :key="item1.id" @dblclick="clickPlayMusic(item1.id)">
            <!-- 索引列 -->
            <span :style="index < 3 ? 'color: #ec4141;' : ''" class="index">{{ index + 1 }}</span>
            <!-- 歌曲名  -->
            <span class="name">{{ item1.name }}</span>
            <!-- 歌曲别名 -->
            <span class="tns" v-if="item1.alia[0] || item1.tns">
              {{ item1.alia[0] ? '(' + item1.alia[0] + ')' : '' }}
              {{ item1.tns ? '(' + item1.tns[0] + ')' : '' }}
            </span>
            <!-- 歌手名 -->
            <span class="singer">{{ item1.ar.length === 2 ? item1.ar[0].name + '/' + item1.ar[1].name : item1.ar[0].name }}</span>
          </div>

          <!-- 查看全部路由跳转 -->
          <span class="lookAll" @click="toMusicListPage(firstFourTopList[0].id)"
            >查看全部
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>

      <!-- 新歌榜 -->
      <div class="topListItemBox">
        <!-- 封面图盒子 -->
        <div class="coverImgBox">
          <!-- 图片 -->
          <img @click="toMusicListPage(firstFourTopList[1].id)" v-if="firstFourTopList[0]" :src="firstFourTopList[1].coverImgUrl" alt="" />
          <!-- 更新时间文字 -->
          <span v-if="firstFourTopList[0]">{{ firstFourTopList[1].updateFrequency }}</span>
          <!-- 经过时的播放图标 -->
          <i class="iconfont icon-24gf-play"></i>
        </div>
        <!-- 排行榜右侧歌曲展示列表盒子 -->
        <div class="musicListBox">
          <!-- {{getPlayListDetail (item.id)}} -->
          <!-- 每一行 -->
          <div @dblclick="clickPlayMusic(item1.id)" :style="index % 2 === 0 ? 'background-color: #f9f9f9;' : ''" class="item" v-for="(item1, index) in firstFiveMusicDataTwo" :key="item1.id">
            <span :style="index < 3 ? 'color: #ec4141;' : ''" class="index">{{ index + 1 }}</span>
            <span class="name">{{ item1.name }}</span>
            <!-- 歌曲别名 -->
            <span class="tns" v-if="item1.alia[0] || item1.tns">
              {{ item1.alia[0] ? '(' + item1.alia[0] + ')' : '' }}
              {{ item1.tns ? '(' + item1.tns[0] + ')' : '' }}
            </span>
            <!-- 歌手名 -->
            <span class="singer">{{ item1.ar.length === 2 ? item1.ar[0].name + '/' + item1.ar[1].name : item1.ar[0].name }}</span>
          </div>

          <!-- 查看全部路由跳转 -->
          <span class="lookAll" @click="toMusicListPage(firstFourTopList[1].id)"
            >查看全部
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>

      <!-- 原创榜 -->
      <div class="topListItemBox">
        <!-- 封面图盒子 -->
        <div class="coverImgBox">
          <!-- 图片 -->
          <img @click="toMusicListPage(firstFourTopList[2].id)" v-if="firstFourTopList[0]" :src="firstFourTopList[2].coverImgUrl" alt="" />
          <!-- 更新时间文字 -->
          <span v-if="firstFourTopList[0]">{{ firstFourTopList[2].updateFrequency }}</span>
          <!-- 经过时的播放图标 -->
          <i class="iconfont icon-24gf-play"></i>
        </div>
        <!-- 排行榜右侧歌曲展示列表盒子 -->
        <div class="musicListBox">
          <!-- {{getPlayListDetail (item.id)}} -->
          <!-- 每一行 -->
          <div @dblclick="clickPlayMusic(item1.id)" :style="index % 2 === 0 ? 'background-color: #f9f9f9;' : ''" class="item" v-for="(item1, index) in firstFiveMusicDataThree" :key="item1.id">
            <span :style="index < 3 ? 'color: #ec4141;' : ''" class="index">{{ index + 1 }}</span>
            <span class="name">{{ item1.name }}</span>
            <!-- 歌曲别名 -->
            <span class="tns" v-if="item1.alia[0] || item1.tns">
              {{ item1.alia[0] ? '(' + item1.alia[0] + ')' : '' }}
              {{ item1.tns ? '(' + item1.tns[0] + ')' : '' }}
            </span>
            <!-- 歌手名 -->
            <span class="singer">{{ item1.ar.length === 2 ? item1.ar[0].name + '/' + item1.ar[1].name : item1.ar[0].name }}</span>
          </div>

          <!-- 查看全部路由跳转 -->
          <span class="lookAll" @click="toMusicListPage(firstFourTopList[2].id)"
            >查看全部
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>

      <!-- 热歌榜 -->
      <div class="topListItemBox">
        <!-- 封面图盒子 -->
        <div class="coverImgBox" >
          <!-- 图片 -->
          <img @click="toMusicListPage(firstFourTopList[3].id)" v-if="firstFourTopList[0]" :src="firstFourTopList[3].coverImgUrl" alt="" />
          <!-- 更新时间文字 -->
          <span v-if="firstFourTopList[0]">{{ firstFourTopList[3].updateFrequency }}</span>
          <!-- 经过时的播放图标 -->
          <i class="iconfont icon-24gf-play"></i>
        </div>
        <!-- 排行榜右侧歌曲展示列表盒子 -->
        <div class="musicListBox">
          <!-- 每一行 -->
          <div @dblclick="clickPlayMusic(item1.id)" :style="index % 2 === 0 ? 'background-color: #f9f9f9;' : ''" class="item" v-for="(item1, index) in firstFiveMusicDataFour" :key="item1.id">
            <!-- 索引列 -->
            <span :style="index < 3 ? 'color: #ec4141;' : ''" class="index">{{ index + 1 }}</span>
            <!-- 歌曲名 -->
            <span class="name">{{ item1.name }}</span>
            <!-- 歌曲别名 -->
            <span class="tns" v-if="item1.alia[0] || item1.tns">
              {{ item1.alia[0] ? '(' + item1.alia[0] + ')' : '' }}
              {{ item1.tns ? '(' + item1.tns[0] + ')' : '' }}
            </span>
            <!-- 歌手名 -->
            <span class="singer">{{ item1.ar.length === 2 ? item1.ar[0].name + '/' + item1.ar[1].name : item1.ar[0].name }}</span>
          </div>

          <!-- 查看全部路由跳转 -->
          <span class="lookAll" @click="toMusicListPage(firstFourTopList[3].id)"
            >查看全部
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>

    <!-- 官方榜单end -->
    <!-- 全球榜star -->
    <div class="globalList">
      <h1>全球榜</h1>
      <el-row :gutter="20">
        <el-col :span="25" v-for="item in topListData" :key="item.id">
          <div class="itemBox">
            <div class="imgBox" @click="toMusicListPage(item.id)">
              <img :src="`${item.coverImgUrl}?param=200y200`" alt="" />

              <i class="iconfont icon-24gl-play playCount"> {{item.playCount|playvolume}}</i>
              <i class="iconfont icon-24gf-play playIcon"></i>
            </div>
            <span class="name">{{ item.name }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 全球榜end -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 排行榜前五首歌曲数据
      firstFiveMusicDataFour: [],
      firstFiveMusicDataThree: [],
      firstFiveMusicDataTwo: [],
      firstFiveMusicDataOne: [],
      // 前四个排行榜的数据
      firstFourTopList: [],
      // 排行榜数据 第5个到最后一个
      topListData: {}
    }
  },
  created () {
    this.getTopLIst()
    this.getPlayListDetail()
    this.getPlayListDetailTwo()
    this.getPlayListDetailThree()
    this.getPlayListDetailFour()
  },

  methods: {

    // 跳转到歌单详情
    toMusicListPage (id) {
      this.$store.commit('getMusicListId', id)
      this.$router.push('/musiclist')
    },
    // 获取歌曲url
    async clickPlayMusic (id) {
      // 获取歌曲信息
      const { data: res } = await this.$api.getMusicInfo({ ids: id })
      // console.log(res)
      // 获取歌曲url
      const { data: res1 } = await this.$api.getMusicUrl({ id: id })
      // console.log(res1)
      // 将歌曲信息和url提交至vuex，注意最终传参
      this.$store.commit('getMusicInfo', res.songs)
      this.$store.commit('getMusicUrl', res1.data[0].url)
    },
    // 获取前四个排行榜详情
    async getPlayListDetailFour () {
      const { data: res } = await this.$api.getPlayListDetail({ id: 3778678, limit: 5 })
      this.firstFiveMusicDataFour = res.songs
    },
    async getPlayListDetailThree () {
      const { data: res } = await this.$api.getPlayListDetail({ id: 2884035, limit: 5 })
      this.firstFiveMusicDataThree = res.songs
    },
    async getPlayListDetailTwo () {
      const { data: res } = await this.$api.getPlayListDetail({ id: 3779629, limit: 5 })
      this.firstFiveMusicDataTwo = res.songs
    },
    async getPlayListDetail () {
      const { data: res } = await this.$api.getPlayListDetail({ id: 19723756, limit: 5 })
      this.firstFiveMusicDataOne = res.songs
    },
    // 获取各种排行榜
    async getTopLIst () {
      const { data: res } = await this.$api.getTopLIst()
      // console.log('排行榜')
      // console.log(res)
      // 截取前4个排行榜
      this.firstFourTopList = res.list.slice(0, 4)
      this.topListData = res.list.slice(4, res.list.length)
    }
  }
}
</script>

<style lang="less" scoped>
.topListHome-container {
  box-sizing: border-box;
  padding: 0px 10px;
  // 官方榜单star
  .officialList {
    // height: 1000px;
    // background-color: pink;

    h1 {
      color: #373737;
      margin: 6px 0px;
      font-size: 21px;
    }
    // 榜单的每一个
    .topListItemBox {
      margin-top: 15px;
      margin-bottom: 5px;
      height: 200px;
      // background-color: pink;

      // 封面图盒子
      .coverImgBox {
        cursor: pointer;
        position: relative;
        float: left;
        height: 170px;
        width: 170px;
        // background-color: red;
        &:hover i {
          display: block;
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
        // 更新时间文字
        span {
          position: absolute;
          top: 65%;
          left: 35%;
          color: #fff;
          font-size: 12px;
        }
        // 播放按钮
        i {
          display: none;
          position: absolute;
          bottom: 37%;
          right: 37%;
          border-radius: 50px;
          text-align: center;
          line-height: 40px;
          // display: inline-block;
          height: 40px;
          width: 40px;
          background-color: rgba(255, 255, 255, 0.6);
          font-size: 22px;
          color: red;
        }
      }
      // 排行榜右侧歌曲展示列表盒子
      .musicListBox {
        float: left;
        margin-left: 35px;
        // background-color: red;
        box-sizing: border-box;
        // border: 1px solid rgb(67, 54, 56);
        // 使宽度始终占满右侧盒子
        width: calc(100% - 205px);
        height: 100%;
        .item {
          position: relative;
          height: 35px;
          width: 100%;
          // border: 1px solid green;
          // background-color: rgb(133, 128, 128);
          &:hover {
            background-color: #f4f4f4;
          }
          span {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            // font-size: 14px;
          }
          .index {
            margin-left: 10px;
            font-size: 15px;
            color: #9b9b9b;
            // color:red;
          }
          .name {
            margin-left: 10px;
            font-size: 12px;
            color: #363636;
          }
          // 别名
          .tns {
            font-size: 12px;
            color: #a5a5a5;
          }
          .singer {
            position: absolute;
            right: 10px;
            font-size: 12px;
            color: #a5a5a5;
          }
        }
        // 查看全部
        .lookAll {
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          margin-top: 5px;
          font-size: 12px;
          color: #767676;
        }
      }
    }
  }
  // 官方榜单end
  // 全球榜star
  .globalList {
    h1 {
      color: #373737;
      margin-top: 15px;

      font-size: 21px;
    }
    .el-col {
      margin-top: 25px;
    }
    .itemBox {
      cursor: pointer;
      .imgBox {
        &:hover .playIcon{
          display: block;
        }
        position: relative;
        width: 100%;
        img {
          border-radius: 5px;
          width: 100%;
        }
        .playCount{
          position: absolute;
          top: 5px;
          right: 10px;
          color: rgb(255, 255, 255);
          font-size: 12px;
        }
        .playIcon{
          display: none;
          background-color: rgba(255, 255, 255,0.9);
          position: absolute;
          top: 37%;
          left: 39%;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50px;
          color: #ec4141;
        }
      }
      .name {
        cursor: pointer;
        width: 100%;
        color: #606060;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  // 全球榜end
}
</style>
