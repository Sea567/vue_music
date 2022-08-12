<template>
  <div class="NewSong-contioner">
    <!-- 骨架屏  由父组件控制显示-->
    <el-skeleton v-if="isLoading" :rows="8" animated/>
    <div class="playAllBox">
      <span class="playAll">
        <i class="iconfont icon-bofangqi-bofangshu"></i>
        播放全部
        </span>
      <span class="collectAll">
        <i class="el-icon-folder-add"></i>
        收藏全部
      </span>
    </div>

    <div @dblclick="clickPlayMusic(item.id)" :style="index % 2 === 1 ? 'background-color: #fff;' : ''" class="item" v-for="(item, index) in newSongData" :key="item.id">
      <el-row>
        <!-- 索引 -->
        <el-col :span="1">
          <span class="index">{{ (index + 1).toString().length > 1 ? index + 1 : '0' + (index + 1) }}</span>
        </el-col>
        <!-- 图片 -->
        <el-col :span="2">
          <div class="imgBox" @click="clickPlayMusic(item.id)">
            <img :src="`${item.album.blurPicUrl}?param=80y80`" alt="" />

          </div>
        </el-col>
        <!-- 歌名 -->
        <el-col :span="9">
          <div class="musicNameBox">
            <span class="musicName">{{ item.name }} </span>
            <span class="alias" v-if="item.alias[0]">( {{ item.alias[0] }} )</span>
            <span class="mv" v-if="item.mvid !== 0">MV</span>
            <span class="mv" >SQ</span>
          </div>
        </el-col>
        <!-- 歌手名 -->
        <el-col :span="4">
          <div class="singerNameBox">
          <span v-for=" (item1,index1) in item.artists" :key="item1.id" class="singerName">
            {{ item1.name }}
          <span v-if="item.artists.length>1 && !(index1 == item.artists.length -1) ">/</span>
          </span>
          </div>
        </el-col>
        <!-- 专辑名 -->
        <el-col :span="6">
          <div class="albumNameBox">
          <span class="albumName">{{ item.album.name }}</span>
          </div>
        </el-col>
        <!-- 时长 -->
        <el-col :span="2">
          <span class="playTime" v-if="item.mMusic">{{ item.mMusic.playTime | timeformate }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    newSongData: {
      type: Array
    },
    isLoading: {
      type: Boolean
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less" scoped>
.NewSong-contioner {
  margin-top: 18px;
  position: relative;
      // 骨架屏
    /deep/.el-skeleton{
    // position: fixed;
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #fff;
    // height: 100vw;
  }
  // 右上角的播放全部和收藏全部
  .playAllBox{
    // border: 1px solid red;
    position: absolute;
    width: 190px;
    top: -40px;
    right: 30px;
    // 播放全部
    .playAll{
      cursor: pointer;
      line-height: 24px;
      display: inline-block;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 100;
      height: 24px;
      width: 90px;
      color: #fff;
      background-color: #ec4141;
      &:hover{
        background-color: #d73535;
      }
      i{
        margin-left: 5px;
        vertical-align: middle;
        display: inline-block;
        // margin-top: 5px;
        font-size: 20px;
      }
    }
    // 收藏全部
    .collectAll{
      cursor: pointer;
      margin-left: 10px;
      display: inline-block;
      border: 1px solid #d8d8d8;
      padding: 0px 10px;
      height: 24px;
      line-height: 24px;
      // height: 24px;
      border-radius: 20px;
      color: #373737;
      font-size: 12px;
      &:hover{
        background-color: #f2f2f2;
      }
      i{
        vertical-align: middle;
        font-size: 14px;
        color: #8b8b8b;
      }
    }

  }

  .item {
    background-color: #f9f9f9;
    // margin-top: 10px;
    height: 80px;
    line-height: 80px;
    &:hover {
      background-color: #f0f1f2 !important;
    }
    // 索引
    .index {
      margin-left: 15px;
      color: #cacae1;
      font-size: 12px;
      font-weight: 100;
    }
    // 图片
    .imgBox {
      cursor: pointer;
      img {
        vertical-align: middle;
        width: 60px;
        border-radius: 5px;
        // margin-top: 10px;
      }
    }
    // 歌名区域
    .musicNameBox {
      // width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // 歌名
      .musicName {
        font-size: 14px;
        color: #363636;
      }
      // 别名
      .alias {
        font-size: 14px;
        color: #9b9b9b;
      }
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
    }
    .singerName,
    .albumName,
    .playTime {
      color: #616162;
      font-size: 12px;

    }
    .singerName,
    .albumName{
       cursor: pointer;
       &:hover{
         color: #343434;
       }
    }

    // 歌手名和专辑名区域
    .singerNameBox,.albumNameBox{

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

  }
}
</style>
