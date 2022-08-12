<template>
  <div style="100%">
    <!-- // 高斯模糊背景大盒子 -->
    <div class="bgimgBox">
      <img class="bgimg" v-if="musicInfo[0]" :src="`${musicInfo[0].al.picUrl}?param=80y80`" alt="">

      <img class="bgimg2" v-if="musicInfo[0]" :src="`${musicInfo[0].al.picUrl}?param=80y80`" alt="">
      <img class="bgimg3" v-if="musicInfo[0]" :src="`${musicInfo[0].al.picUrl}?param=80y80`" alt="">
      <div class="groundglass"></div>
    </div>
    <!-- 展示数据的大盒子 -->
    <div class="dataBox">
      <div class="dataBox1">
        <!-- 头部区域 -->
          <header class="header">
            <!-- 左侧图标 -->
            <div class="leftIcon">
              <i class="el-icon-arrow-down" @click="closeDrawer"></i>
            </div>
            <!-- 搜索框和旁边的图标 -->
            <div class="searchFrame">
              <div class="searchRelative">
                  <!--搜索框左侧的图标 -->
                <div class="searchIcon">
                  <span><i class="el-icon-arrow-left"></i></span>
                  <span><i class="el-icon-arrow-right"></i></span>

                </div>
                <!-- 搜索框 -->
                <div class="search">
                  <el-input placeholder="搜索" v-model="serchInputText2" prefix-icon="el-icon-search"> </el-input>
                </div>
                <!-- 搜索框右侧的听歌识曲图标 -->
                <div class="searchIconRight">
                  <i class="el-icon-microphone"></i>
                </div>

              </div>
            </div>
            <!-- 最右侧的图标 -->
            <div class="rightIcon">
              <!-- <div class="rightIconRelative"> -->
                <i class="iconfont icon-shezhi"></i>
                <i class="iconfont icon-youxiang"></i>
                <i class="iconfont icon-vertical_line"></i>
                <i class="iconfont icon-CZ_028"></i>
                <i class="iconfont icon-zuixiaohua"></i>
                <i class="iconfont icon-3zuidahua-1"></i>
                <i class="iconfont icon-guanbi"></i>
              <!-- </div> -->
            </div>
          </header>
          <!-- body区域 -->
          <body class="body">
            <!-- 歌曲名区域 -->
            <div class="nameBox">
              <div class="musicName">{{ musicInfo[0] ? musicInfo[0].name : '' }}</div>
              <div class="tns" v-if="musicInfo[0].tns">{{musicInfo[0].tns[0]}}</div>
              <div class="singerName" v-if="musicInfo[0]">{{ musicInfo[0].ar.length === 2 ? musicInfo[0].ar[0].name + ' / ' + musicInfo[0].ar[1].name : musicInfo[0].ar[0].name + ' - ' + musicInfo[0].al.name}}</div>
            </div>
            <!-- 左边图片区域 -->
            <div class="playImg">
              <!-- 黑胶图片旋转组件 -->
              <PlayImgModule class="PlayImgModule"></PlayImgModule>
            </div>
            <!-- 中间歌词区域 -->
            <div class="lyric">
              <!-- 歌词组件 -->
              <LyricModule></LyricModule>
            </div>
            <!-- 右侧相似歌单歌曲区域 -->
            <div class="playlistSource">
            <!-- 相似歌单歌曲组件 -->
              <SimilarityMusicModule
              class="SimilarityMusicModule"
              ></SimilarityMusicModule>
            </div>
            <!-- 还未清除浮动 -->

          </body>
      </div>
    </div>

  </div>
</template>

<script>
// 图片旋转组件
import PlayImgModule from '@/components/bigPlayer/PlayImgModule.vue'
// 歌词组件
import LyricModule from '@/components/bigPlayer/LyricModule.vue'
// 相似歌单歌曲组件
import SimilarityMusicModule from '@/components/bigPlayer/SimilarityMusicModule.vue'
// 导入vuex
import { mapState } from 'vuex'
export default {
  components: {
    // 注册组件
    PlayImgModule,
    LyricModule,
    SimilarityMusicModule
  },
  data () {
    return {
      // 输入框双向数据
      serchInputText2: this.father.serchInputText

    }
  },
  methods: {
    closeDrawer () {
      // 直接调用父组件的方法关闭抽屉
      this.father.closeDrawer()
    }

  },
  computed: {
    // 以计算属性的方式使用vuex的数据
    ...mapState(['musicUrl', 'musicInfo'])

  },
  created () {
    // console.log(this.musicInfo)
  },
  props: {
    // 接收父元素的this
    father: Object
  },
  watch: {
    // 监听父组件搜索框，同步搜索框内容
    serchInputText2 () {
      this.father.serchInputText = this.serchInputText2
    }
  }

}
</script>

<style lang="less" scoped>
// 高斯模糊背景大盒子
.bgimgBox{
  position: relative;
  height: 100%;

  .bgimg,.bgimg2,.bgimg3{
    // 使图片在背景下面
    z-index: 1;
     // 使背景不随下滑改变
    position: fixed;
    width: 34%;
    height: 200px;
  }
  .bgimg{
    left: 0;
  }
    .bgimg2{
    left: 34%;
  }
    .bgimg3{
    right: 0;
  }
  .groundglass{
    z-index: 2;
    // 使背景不随下滑改变
    position: fixed;
    width: 100%;
    height: 100vh;
    // height: 200px;
    // height: 100%;
    background-color: rgba(255, 255, 255,0.7);
    backdrop-filter: blur(200px);
  }
}
// 展示数据的大盒子
.dataBox{
  position: relative;

  .dataBox1{
    // 使在背景之上
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 500px;
    // border: 5px solid red
    // background-color: rgb(237, 191, 191);
    .header{
      position: relative;
      // background-color: #fff;
      height: 80px;
      // border-bottom: 1px solid red;
      // 最左侧图标
      .leftIcon{
        position: absolute;
        left: 0;
        // height: 100%;
        // border: 1px solid red;
        left: 32px;
        top: 22px;
        i{
          cursor: pointer;
          // margin-left: 32px;
          // margin-top: 22px;
          font-size: 22px;
          color: #49444F;
        }
      }
      // 搜索框和旁边的图标
      .searchFrame {
        position: absolute;
        // border: 1px solid red;
        left: 230px;
        height: 80px;
        width: 260px;
        .searchRelative{
          position: relative;
          // 搜索框左侧图标
        .searchIcon{
          top: 17px;
          position: absolute;
          span{
            cursor: pointer;
            margin-right: 10px;
            display: inline-block;
            // border: 1px solid red;
            border-radius: 20px;
            text-align: center;
            line-height: 24px;
            height: 24px;
            width: 24px;
            background-color: rgba(153, 153, 153, 0.2);
            i{
              font-size: 14px;
              color: rgb(0, 0, 0);
            }
          }
        }
        // 搜索框右侧图标
        .searchIconRight{
          position: absolute;
          top: 20px;
          left: 240px;
          i{
            cursor: pointer;
            font-size: 20px;
            color: #8D8684;
          }
        }
        // 搜索框
        .search{
          top: 14px;
          left: 68px;
          position: absolute;
            /deep/.el-input__inner{
              font-size: 12px;
              color: #302E2E;
              width: 160px;
              height: 32px;
              background-color: rgba(153, 153, 153, 0.2);
              border-radius: 20px;
              border: 0;
            }
            // 图标颜色
            /deep/ .el-input__prefix {
              color: #5f5e5d
            }
            // 图标行高
            /deep/ .el-input__icon {
              line-height: 32px;
              }
              // 修改placeholder字体颜色，输入框没输入时自带的文字
            /deep/input::-webkit-input-placeholder{
                color:#ABA4A1;
                font-size: 12px;

              }

        }
        }
      }
      // 右侧图标
      .rightIcon{
        position: absolute;
        right: 0;
        // border: 1px solid red;
        box-sizing: border-box;
        height: 80px;
        width: 232px;
        i{
          cursor: pointer;
          display: inline-block;
          font-size: 20px;
          // margin-right: 14px;
          margin-top: 20px;
          color: #86807E;
        }

        i:nth-child(2){
          margin-left: 14px;
        }
        i:nth-child(3){
          margin-left: 4px;
        }
        i:nth-child(4){
          margin-left: 5px;
        }
        i:nth-child(n+5){
          margin-left: 16px;
        }

      }
    }
    // body区域
    .body{
      // 整体宽高
      height: 550px;
      width: 100%;
      border: 1px solid yellowgreen;
      box-sizing: border-box;
      // 歌名区域
        .nameBox{
          // 强制一行显示
          white-space: nowrap;
          overflow: hidden;
          // 溢出省略号
          text-overflow: ellipsis;

          box-sizing: border-box;
          padding-top: 10px;
          margin: 0 auto;
          // margin-top: 15px;
          width: 635px;
          height: 100px;
          text-align: center;
          // border: 1px solid red;
          font-size: 28px;
          font-weight: 400;
          color: #323232;
        .tns{
          margin-top: 5px;
          font-size: 14px;
          color: #646562;
          font-weight: 200;
        }
        .singerName{
          margin-top: 5px;
          font-size: 14px;
          color: #646562;
          font-weight: 200;
    }
  }
      // 左中右三个区域
      .playImg,.lyric,.playlistSource{
        // display: inline-block;
        float: left;
        height: 440px;
        // width: 33.3%;
        border: 1px solid red;
        box-sizing: border-box;
      }
      // 左边图片区域
      .playImg{
        position: relative;
        width: 30.4%;
        // 黑胶旋转Vue组件
        .PlayImgModule{
          // margin-left: 30%;
          position: absolute;
          right: 1px;
          top: 10px;
        }
      }
      // 中间歌词区域
      .lyric{
        width: 40%;
      }
      // 右侧相似歌单区域
      .playlistSource{
        width: 29.6%;
        .SimilarityMusicModule{
          margin-left: 35px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
