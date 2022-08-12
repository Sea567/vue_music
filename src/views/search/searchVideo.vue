<template>
  <div class="searchVideo">
    <el-row :gutter="20" >
      <el-col :span="6" v-for="(item) in this.$route.query.videoArray" :key="item.id">
        <!-- 每一个视频块 -->
        <div class="videoBox" >
          <!-- 播放数star -->
          <div class="playCountBox">
            <i class="iconfont icon-24gl-play "> {{item.playTime|playvolume}}</i>
          </div>
          <!-- 播放数end -->

          <!-- 视频时长  -->
          <span class="playTime">{{item.durationms|timeformate}}</span>

          <img :src="`${item.coverUrl}?param=300y300`" alt="">
          <!-- 标题盒子 -->
          <div class="titleBox">
            <!-- mv红色框 -->
          <span class="mv" v-if="item.type === 0">MV</span>
          <!-- 标题 -->
          <span class="title" :style="item.type === 0? 'width: 85%':'' ">{{item.title}}</span>
          </div>

          <!-- 创建者 -->
          <div class="creatorBox">
            <!-- type === 1为视频  0为mv -->
            <span class="creator" v-for="creatorItem in item.creator" :key="creatorItem.userId">
              <span v-if="item.type === 1">by</span>
              <span v-if="item.creator.length > 1">/</span>
               {{creatorItem.userName }}
               </span>
          </div>

          <!-- 图片上方阴影效果 -->
          <div class="topShadow"></div>

        </div>
      </el-col>
    </el-row>
    <Pagination></Pagination>
  </div>
</template>

<script>
import Pagination from '@/views/search/Pagination.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    Pagination
  }

}
</script>

<style lang="less" scoped>
.searchVideo{
  .el-row {
  // 解决.el-row出现布局问题
  display: flex;
  flex-wrap: wrap;
  }

  .videoBox{
    overflow: hidden;
    position: relative;
    margin-top: 20px;
    width: 100%;
    height: 14vw;
    // background-color: pink;
    .playCountBox{
      z-index: 100;
      cursor: pointer;
      position: absolute;
      right: 5px;
      i{

        font-size: 12px;
        color: #fff;
      }
    }
    // 视频时长
    .playTime{
      position: absolute;
      font-size: 12px;
      color: #fff;
      right: 5px;
      bottom: 30%;
    }

    img{
      cursor: pointer;
      border-radius: 5px;
      width: 100%;
      height: 73%;

    }
    .titleBox{
      width:230px;
      // mv红色框
      .mv{
      margin-top: 8px;
      margin-right: 5px;
      border-radius: 2px;
      display: inline-block;
      height: 10px;
      line-height: 8px;
      width: 20px;
      font-size: 10px;
      vertical-align: top;
      color: red;
      border: 1px solid red;
    }

    // 标题
    .title{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
      display: inline-block;
      margin-top: 5px;
      font-size: 12px;
      color: #555;
    }
    }
    // 创建者
    .creatorBox{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

      .creator{
        font-size: 10px;
        color: rgb(205, 205, 205);
        font-weight: 100;
      }
    }
    // <!-- 图片上方阴影效果 -->
    .topShadow{
      z-index: 1;
      top:0px;
      width: 100%;
      // height: 1px;
      position: absolute;
      background-color: red;
      box-shadow: 0px 4px 30px 14px rgba(0, 0, 0,0.5);
    }
  }
}

</style>
