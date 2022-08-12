<!-- 歌词组件 -->
<template>
  <div class="LyricBox">
    <!-- <div class="topCover"></div>
    <div class="bottomCover"></div> -->
    <div class="Lyric" ref="LyricRef" @mouseleave="LyricMouseleave" @mouseenter="LyricMouseenter" @scroll="userChangeScroll($event)">
      <!-- 此处为给歌词上方添加空白，使歌词高亮始终保持在中间 -->
      <br v-for="item in 7" :key="item" />

      <!-- 判断当前播放的时间，与歌词的时间做对比,如果时间匹配，则使用activity类，实现高亮 -->
      <p ref="textRef" :class="currentTime > allkeys[index] && currentTime < allkeys[index + 1] ? 'activity' : ''" v-for="(item, key, index) in lyricData" :key="item.index">
        <span>{{ item }}{{ scrollState ? scrollLRC(index) : '' }}</span>
      </p>
      <!-- 此处为给歌词下方添加空白，使歌词高亮始终保持在中间 -->
      <br v-for="item in 9" :key="item.index" />
    </div>
  </div>
</template>

<script>
// 导入vuex
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 是否可以触发定时器
      statee: true,
      // 记录scrollState上一次的值
      oldd: 0,
      // 控制歌词是否自动滚动，true为滚动
      scrollState: true,
      // 滑动距离顶部的距离
      scrollTopData: 0,
      // 当前歌词每句的时间
      allkeys: [],
      // currentTime: '',
      // 歌词数据，包含歌词和时间
      lyricData: ''
    }
  },
  created () {
    // 获取歌词
    this.getLyric()
    console.log(this.musicInfo)
  },
  mounted () {
    this.oldd = this.scrollTopData
    // setInterval(() => {
    //   // 判断是否进入用户手动滑动状态，false为手动滑动
    //   if (!this.scrollState) {
    //     // 判断用户是否停止滑动，即上此检测的scrollTopData值和这次的值是否相等
    //     // 如果相等，进行下一个判断，如果不等，将这次的值赋值给oldd，成为最新值，并移除定时器
    //     if (this.oldd === this.scrollTopData) {
    //       // 判断定时器目前是否可以触发，如果已触发过的定时器未完成，则不能再次触发
    //       if (this.statee) {
    //         // 此处是为了在防止重复触发定时器，false为不能触发定时器
    //         this.statee = false
    //         var time1 = setTimeout(() => {
    //           // 4秒后歌词自动滚动
    //           this.scrollState = true
    //           // 当定时器完成一次后，改为true，可以再次触发定时器
    //           this.statee = true
    //         }, 4000)
    //       }
    //     } else {
    //       // 似乎不能清除已触发的定时器
    //       clearTimeout(time1)
    //       this.oldd = this.scrollTopData
    //     }
    //   }
    // }, 100)
  },
  methods: {
    LyricMouseleave () {
      this.scrollState = true
      console.log('离开歌词区域')
    },
    // 鼠标进入歌词区域时触发事件
    LyricMouseenter () {
      this.scrollState = false
      console.log('进入歌词区域')
    },
    // 当滑动时,记录scrolltop的值
    userChangeScroll (e) {
      this.scrollTopData = e.srcElement.scrollTop
    },
    // 自动滚动歌词
    scrollLRC (index) {
      // 判断当前播放的时间，与歌词的时间做对比，播放时间是否在当前歌词与下一句歌词的时间之间
      if (this.currentTime > this.allkeys[index] && this.currentTime < this.allkeys[index + 1]) {
        // 使scroll滑动38
        this.$refs.LyricRef.scrollTop = 36 * index
      }
    },

    // 获取歌词
    async getLyric () {
      const { data: lyric } = await this.$api.getLyric({ id: this.musicInfo[0].id })
      // 清空allkeys
      this.allkeys = []
      // 调用过滤歌词方法，传入的数据拥有歌词和时间数据
      this.filterLrc(lyric.lrc.lyric)
    },
    // 过滤歌词的方法
    filterLrc (values) {
      // 如果歌词文件为空，则return
      if (!values) return ''
      // 用对象的形式存储时间和歌词
      var lrc = {}
      // 对歌词文本根据\n拆分 成字符串数组
      var lyrics = values.split('\n')
      // console.log(lyrics)
      // 正则表达式，用于获取歌词对应的时间
      var reg = /\[\d*:\d*(\.|:)\d*]/g
      // 循环次数为拆分成的数组长度
      for (var i = 0; i < lyrics.length; i++) {
        // timeRegArr为时间
        var timeRegArr = lyrics[i].match(reg)
        // console.log(timeRegArr[0])
        if (!timeRegArr) continue
        // 把歌词数据中的时间全部替换为空 存入content
        // content为纯歌词
        var content = lyrics[i].replace(timeRegArr, '')
        // console.log(content)
        // 获取歌词对应的时间
        var t = timeRegArr[0]
        // 获取分钟数和秒数
        var min = parseInt(t.match(/\[\d*/i).toString().slice(1))
        var sec = parseInt(t.match(/:\d*/i).toString().slice(1))
        var time = min * 60 + sec
        // console.log(time)
        // 使time作为键值，content作为值，存入lrc
        lrc[time] = content
        // console.log(content)
        // console.log(lrc)
      }
      // lrc为对象，时间为键，歌词为值
      this.lyricData = lrc
      this.getAllkeys(lrc)
      // console.log(this.lyricData)
    },
    getAllkeys (lrc) {
      // 将lrc对象的key(时间)添加到allkeys数组，
      for (var key in lrc) {
        this.allkeys.push(key)
        // console.log(key)
      }
    }
  },

  computed: {
    // 拿到vuex里的歌曲信息
    // app.vue里audio的播放时间
    ...mapState(['musicInfo', 'currentTime'])
  },
  watch: {
    musicInfo () {
      this.getLyric()
    }
    // scrollTopData (item1, item2) {
    //   if (item1 - item2 > 0.1 || item1 - item2 < -0.1) {
    //     // console.log(4444)
    //     this.scrollState = false
    //   }
    //   // if (item1 - item2 < 2 || item1 - item2 > -2) {
    //   //   console.log(555)
    //   // }
    // }
  }
}
</script>

<style lang="less" scoped>
// 高度小于600
@media screen and (max-height: 700px) {
  .Lyric {
    height: 340px;
  }
}
// 高度大于600
@media screen and (min-height: 700px) {
  .Lyric {
    height: 400px;
  }
}

.LyricBox {
  // 当js控制scroll滚动时，会有平滑的过渡

  scroll-behavior: smooth;
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
  // border: 2px solid rgb(65, 53, 142);
  // 解析换行符
  // 溢出内容使用滑动
  overflow: scroll;
  .Lyric {
    transition: transform 0.7s;
    // border: 2px solid rgb(110, 172, 89);
    overflow: scroll;
    width: 100%;
    // height: 400px;
    // 当js控制scroll滚动时，会有平滑的过渡
    scroll-behavior: smooth;
    // 当前播放的高亮歌词样式
    .activity {
      // transition:font-size,0.2s;
      font-size: 16px;
      color: #000000 !important;
      font-weight: 700;
    }
    p {

      // transform: font-size,0.2s;
      font-size: 14px;
      box-sizing: border-box;
      padding: 9px 0;
      color: #646464;
    }
  }
}
</style>
