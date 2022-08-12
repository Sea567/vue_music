<template>
<!-- 歌手详情 (歌手描述)-->
  <div class="artist-detail-text-container" >
    <!-- 简介 -->
    <div class="brief-desc">
      <h4>歌手简介</h4>
      <p>{{artistIntroductionData.briefDesc}}</p>
    </div>
    <!-- 成就 -->
    <div class="introduction"  v-for="item in introductionArrayData" :key="item.id">
      <h4>{{item.ti}}</h4>
      <p v-for="(item2,index) in item.txt" :key="index">
        {{item2}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      introductionArrayData: [],

      // 歌手id
      artistId: this.$route.query.id,
      // 歌手介绍数据
      artistIntroductionData: {}
    }
  },
  created () {
    this.getArtistDesc()
  },

  methods: {
    async getArtistDesc () {
      const { data: res } = await this.$api.getArtistDesc({ id: this.artistId })
      // console.log(res)
      this.artistIntroductionData = res
      // 由于后端的introduction给的文字在v-for中无法进行正确的分段和缩进 把introduction数据转成数组
      for (var i = 0; i < res.introduction.length; i++) {
        var introduction = {}
        introduction.id = i
        introduction.ti = res.introduction[i].ti
        introduction.txt = res.introduction[i].txt.split('\n')
        this.introductionArrayData[i] = introduction
      }
    }
  }

}
</script>

<style lang="less" scoped>
.artist-detail-text-container{
    h4{
    color: #373737;
    font-size: 14px;
  }
  p{
    text-indent: 2em;
    color: #676767;
    font-weight: 400;
    font-size: 15px;
    line-height: 31px;
    font-family: "宋体";

  }

// 介绍
.introduction{
  margin-top: 50px;
  h4{
    margin-bottom: 10px;
  }
  p{
    white-space: pre-wrap;
  }
}
}
</style>
