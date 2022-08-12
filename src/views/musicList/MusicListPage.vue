<template>
  <!-- 歌单列表页面 -->
  <div >
    <div ref="musicListInfoRef">
    <el-row class="musicListInfo" >
      <el-col :span="4"
        ><div>
          <!-- 歌单图片 -->
          <img class="coverimg" :src="`${musicListInfo.coverImgUrl}?param=300y300`" alt="" /></div
      ></el-col>
      <el-col :span="20">
        <div>
          <!-- 标题 -->
          <div class="musicListName">歌单</div>

          <h2 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">{{ musicListInfo.name }}</h2>
          <!-- 创建者 -->
          <div class="creator">
            <img v-if="musicListInfo.creator" :src="`${musicListInfo.creator.avatarUrl}?param=30y30`" alt="" />
            <span v-if="musicListInfo.creator">{{ musicListInfo.creator.nickname }}</span>
            <span style="color: rgb(103, 103, 103)">{{ musicListInfo.createTime | dateformate }} 创建</span>
          </div>
          <!-- 按钮区域pc端 -->
          <div class="buttons hidden-sm-and-down">
            <el-button round>
              <i class="el-icon-caret-right"></i>
              <span>播放全部</span>
            </el-button>
            <el-button round>
              <i class="el-icon-folder-add"></i>
              <span>收藏 </span>
              <span>({{ musicListInfo.subscribedCount|playvolume }})</span>
            </el-button>
            <el-button round>
              <i class="el-icon-share"></i>
              <span>分享</span>
            </el-button>
          </div>
          <!-- 按钮区域移动端 -->
          <div class="buttons hidden-md-and-up" >
            <el-button round>
              <i class="el-icon-caret-right" style="font-size: 20px"></i>
            </el-button>
            <el-button round>
              <i class="el-icon-folder-add" style="font-size: 20px"></i>
            </el-button>
            <el-button round>
              <i class="el-icon-share" style="font-size: 20px"></i>
            </el-button>
          </div>

          <!-- tag标签区域 -->
          <div class="tag">
            <span>标签 : </span>
            <span v-if="musicListInfo.tags">{{ musicListInfo.tags[0] }} / </span>
            <span v-if="musicListInfo.tags">{{ musicListInfo.tags[1] }} / </span>
            <span v-if="musicListInfo.tags">{{ musicListInfo.tags[2] }}</span>
          </div>
          <!-- 歌曲数量区域 -->
          <div class="musicCount">
            <span>歌曲 : {{ musicListInfo.trackCount }}</span>
            <span>播放 : {{ musicListInfo.playCount | playvolume}}</span>
          </div>
          <!-- 简介 -->

          <div class="introduction">
            <span ref="introductionSpan">简介 : {{ musicListInfo.description }}</span>
            <i v-if="introductionShowControl" class="el-icon-caret-bottom" @click="showIntroductiondDetails"></i>
            <i v-else class="el-icon-caret-top" @click="showIntroductiondDetails"></i>
          </div>
        </div>
        </el-col>
    </el-row>

    </div>
<!-- 导航栏 -->
<div class="musicListNavigation">
    <el-menu width="100%"  default-active="musicLisi" class=" el-menu-demo navigationMenu" mode="horizontal">
        <el-menu-item index="musicLisi">歌曲列表</el-menu-item>
        <el-menu-item index="comment">评论({{musicListInfo.commentCount}})</el-menu-item>
        <el-menu-item index="collector">收藏者</el-menu-item>
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

      // 暂时移动端歌单图片用的固定链接
      info: 'https://p1.music.126.net/8WiQ8y6zgNcpO0IoiBVbzg==/109951166884472394.jpg',

      // 控制简介详情的显示与隐藏
      introductionShowControl: true,
      // 歌单信息,图片名字标签简介等
      musicListInfo: {}
    }
  },
  created () {
    this.getMusicListInfo()
  },
  mounted () {
    // this.setimg()
  },
  watch: {
    musicListId () {
      this.getMusicListInfo()
    }

  },
  computed: {
    ...mapState(['musicListId'])
  },
  methods: {

    // 此处用来暂时展示移动端的图片，由于无法获取后端传过来的图片，暂时用固定图片代替
    setimg () {
      // `background-image:url(${this.info})`
      this.$refs.musicListInfoRef.style =
      `background-image:url(${this.info}); 
      background-repeat: no-repeat;
      background-size: 100vw 100vw;
      border-radius: 10px;
      
      `
      // console.log(this.$refs)
      // console.log(this.musicListInfo)
    },
    // 显示歌单简介详情
    showIntroductiondDetails () {
      this.introductionShowControl = !this.introductionShowControl
      if (this.introductionShowControl) {
        // 控制dom的样式
        this.$refs.introductionSpan.style = 'white-space: nowrap; overflow: hidden;text-overflow: ellipsis ;'
      } else {
        this.$refs.introductionSpan.style = 'white-space: pre-wrap; overflow: visible;text-overflow: auto'
      }
    },
    // 获取歌单信息
    async getMusicListInfo () {
      const { data: res } = await this.$http.get('/playlist/detail', {
        params: {
          // id: window.sessionStorage.getItem('id')
          id: this.musicListId
        }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error('请求歌单信息失败')
      }
      this.musicListInfo = res.playlist
    }
  }
}
</script>

<style lang="less" scoped>

//歌单信息

.musicListInfo {
  // 移动端
  @media screen and (max-width:990px){
    .coverimg{
      display: none;

    }
    &{
      margin-top: 15px;
      padding: 10px;
      // background:hsla(0,0%,0%,.25) border-box;
      border-radius: 5px;
      .musicListName{
        top: 15px;
      }
    }
  }
  // 电脑端
  @media screen and (min-width:991px){
    &{
      margin-top: 32px;
      .musicListNavigation{

          margin-top: 8px;
        }
        .musicListName{
          top: 4px;
        }

    }

  }

  //歌单图片
  .coverimg {
    // width:185px;
    width: 86%;
    border: 1px solid #e8eaec;
    border-radius: 5px;
    margin-left: 10px;
  }
  //歌单名字左边的红字
  .musicListName {
    color: #ec4141;
    font-size: 14px;
    border: 1px solid #ec4141;
    border-radius: 2px;
    padding: 0 3px;
    position: absolute;
    // top: 4px;
  }
  //歌单名
  h2 {
    margin-left: 47px;
    font-weight: 700;
    font-size: 22px;
    color: #373737;
  }
  //创建者
  .creator {
    margin-top: 10px;
    img {
      width: 30px;
      border-radius: 20px;
      vertical-align: middle;
    }
    span {
      font-size: 12px;
      color: rgb(11, 88, 176);
      margin-left: 8px;
    }
  }

  // Button按钮
  // &表示父元素
  .buttons {
    margin-top: 14px;
    .el-button {
      height: 32px;
      padding: 5px 10px 5px 10px;
    }
    // 第一个button
    .el-button:nth-child(1) {
      border: 1px solid #ec4141;
      color: #fff;
      background-color: #ec4141;
      // font-size: 30px;
      i {
        font-size: 18px;
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
  // tag标签
  .tag {
    margin-top: 10px;
    span {
      font-size: 12px;
      color: #676767;
    }
    span:nth-child(n + 2) {
      color: #507daf;
    }
  }
  // 歌曲数量区域
  .musicCount {
    span {
      font-size: 12px;
      color: #676767;
    }
    span:nth-child(2) {
      margin-left: 15px;
    }
  }
  // 简介区域
  .introduction {
    span {
      display: inline-block;
      width: 300px;
      margin-top: 3px;
      font-size: 12px;
      color: #676767;
      // 强制一行显示
      white-space: nowrap;
      // 文字溢出隐藏
      overflow: hidden;
      // 显示省略号
      text-overflow: ellipsis;
      // 此功能可以识别后端传过来的/n换行符号
      // white-space:pre-wrap;
    }
    i {
      color: #676767;
      // 鼠标经过变小手
      cursor: pointer;
    }
  }
}

// 导航栏
.musicListNavigation{
  margin-bottom: 20px;
  margin-left: 10px;

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
    font-size: 13px;
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
}

</style>
