<template>
  <div class="artistsimilarity-container">

    <el-row :gutter="20">
      <el-col :span="25" v-for="item in SimiArtistData.artists" :key="item.id">
        <img @click="toArtistDetail(item.id)" :src=" `${item.img1v1Url}?param=200y200`" alt="">
        <div class="artist-name">{{item.name}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      // 相似歌手
      SimiArtistData: {},
      // id
      artistId: this.$route.query.id

    }
  },
  created () {
    this.getSimiArtist()
  },
  methods: {
    // 跳转到歌手详情页面
    toArtistDetail (id) {
      this.$router.push({
        path: '/artistdetail'
        // query: {
        //   id: id
        // }
      })
      // console.log(this.$parent)
      this.$store.commit('getAitistId', id)
      // this.$parent.getArtistDetail()
    },
    // 获取相似歌手
    async getSimiArtist () {
      const { data: res } = await this.$api.getSimiArtist({ id: this.artistId })
      this.SimiArtistData = res
    }
  }

}
</script>

<style lang="less" scoped>
.artistsimilarity-container{
  img{
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
  }
  .artist-name{
    margin-bottom: 30px;
  }
}
</style>
