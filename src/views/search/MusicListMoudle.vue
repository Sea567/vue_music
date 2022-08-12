<template>
  <!-- 歌曲列表组件 -->
  <!-- 1.传入歌曲数据(songs)     父组件通过props传入已处理好的歌曲列表数据(songs),或者传入歌单的id,即可展现歌曲列表 -->
  <!-- 2.传入歌单id               如果已传入歌曲列表数据,再传入歌单id则id无效 -->
      <!-- props: {
    musicData: Array,
    musicListId: Number
  }, -->
  <!-- 3.传入偏移量，用于分页时索引列的值的正确显示，不分页时可偏移量传入0 -->
  <!-- inject: ['SearchPage_Offset'], -->

  <!-- offset: { num: 0 }, -->
  <!-- provide () {
    return {
      SearchPage_Offset: this.offset
    }
  }, -->

  <div>
    <!-- pc端 -->
    <template>
      <el-table
      empty-text=" "
      @row-dblclick="clickMusicListPlay"
      :data="musicData?musicData:musicList"
      style="width: 100%;"
      stripe
      class="hidden-sm-and-down musicList">
      <!-- 索引列 -->
        <el-table-column type="index" :index="indexMethod" width="42"></el-table-column>
        <!-- 爱心图标列 -->
        <el-table-column width="36">
          <!-- <i class="el-icon-star-off"></i> -->
          <span class="iconfont icon-aixin2" v-if="love" @click="changeLove"></span>
          <!-- 红色爱心显示逻辑暂未想好 -->
          <span style="color: #ec4141" class="iconfont icon-aixin1" v-else @click="changeLove"></span>
        </el-table-column>
        <el-table-column prop="name"  label="音乐标题">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              <span>{{ scope.row.name }}</span>
              <span style="color: #9f9f9f">
                <!-- 三元表达式，如果名字后面有文字，就加小括号，如果没有就空白 -->
                {{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}
                {{ scope.row.tns?'('+scope.row.tns[0]+')':''}}
              </span>
              <span class="mv" v-if="scope.row.mv !== 0">MV</span>
              <span class="mv" v-if="scope.row.sq !== null">SQ</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ar" label="歌手">
          <template slot-scope="scope">

            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              <!-- {{ scope.row.ar[0].name }} -->
              <!-- 歌手长度是否为2，如果为二，就将两个歌手名字拼接展示，否则只暂时第一个歌手 -->
              <span>{{ scope.row.ar.length === 2? scope.row.ar[0].name+'/'+scope.row.ar[1].name:scope.row.ar[0].name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              <span>{{ scope.row.al.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长">
          <template slot-scope="scope">
            <div><span>{{scope.row.dt |timeformate}}</span></div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 移动端 -->
    <template>
      <el-table
      empty-text=" "
      @row-dblclick="clickMusicListPlay"
      :data="musicData?musicData:musicList"
      style="width: 100%"
      stripe class="hidden-md-and-up musicList">
      <!-- 索引列 -->
        <el-table-column type="index" width="35"> </el-table-column>
        <!-- 爱心图标列 -->
        <el-table-column width="32">
          <!-- <i class="el-icon-star-off"></i> -->
          <span class="iconfont icon-aixin2" v-if="love" @click="changeLove"></span>
          <span style="color: #ec4141" class="iconfont icon-aixin1" v-else @click="changeLove"></span>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题">
          <template slot-scope="scope">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
              <span>{{ scope.row.name }}</span>
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
              <span>{{ scope.row.ar[0].name }}</span>

            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 爱心显示，逻辑暂没写好
      love: true,
      // 通过歌单id获取到的歌曲数据
      musicList: []
    }
  },

  inject: ['SearchPage_Offset'],
  // 由父亲组件传入偏移量，然后页面进行渲染
  props: {
    musicData: Array,
    musicListId: Number
  },
  created () {
    // 如果传入的是id，则用id获取歌单音乐
    if (this.musicListId) {
      this.getMusicList()
    }
  },

  watch: {
    musicListId () {
      this.getMusicList()
    }
  },
  methods: {
    // 控制爱心显示 暂未实现
    changeLove () {
      this.love = !this.love
    },
    // 自定义索引列
    indexMethod (index) {
      // +1是为了索引从1开始
      index = index + 1 + this.SearchPage_Offset.num
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
    // 根据歌单id获取歌曲列表
    async getMusicList () {
      const { data: res } = await this.$http.get('playlist/track/all', {
        params: {
          // 在被点击的歌单事件里，将id存入Storage，然后在这里访问
          // id: window.sessionStorage.getItem('id'),
          id: this.musicListId,
          limit: 10
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
span{
  cursor: default;
}
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
/deep/.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  border-bottom: 0px ;
}
</style>
