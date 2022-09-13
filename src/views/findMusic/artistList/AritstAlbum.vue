<template>
  <div class="artistalbum-container">
        <!-- 热门50首区域llll -->
    <div class="top50">
      <div class="top50-img">
        <img src="@/assets/img/Top50.png" alt="" />
      </div>
      <div class="top50-songlist">
        <!-- 标题 -->
        <div class="top50-songlist-title">
          <h4>热门50首</h4>
          <i class="iconfont icon-bofangqi-bofangshu"></i>
          <i class="iconfont icon-vertical_line"></i>
          <i class="el-icon-folder-add"></i>
        </div>
        <!-- 列表 -->
        <div class="top50-songlist-list">
          <el-table empty-text=" " @row-dblclick="clickMusicListPlay" :data="ArtistSongTop50Data.songs" style="width: 100%" stripe class=" musicList">
            <!-- 索引列 -->
            <el-table-column type="index" :index="indexMethod" width="42"></el-table-column>
            <!-- 爱心图标列 -->
            <el-table-column width="36">
              <!-- <i class="el-icon-star-off"></i> -->
              <span class="iconfont icon-aixin2" v-if="love" @click="changeLove"></span>
              <!-- 红色爱心显示逻辑暂未想好 -->
              <span style="color: #ec4141" class="iconfont icon-aixin1" v-else @click="changeLove"></span>
            </el-table-column>
            <!-- 歌手名列 -->
            <el-table-column prop="name" width="820">
              <template slot-scope="scope">
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  <span>{{ scope.row.name }}</span>
                  <span style="color: #9f9f9f">
                    <!-- 三元表达式，如果名字后面有文字，就加小括号，如果没有就空白 -->
                    {{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}
                    {{ scope.row.tns ? '(' + scope.row.tns[0] + ')' : '' }}
                  </span>
                  <span class="mv" v-if="scope.row.mv !== 0">MV</span>
                  <span class="mv" v-if="scope.row.sq !== null">SQ</span>
                </div>
              </template>
            </el-table-column>
            <!-- 时间列 -->
            <el-table-column prop="dt">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.dt | timeformate }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="look-all" @click="lookAll($event)">
          <span >查看全部50首></span>
        </div>
      </div>

    </div>

    <!-- 专辑区域 -->
    <div class="top50" v-for="(item) in albumContentArray" :key="item.album.id">
      <div class="top50-img">
        <img @click="toAlbumContent(item.album.id)" :src="`${item.album.picUrl}?param=200y200`" alt="" />
      </div>
      <div class="top50-songlist">
        <!-- 标题 -->
        <div class="top50-songlist-title">
          <h4>{{item.album.name}}</h4>
          <i class="iconfont icon-bofangqi-bofangshu"></i>
          <i class="iconfont icon-vertical_line"></i>
          <i class="el-icon-folder-add"></i>
        </div>
        <!-- 列表 -->
        <div class="top50-songlist-list" :style="item.songs.length>10?'height: 355px;':'height:auto'">
          <el-table empty-text=" " @row-dblclick="clickMusicListPlay" :data="item.songs" style="width: 100%" stripe class="musicList">
            <!-- 索引列 -->
            <el-table-column type="index" :index="indexMethod" width="42"></el-table-column>
            <!-- 爱心图标列 -->
            <el-table-column width="36">
              <!-- <i class="el-icon-star-off"></i> -->
              <span class="iconfont icon-aixin2" v-if="love" @click="changeLove"></span>
              <!-- 红色爱心显示逻辑暂未想好 -->
              <span style="color: #ec4141" class="iconfont icon-aixin1" v-else @click="changeLove"></span>
            </el-table-column>
            <!-- 歌手名列 -->
            <el-table-column prop="name" width="820">

              <template slot-scope="scope">
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  <span>{{ scope.row.name }}</span>
                  <span style="color: #9f9f9f">
                    <!-- 三元表达式，如果名字后面有文字，就加小括号，如果没有就空白 -->
                    {{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}
                    {{ scope.row.tns ? '(' + scope.row.tns[0] + ')' : '' }}
                  </span>
                  <span class="mv" v-if="scope.row.mv !== 0">MV</span>
                  <span class="mv" v-if="scope.row.sq !== null">SQ</span>
                </div>
              </template>

            </el-table-column>
            <!-- 时间列 -->
            <el-table-column prop="dt">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.dt | timeformate }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="look-all" @click="lookAll($event)" v-if="item.songs.length>10">
          <span >查看全部{{item.songs.length}}首></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['aitistId'])
  },
  data () {
    return {
      // 歌手id
      // artistId: this.$route.query.id,
      // 歌手全部专辑的数据
      albumContentArray: [],
      // 专辑id
      albumIdArray: [],
      love: true,
      offset: { num: 0 },
      // 歌手top50歌曲
      ArtistSongTop50Data: {}

    }
  },
  created () {
    this.getArtistSongTop50()
    this.getArtistAlbum()
  },
  methods: {
    // 点击专辑图片跳转
    toAlbumContent (id) {
      this.$router.push({
        path: '/albumcontent',
        query: {
          id: id
        }
      })
    },
    // 获取歌曲专辑
    async getArtistAlbum () {
      const { data: res } = await this.$api.getArtistAlbum({ id: this.aitistId })
      // console.log(res.hotAlbums)
      // 获取全部专辑的id
      for (var i = 0; i < res.hotAlbums.length; i++) {
        this.albumIdArray.push(res.hotAlbums[i].id)
      }
      // 根据id获取专辑歌曲
      for (var i2 = 0; i2 < this.albumIdArray.length; i2++) {
        const { data: res2 } = await this.$api.getAlbumContent({ id: this.albumIdArray[i2] })
        // console.log(res2)
        this.albumContentArray.push(res2)
        // console.log(this.albumContentArray)
      }
    },
    // 查看全部按钮
    lookAll (e) {
      // 获取兄弟节点 (列表)
      // e.currentTarget为绑定事件的元素
      var list = e.currentTarget.previousElementSibling
      //
      // console.log(list)
      list.style = 'height:auto;'
      e.currentTarget.style = 'display:none'
    },
    // 更改爱心图标
    changeLove () {
      this.love = !this.love
    },
    // 自定义索引列
    indexMethod (index) {
      // +1是为了索引从1开始
      index = index + 1
      // 判断索引长度,补0
      if (index.toString().length === 1) {
        index = '0' + index
      }
      return index
    },
    // 双击歌曲播放音乐
    async clickMusicListPlay (row) {
      const { data: res } = await this.$http.get('/song/url', {
        params: {
          id: row.id
        }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取歌曲失败')
      }
      this.$store.commit('getMusicUrl', res.data[0].url)
      // 获取歌曲详细信息，图片歌手等，提交给vuex
      const { data: res2 } = await this.$http.get('/song/detail', {
        params: {
          ids: row.id
        }
      })
      // console.log(res2)
      if (res.code !== 200) {
        return this.$message.error('获取歌曲信息失败')
      }
      this.$store.commit('getMusicInfo', res2.songs)
    },
    // 获取歌手前50歌曲
    async getArtistSongTop50 () {
      const { data: res } = await this.$api.getArtistSongTop50({ id: this.aitistId })
      // console.log(res)
      this.ArtistSongTop50Data = res
    }

  }

}
</script>

<style lang="less" scoped>
.artistalbum-container{
.top50 {
  margin-bottom: 50px;
  // 伪元素清除浮动
  &:after {
    content: '';
    height: 0px;
    line-height: 0px;
    display: block;
    visibility: hidden;
    clear: both;
  }
  // height: 400px;
  // border: 1px solid red;
  .top50-img {
    cursor: pointer;
    float: left;
    width: 150px;
    height: 150px;
    // border: 1px solid red;
    img{
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
  }
  .top50-songlist {

    margin-left: 60px;
    float: left;
    width: calc(100% - 230px);
    // height: 100%;
    // border: 1px solid red;
    .top50-songlist-title {
      h4 {
        display: inline-block;
        color: #373737;
      }
      i {
        vertical-align: middle;
      }
      // 播放icon
      i:nth-child(2) {
        cursor: pointer;
        margin-left: 23px;
        font-size: 24px;
        color: #666666;
      }
      // 竖线icon
      i:nth-child(3) {
        margin-left: 2px;
        font-size: 16px;
        color: #d8d8d8;
      }
      // 收藏icon
      i:nth-child(4) {
        cursor: pointer;
        margin-left: 5px;
        font-size: 22px;
        color: #666666;
      }
    }
    .top50-songlist-list {
        // mv红字
        .mv{
        cursor: pointer;
        display: inline-block;
        margin-left: 5px;
        border: 1px solid #ec4141;
        height: 10px;
        line-height: 9px;
        border-radius: 3px;
        padding: 0px 3px;
        font-size: 12px;
        color: #ec4141;
      }
      height: 355px;
      // height: '';
      overflow: auto;
      // 歌曲列表
      /deep/.el-table.musicList {
        font-size: 12px !important;
        // margin-left: 1.5%;
      }
      /deep/.el-table .el-table__cell {
        // 每一行的高度
        padding: 6px 0;
      }
      // 去掉每行的bottom线
      /deep/.el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border-bottom: 0px;
      }
      // 去掉table底部的线
      /deep/.el-table::before{
        height: 0px;
      }
      //去掉头部的空行
      /deep/.el-table th {
        display: none;
      }
    }
  }
  .look-all {
    // border-top: 1px solid #e1e1e1;
    line-height: 35px;
    cursor: pointer;
    height: 35px;
    font-size: 12px;
    color: #9b9b9b;
    background-color: #f9f9f9;
    span{
      cursor: pointer;
      float: right;
    }
  }
}
}
</style>
