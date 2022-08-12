<template>
  <!-- 歌曲列表组件 -->
  <div>
    <!-- pc端 -->
    <template>
      <el-table
      empty-text=" "
      @row-dblclick="clickMusicListPlay"
      :data="musicList"
      style="width: 97%; margin:0 15px"
      stripe
      class="hidden-sm-and-down musicList">
        <el-table-column type="index" width="35"> </el-table-column>
        <el-table-column width="32">
          <i class="el-icon-star-off"></i>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              {{ scope.row.name }}
              <span style="color: #9f9f9f">
                <!-- 三元表达式，如果名字后面有文字，就加小括号，如果没有就空白 -->
                {{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ar" label="歌手">
          <template slot-scope="scope">

            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              <!-- {{ scope.row.ar[0].name }} -->
              <!-- 歌手长度是否为2，如果为二，就将两个歌手名字拼接展示，否则只暂时第一个歌手 -->
              {{ scope.row.ar.length === 2? scope.row.ar[0].name+'/'+scope.row.ar[1].name:scope.row.ar[0].name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              {{ scope.row.al.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长">
          <template slot-scope="scope">
            <div>{{scope.row.dt |timeformate}}</div>

          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 移动端 -->
    <template>
      <el-table
      empty-text=" "
      @row-dblclick="clickMusicListPlay"
      :data="musicList"
      style="width: 100%"
      stripe class="hidden-md-and-up musicList">
        <el-table-column type="index" width="35"> </el-table-column>
        <el-table-column width="32">
          <i class="el-icon-star-off"></i>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              {{ scope.row.name }}
              <span style="color: #9f9f9f">
                <!-- 三元表达式，如果名字后面有文字，就加小括号，如果没有就空白 -->
                {{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ar" label="歌手">
          <template slot-scope="scope">
            <!-- 文字溢出隐藏 -->
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              {{ scope.row.ar[0].name }}

            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      musicList: []
    }
  },
  created () {
    // window.sessionStorage.setItem('id', this.musicListId)
    this.getMusicList()
    console.log(this.musicListId)
  },
  computed: {
    ...mapState(['musicListId'])
  },

  watch: {
    musicListId () {
      this.getMusicList()
    }
  },
  methods: {
    // 双击歌曲播放音乐
    async clickMusicListPlay (row) {
      const { data: res } = await this.$http.get('/song/url', {
        params: {
          id: row.id
        }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取歌曲失败')
      }
      this.$store.commit('getMusicUrl', res.data[0].url)
      // 获取歌曲详细信息
      const { data: res2 } = await this.$http.get('/song/detail', {
        params: {
          ids: row.id
        }
      })
      console.log(res2)
      if (res.code !== 200) {
        return this.$message.error('获取歌曲图片失败')
      }
      this.$store.commit('getMusicInfo', res2.songs)
    },
    // 根据歌单id获取歌曲列表
    async getMusicList () {
      const { data: res } = await this.$http.get('playlist/track/all', {
        params: {
          // 在被点击的歌单事件里，将id存入Storage，然后在这里访问
          // id: window.sessionStorage.getItem('id'),
          id: this.musicListId
          // limit: 10
        }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取歌单失败')
      }

      this.musicList = res.songs
      // console.log(this.musicList)
    }
  }
}
</script>

<style lang="less" scoped>

// 歌曲列表
/deep/.el-table.musicList {
  font-size: 12px !important;
  // margin-left: 1.5%;
}
/deep/.el-table .el-table__cell {
  // 每一行的高度
  padding: 6px 0;
}
</style>
