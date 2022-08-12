<template>
  <div class="newestMusicHome-container">
    <div class="newestMusicHome">
    <!-- 骨架屏 -->
    <el-skeleton v-if="isLoading" :rows="8" animated/>
    <!-- 切换两个视图的按钮盒子 star-->
    <div class="changeViewBox" ref="changeViewBox" @click="changeColor($event)">
      <span @click="ShowComponenNewSong">新歌速递</span>
      <span @click=" ShowComponenNewDVD">新碟上架</span>
      </div>

    <!-- 切换两个视图的按钮盒子 end-->

    <!-- 歌曲语种导航栏star -->
    <div class="songLanguageRouterBox" ref="songLanguageRouterBox">
      <ul @click="changLanguage($event)">
        <li>全部</li>
        <li>华语</li>
        <li>欧美</li>
        <li>韩国</li>
        <li>日本</li>
      </ul>
    </div>

    <!-- 歌曲语种导航栏end -->

    <!-- 动态组件 -->
    <keep-alive>
      <component :is="showComponentName" :newAlbumData="this.newAlbumData" :area="this.area" :isLoading="sonIsLoading" :newSongData="newSongData"></component>
    </keep-alive>

    <!-- <NewDVD></NewDVD> -->
    <!-- <NewSong></NewSong> -->
    </div>
    </div>
</template>

<script>
// import NewDVD from '@/views/findMusic/newestmusic/NewDVD.vue'
// import NewSong from '@/views/findMusic/newestmusic/NewSong.vue'
import NewSong from './NewSong.vue'
import NewDVD from './NewDVD.vue'
export default {
  components: { NewSong, NewDVD },
  data () {
    return {
      // 骨架屏显示控制
      sonIsLoading: false,
      // 新碟数据
      newAlbumData: [],
      // 新歌数据
      newSongData: [],
      // 获取新碟类型
      area: 'ALL',
      // 获取新歌类型
      type: 0,
      albumType: 'new',
      // 骨架屏显示
      isLoading: true,
      // 当前显示的动态组件名，注意，组件名要打引号
      showComponentName: 'NewSong'
    }
  },
  created () {
    this.getNewSong()
    this.getNewAlbum()
  },
  mounted () {
  //  setTimeout(function[, delay, arg1, arg2, ...])
    setTimeout(this.changeLoading, 400)
  },
  methods: {
    // 更改动态组件显示
    // 新歌
    ShowComponenNewSong () {
      this.showComponentName = 'NewSong'
      this.area = 'all'
      this.type = 0
      this.getNewSong()
      const liArray = this.$refs.songLanguageRouterBox.querySelectorAll('li')
      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'color:#676767;font-weight:400'
      }
      liArray[0].style = 'color:#373737; font-weight:700'
    },
    // 新碟
    ShowComponenNewDVD () {
      this.showComponentName = 'NewDVD'
      this.area = 'all'
      this.type = 0
      this.getNewAlbum()
      const liArray = this.$refs.songLanguageRouterBox.querySelectorAll('li')
      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'color:#676767;font-weight:400'
      }
      liArray[0].style = 'color:#373737; font-weight:700'
    },

    // 获取新碟上架
    async getNewAlbum () {
      const { data: res } = await this.$api.getNewAlbum({
        area: this.area
        // 其余参数接口似乎不可用

      })
      this.newAlbumData = res
      // console.log(this.newAlbumData)
    },
    // 获取新歌速递
    async getNewSong () {
      const { data: res } = await this.$api.getNewSong({ type: this.type })
      // console.log(res)
      this.newSongData = res.data
      // console.log(this.newSongData)
    },
    // 更改歌曲语种事件
    changLanguage (e) {
      if (e.target.tagName === 'UL') return
      if (e.target.innerHTML === '全部') {
        this.type = 0
        this.area = 'ALL'
      } else if (e.target.innerHTML === '华语') {
        this.type = 7
        this.area = 'ZH'
      } else if (e.target.innerHTML === '欧美') {
        this.type = 96
        this.area = 'EA'
      } else if (e.target.innerHTML === '日本') {
        this.type = 8
        this.area = 'JP'
      } else if (e.target.innerHTML === '韩国') {
        this.type = 16
        this.area = 'KR'
      }
      // console.log(e.target.innerHTML)
      // console.log(e.target.tagName)
      const liArray = this.$refs.songLanguageRouterBox.querySelectorAll('li')
      // console.log(liArray)
      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'color:#676767;font-weight:400'
      }
      e.target.style = 'color:#373737; font-weight:700'
      this.getNewSong()
      this.getNewAlbum()
      this.changSonLoading()
    },
    // 点击按钮切换颜色
    changeColor (e) {
      if (e.target.tagName === 'DIV') return
      // console.log(e.target)
      const spanArray = this.$refs.changeViewBox.querySelectorAll('span')
      // console.log(spanArray)
      for (var i = 0; i < spanArray.length; i++) {
        spanArray[i].style = 'background-color: #fff; color: #373737;'
      }
      e.target.style = 'background-color: #bbbbbb; color:#fff'
      // console.log(this.$refs.changeViewBox)
    },

    // 骨架屏显示
    changeLoading () {
      this.isLoading = false
    },
    // 子组件骨架屏显示
    changSonLoading () {
      this.sonIsLoading = true
      setTimeout(() => {
        this.sonIsLoading = false
      }, 300)
    }
    // 骨架屏

  }

}
</script>

<style lang="less" scoped>
/* 视窗宽度小于1370px时 */
@media screen and (max-width: 1400px) {

  .newestMusicHome{
    width: 100%;
    margin: 0px auto;
  }
}
/* // 视窗宽度大于1370px时 */
@media screen and (min-width: 1400px) {

  .newestMusicHome {
    width: 1160px;
    margin: 0px auto;
  }
}

.newestMusicHome-container{
  position: relative;
  .newestMusicHome{
    // height: 500px;

      // 骨架屏
    /deep/.el-skeleton{
    // position: fixed;
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #fff;
    height: 100vw;
  }
  // 切换两个视图的按钮盒子star
  .changeViewBox{
    box-sizing: border-box;
    height: 30px;
    width: 230px;
    margin: 10px auto;
    border: 1px solid #bbbbbb;
    border-radius: 20px;
    span{
      display: inline-block;
      text-align: center;
      font-size: 12px;
      line-height: 30px;
      color: #373737;
      width: 50%;
      height: 28px;
      border-radius: 20px;
      // border: 1px solid red;
    }
    span:nth-child(1){
      background-color: #bbbbbb;
    }

    span:hover{
      background-color: #f4f4f4;
    }

  }
  // 切换两个视图的按钮盒子end

  // 歌曲语种导航栏star
  .songLanguageRouterBox{
    ul{

      li:hover{
        color: #373737;
      }
      li:first-child{
        margin-left: 30px;
      }
      li{
        cursor: pointer;
        display: inline-block;
        color: #676767;
        font-size: 14px;
        list-style: none;
        margin-left: 25px;
      }
    }
  }
  // 歌曲语种导航栏end
  }

}

</style>
