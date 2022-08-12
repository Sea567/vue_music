<!-- 图片旋转黑胶片组件 -->
<template>
<div>
  <!-- 灰色的外圈 -->
  <div class="grayBorder">
    <!-- 黑胶图片 -->
    <img class="blackWafer" src="@/assets/img/blackwafer.png" alt="">
    <!-- 歌曲图片 -->
    <img ref="playImgref" class="playImg" v-if="musicInfo[0]" :src="`${musicInfo[0].al.picUrl}?param=400y400`" alt="">

    <!-- 白针图片 -->
    <img ref="whiteNeedle" class="whiteNeedle" src="@/assets/img/needle.png" alt="">

  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['musicInfo', 'playState'])
  },

  watch: {
    playState () {
      // false为播放状态
      if (this.playState === false) {
        this.$refs.playImgref.style = 'animation-play-state: running;'
        this.$refs.whiteNeedle.style = 'transform: rotate(35deg);transition: transform 0.7s;'
        // console.log(this.playState)
      } else {
        this.$refs.playImgref.style = 'animation-play-state: paused;'
        this.$refs.whiteNeedle.style = 'transform: rotate(0deg);transition: transform 0.7s;'
      }
    }
  },
  mounted () {
    // 在组件完成时,就根据播放状态，改变图片是否旋转
    if (this.playState === false) {
      this.$refs.playImgref.style = 'animation-play-state: running;'
      this.$refs.whiteNeedle.style = 'transform: rotate(35deg);transition: transform 1s;'
      console.log(this.playState)
    } else {
      this.$refs.playImgref.style = 'animation-play-state: paused;'
      this.$refs.whiteNeedle.style = 'transform: rotate(0deg);transition: transform 1s;'
    }
  }

}
</script>

<style lang="less" scoped>
// 媒体查询
@media screen and (max-width: 480px) {

}
// 高度小于600
@media screen and (max-height: 700px) {
.grayBorder{
  height: 265px;
  width: 265px;
}
}
// 高度大于600
@media screen and (min-height: 700px) {
.grayBorder{
  height: 315px;
  width: 315px;
}
}
// 旋转动画
@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
// 灰色的外圈
.grayBorder{
  position: relative;
  // z-index: 10;
  // height: 320px;
  // width: 320px;
  border: 13px solid #DBDADA;
  border-radius: 200px;
  box-sizing: border-box;

  // 黑胶图片
  .blackWafer{
    // z-index: -1;
    width: 100%;
    border-radius: 200px;
  }
  // 歌曲图片
  .playImg{
    position: absolute;
    top: 16%;
    left: 16%;
    width: 68%;
    border-radius: 100px;
    animation: rotate 40s linear infinite;
    animation-play-state: paused;
  }
  // 白色的针
  .whiteNeedle{
    position: absolute;
    top: -33%;
    left: 47%;

    transform-origin:7% 10% ;
    width: 55%;
  }

}
</style>
