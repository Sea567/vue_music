<template>
<!-- 歌手mv组件 -->
  <div class="searchVideo" >
    <el-row :gutter="20" >
      <el-col :span="elColSpan" v-for="(item) in albumArray" :key="item.id">
        <!-- 每一个视频块 -->
        <div class="videoBox" >
          <div class="imgBox">
          <!-- 播放数star -->
          <div class="playCountBox">
            <i class="iconfont icon-24gl-play "> {{item.playCount|playvolume}}</i>
          </div>
          <!-- 播放数end -->

          <!-- 视频时长  -->
          <span class="playTime">{{item.duration|timeformate}}</span>

          <img :src="`${item.imgurl16v9}?param=320y180`" alt="">
          </div>
          <!-- 标题盒子 -->
          <div class="titleBox">
            <!-- mv红色框 -->
          <span class="mv" v-if="item.type === 0">MV</span>
          <!-- 标题 -->
          <span class="title" :style="item.type === 0? 'width: 85%':'' ">{{item.name}}</span>
          </div>

          <!-- 创建者 -->
          <div class="creatorBox">
            <!-- type === 1为视频  0为mv -->
            <span class="creator" v-for="creatorItem in item.creator" :key="creatorItem.userId">
              <span v-if="item.type === 1">by</span>
              <span v-if="item.creator.length > 1">/</span>
               {{creatorItem.userName }}
               </span>
          </div>

          <!-- 图片上方阴影效果 -->
          <div class="topShadow"></div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用于判断mv数据是否获取完
      hasMore: true,
      offset: 0,
      // mv数据
      albumArray: [],
      // 控制每行显示的数量
      elColSpan: 25,
      // 歌手id
      artistId: this.$route.query.id

    }
  },
  created () {
    // 初始化每行多少个mv
    this.changeColSpan()
    // 获取歌手mv
    this.getArtistMv()
  },
  mounted () {
    // 监听窗口大小
    this.listenerWindowSize()
  },
  methods: {

    // 初始化每行多少个mv
    changeColSpan () {
      // 获取当前屏幕宽度
      const w = document.documentElement.clientWidth
      if (w > 1330) {
        this.elColSpan = 25
      } else if (w > 1220 && w < 1330) {
        this.elColSpan = 6
        // this.$forceUpdate()
      } else if (w < 1220) {
        this.elColSpan = 8
      }
    },
    // 监听窗口大小
    listenerWindowSize () {
      window.addEventListener('resize', () => {
        // 变化后需要做的事
        this.changeColSpan()
      })
    },
    // 获取歌手mv

    async getArtistMv () {
      if (this.hasMore === false) return
      const { data: res } = await this.$api.getArtistMv({ limit: 20, id: this.artistId, offset: this.offset })
      this.offset += 20
      this.albumArray.push(...res.mvs)
      if (res.hasMore === false) { this.hasMore = false }
      console.log(res)
    }

  }

}
</script>

<style lang="less" scoped>
.searchVideo{

  .el-row {
  // 解决.el-row出现布局问题
  display: flex;
  flex-wrap: wrap;
  }

  .videoBox{
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    width: 100%;
    // height: 11.3vw;
    // background-color: pink;
    .imgBox{
      position: relative;
          .playCountBox{
      z-index: 100;
      cursor: pointer;
      position: absolute;
      right: 5px;
      i{

        font-size: 12px;
        color: #fff;
      }
    }
    // 视频时长
    .playTime{
      position: absolute;
      font-size: 12px;
      color: #fff;
      right: 5px;
      bottom: 5%;
    }

    img{
      cursor: pointer;
      border-radius: 5px;
      width: 100%;
      // height: 74%;

    }
    }

    .titleBox{
      width:230px;
      // mv红色框
      .mv{
      margin-top: 8px;
      margin-right: 5px;
      border-radius: 2px;
      display: inline-block;
      height: 10px;
      line-height: 8px;
      width: 20px;
      font-size: 10px;
      vertical-align: top;
      color: red;
      border: 1px solid red;
    }

    // 标题
    .title{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
      display: inline-block;
      margin-top: 5px;
      font-size: 12px;
      color: #555;
    }
    }
    // 创建者
    .creatorBox{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

      .creator{
        font-size: 10px;
        color: rgb(205, 205, 205);
        font-weight: 100;
      }
    }
    // <!-- 图片上方阴影效果 -->
    .topShadow{
      z-index: 1;
      top:0px;
      width: 100%;
      // height: 1px;
      position: absolute;
      background-color: red;
      box-shadow: 0px 4px 30px 14px rgba(0, 0, 0,0.5);
    }
  }
}

</style>
