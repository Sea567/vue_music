<template>
  <!-- // 相似歌单歌曲组件 -->
  <!-- 多套了一个父盒子，用于最下面的淡出白色阴影效果定位 -->
  <div class="box">
    <div class="simi">
      <!-- 相似歌单区域 -->
      <!-- {{appVue}} -->
      <div class="playListBox" v-if="playLists[0]">
        <!-- {{appVue}} -->
        <h4>包含这首歌的歌单</h4>
        <div class="item" v-for="item in playLists" :key="item.id" @click="toSimilarPlayLists(item)">
          <img :src="`${item.coverImgUrl}?param=80y80`" alt="" />

          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 相似歌曲区域 -->
      <div class="musicBox">
        <h4>喜欢这首歌的也听</h4>
        <div class="item" v-for="item in SimiMusic.songs" :key="item.id" @click="playSimilarMusic(item)">
          <img :src="`${item.album.picUrl}?param=80y80`" alt="" />

          <span>{{ item.name }}</span>
        </div>
      </div>
      <br>
      <br>
      <br>
    </div>
    <!-- 用于制作白色阴影 -->
    <div class="shadow"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // 接收祖父组件(App)的方法
  inject: ['closeDrawer'],
  data () {
    return {
      // 相似歌单数据
      playLists: [],
      // 相似歌曲数据
      SimiMusic: []
    }
  },

  created () {
    // 获取相似歌单
    this.getSimiPlayList()
    // 获取相似歌曲
    this.getSimiMusic()
    // console.log(this.musicInfo)
  },
  methods: {
    // 获取歌单信息并跳转到歌单页面
    toSimilarPlayLists (item) {
      // console.log(item)
      this.$store.commit('getMusicListId', item.id)
      // 判断当前router路径，如果在当前组件则不跳转
      if (this.$route.path !== '/musiclist') {
        this.$router.push('/musiclist')
      }
      // 调用app.vue的方法
      this.closeDrawer()
    },
    // 点击相似歌曲播放音乐
    async playSimilarMusic (item) {
      // 获取音乐url
      const { data: res } = await this.$api.getMusicUrl({ id: item.id })
      // 将url同步至vuex
      this.$store.commit('getMusicUrl', res.data[0].url)
      // 获取歌曲详细信息
      const { data: musicInfo } = await this.$api.getMusicInfo({ ids: item.id })
      this.$store.commit('getMusicInfo', musicInfo.songs)
    },
    // 获取相似歌单
    async getSimiPlayList () {
      const { data: res } = await this.$api.getSimiPlayList({ id: this.musicInfo[0].id })
      this.playLists = res.playlists
    },
    // 获取相似歌曲
    async getSimiMusic () {
      const { data: res } = await this.$api.getSimiMusic({ id: this.musicInfo[0].id })
      this.SimiMusic = res
    }
  },
  computed: {
    ...mapState(['musicInfo'])
  },
  watch: {
    musicInfo () {
      // 监听到musicInfo 改变时，重新获取相似歌曲和歌单
      this.getSimiPlayList()
      this.getSimiMusic()
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  // 多套了一个父盒子，用于最下面的淡出白色阴影效果定位
  position: relative;
  width: 220px;
  .shadow {
    top: 280px;
    height: 0px;
    width: 210px;
    // border: 1px solid red;
    box-shadow: -7px -10px 22px 15px rgb(255, 255, 255);
    position: absolute;
  }
  .simi {
    height: 280px;
    overflow: scroll;
    // border: 1px solid red;

    .playListBox {
      height: 174px;
      // border: 1px solid red;
      h4 {
        cursor: default;
        height: 23px;
        font-size: 14px;
        color: #2f2d2d;
      }
                .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        // border: 1px solid red;
        // margin-top: 15px;
        box-sizing: border-box;
        &:hover{
          background-color: #EEEEF2;
        }

        img {
          margin-left: 5px;
          vertical-align: middle;
          width: 25px;
          border-radius: 4px;
        }
        span {
          display:inline-block;
          cursor: default;
          margin-left: 10px;
          vertical-align: middle;
          font-size: 12px;
          color: #313030;
          width: 180px;;
          // border: 1px solid red;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
      }

    }
    .musicBox {

      h4 {
        cursor: default;
        height: 23px;
        font-size: 14px;
        color: #2f2d2d;
      }
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        // border: 1px solid red;
        // margin-top: 15px;
        box-sizing: border-box;
        &:hover{
          background-color: #EEEEF2;
        }
        img {
          margin-left: 5px;
          vertical-align: middle;
          width: 25px;
          border-radius: 4px;
        }
        span {
          cursor: default;
          display: inline-block;
          width: 180px;
          // border: 1px solid red;
          margin-left: 10px;
          vertical-align: middle;
          font-size: 12px;
          color: #313030;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
      }
    }
  }
}
</style>
