<template>
  <div class="NewestMusicHome-container">
     <!-- 骨架屏  由父组件控制显示-->
    <el-skeleton v-if="isLoading" :rows="8" animated/>

    <span class="weekNew">本 周 新 碟</span>
    <div class="recommendAndAll" ref="recommendAndAllRef" @click="changerecommendAndAll($event)">
      <span >推荐</span>|
      <span >全部</span>
    </div>

    <el-row :gutter="43">
      <el-col :span="25" v-for="(item,index) in newAlbumData.weekData || newAlbumData.monthData" :key="item.id">
        <div class="imgBox" ref="imgBoxRef" >

          <img @click="toAlbumContent(item.id)" :src= " `${item.picUrl}?param=150y150` " @mouseover="enter(index)" @mouseout="out" alt=""/>
          <transition name="playBtn">
            <i v-show="isShowPlayBtn" :data-index="index"  ref="playBtnRef" @mouseover="enter" class="iconfont icon-24gf-play"></i>
          </transition>
          <img class="dvdImg" src="@/assets/img/DVD2.png" alt="">

        </div>
        <div class="name">{{item.name}}</div>
        <div class="singerName">{{item.artists[0].name}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

      isShowPlayBtn: false
    }
  },

  props: {
    isLoading: {},
    area: {
      type: String
    },
    newAlbumData: {}
  },
  methods: {
    // 跳转到内容详情页
    toAlbumContent (id) {
      // console.log(id)
      // 编程式路由传参
      this.$router.push({
        path: '/albumcontent',
        query: { id: id }

      }
      )
    },
    // 推荐和全部 按钮点击事件
    changerecommendAndAll (e) {
      // 由于接口不可用,只做摆设,不获取数据
      if (e.target.tagName === 'DIV') return
      const spanArray = this.$refs.recommendAndAllRef.querySelectorAll('span')
      // 干掉全部
      for (var i = 0; i < spanArray.length; i++) {
        spanArray[i].style = 'color:#676767;background-color: #fff;'
      }
      // 留下自己
      e.target.style = 'background-color: #fdf5f5; color:#ec4141'
    },
    // 鼠标移动图片上显示播放按钮
    enter () {
      this.isShowPlayBtn = true
    },
    // 鼠标离开图片上隐藏播放按钮
    out () {
      this.isShowPlayBtn = false
    }
  }

}
</script>

<style lang="less" scoped>
/* 视窗宽度小于1370px时 */
@media screen and (max-width: 1400px) {
  .NewestMusicHome-container {
    width: 100%;
    margin: 0px auto;
    padding: 0 60px;
    .weekNew{
    position: absolute;
    top: 0px;
    left: 15px;
    color: #373737;
    font-weight: 400;
    font-size: 18px;
    writing-mode:vertical-rl
  }
  }

}
/* // 视窗宽度大于1370px时 */
@media screen and (min-width: 1400px) {
  .NewestMusicHome-container {
    width: 1020px;
    margin: 0px auto;
    .weekNew{
    position: absolute;
    top: 0px;
    left: -45px;
    color: #373737;
    font-weight: 400;
    font-size: 18px;
    writing-mode:vertical-rl
  }
  }
}
.NewestMusicHome-container {
  margin-top: 18px;
  position: relative;
  box-sizing: border-box;
  // padding-left: 13px;
  // padding: 0px 60px;
  // 推荐和全部
  .recommendAndAll{

    position: absolute;
    top: -40px;
    right: 30px;
    color: #676767;
    font-size: 12px;
    color:#f2f2f2;
    span:nth-child(1){
      cursor: pointer;
      margin-right: 10px;
      display: inline-block;
      color: #ec4141;
      padding: 2px 10px;
      border-radius: 20px;
      background-color: #fdf5f5;
    }
    span:nth-child(2){
      cursor: pointer;
      margin-left: 10px;
      display: inline-block;
      color: #676767;
      padding: 2px 10px;
      border-radius: 20px;
      // background-color: #fdf5f5;
    }

  }

  .imgBox {
    .playBtn-enter{
      color: rgba(216, 47, 47, 0);
      background-color: rgba(255, 255, 255,0);
    }
    .playBtn-enter-active{
      transition: all 1s;
    }
    .playBtn-enter-to{
      color: rgba(216, 47, 47, 1);
      background-color: rgba(255, 255, 255,1);
    }
    .playBtn-leave{
      color: rgba(216, 47, 47, 1);
      background-color: rgba(255, 255, 255,1);
    }
    .playBtn-leave-active{
      transition: all 0.7s;
    }
    .playBtn-leave-to{
      color: rgba(216, 47, 47, 0);
      background-color: rgba(255, 255, 255,0);
    }
    cursor: pointer;
    position: relative;
    width: 100%;

    img {
      width: 100%;
      border-radius: 5px;
    }
    &:hover i{
      display: block;
    }
    // 播放按钮
    i{

      // display: none;
      position: absolute;
      display: none;
      height: 40px;
      width: 40px;
      background-color: rgba(255, 255, 255,1);
      border-radius: 50px;
      text-align: center;
      line-height: 40px;
      top: 37%;
      left: 37%;
      color: #ec4141;

    }
    // dvd图片
    .dvdImg{
      top: 2%;
      right: -20px;
      position: absolute;
      height: 95%;
      width: 20px;
    }

  }
  .name{
    margin-top: 3px;
    color: #37377f;
    font-size: 14px;
  }
  .singerName{
    color: #9f9f9f;
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 18px;
  }
}
</style>
