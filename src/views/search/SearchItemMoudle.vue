<template>
<!-- 此组件用于搜索歌手，专辑，歌单的展示 -->
<!-- 1.传入的值必须要为数组  :dataArray-->
  <div class="searchSinger-container" >
    <!-- {{searchSinger}} -->
    <div :style="index % 2===0?'background-color: #fff;' : ''" class="singerItem" v-for="(item,index) in dataArray" :key="item.id">

      <el-row>
        <el-col :span="12">
          <div >
                  <!-- 判断多个父组件传入数据的图片名 -->
            <img v-if="!item.avatarUrl" :src="`${item.img1v1Url || item.blurPicUrl ||item.coverImgUrl}?param=80y80`" alt="">
            <!-- 用户头像 -->
            <div class="userImgBox">
              <img  v-if="item.avatarUrl" :src="`${item.avatarUrl}?param=80y80`"  class="userImg" alt="">
              <img  class="avatarDetail" v-if="item.avatarDetail" :src="`${item.avatarDetail.identityIconUrl}?param=80y80`" alt="">
            </div>

            <span class="name">{{item.name ||item.nickname}}</span>
            <!-- 别名 -->
            <span class="alias" v-if=" item.type && item.alias[0] ">{{'('+item.alias[0]+')'}}</span>

          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <!-- 歌手名 -->
            <span class="artist-name" v-if="item.artist">{{item.artist.name}}</span>
            <!-- 歌单含有歌曲数量 -->
            <span class="trackCount" v-if="item.trackCount">{{item.trackCount}}首</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <!-- 歌单创建者 -->
            <span class="by" v-if="item.creator">by</span>
            <span class="creator" v-if="item.creator"> {{item.creator.nickname}}</span>

          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <!-- 用户类型-->
            <span class="userType" v-if="item.userType && item.userType === 10">{{item.description}}</span>
            <span class="userType" v-if="item.userType && item.userType === 4">网易音乐人</span>

          </div>
        </el-col>

      </el-row>

    </div>
    <Pagination class="Pagination"></Pagination>

  </div>
</template>

<script>
import Pagination from '@/views/search/Pagination.vue'
// import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  props: {
    dataArray: {
      // type: Array,
      required: true
    }

  },
  computed: {
    // ...mapState(['searchSinger'])
  },
  components: {
    Pagination
  }

}
</script>
<style lang="less" scoped>
.el-row {
  // 解决出现布局问题
  display: flex;
  flex-wrap: wrap;
}

.searchSinger-container{
  .singerItem:hover{
    background-color: #F0F1F2 !important;
  }
  .singerItem{
    width: 100%;
    height: 80px;
    border-radius: 5px;
    line-height: 80px;
    background-color: #F9F9F9;
    .el-row{
      height: 80px;
    }
    img{
      margin-bottom: 5px;
      vertical-align: middle;
      width: 60px;
      border-radius: 5px;
    }
    .userImgBox{
      position: relative;
      display: inline-block;
      .userImg{
        border-radius: 50px;
      }
      .avatarDetail{
        position: absolute;
        width: 18px;
        top: 50px;
        right: -5px;
      }
    }
    // 用户圆角头像

    .name{
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      color: #373737;
    }
    .alias{
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      color: #969697;
    }
    .artist-name{
      color: #676767;
      font-size: 12px;
    }
    .trackCount{
       color: #aaaaaa;
      font-size: 10px;
      font-weight: 100;
    }
    .by{
      color: #dadada;
      font-size: 8px;
      font-weight: 100;
    }
    .creator{
      color: #343434;
      font-size: 12px;
      font-weight: 100;
    }
    .userType{
      font-size: 12px;
      color: #999999;
    }

  }
}
</style>
