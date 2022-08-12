<template>
  <div class="searchSinger-container" >
    <!-- {{searchSinger}} -->
    <div :style="index % 2===0?'background-color: #fff;' : ''" class="singerItem" v-for="(item,index) in searchSinger.artists" :key="item.id">

      <img :src="`${item.img1v1Url}?param=80y80`" alt="">
      <span>{{item.name}}</span>

    </div>
    <Pagination></Pagination>

  </div>
</template>

<script>
import Pagination from '@/views/search/Pagination.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['searchSinger'])
  },
  components: {
    Pagination
  }

}
</script>
<style lang="less" scoped>
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

    img{
      margin-bottom: 5px;
      vertical-align: middle;
      width: 60px;
      border-radius: 5px;
    }
    span{
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      color: #373737;
    }

  }
}
</style>
