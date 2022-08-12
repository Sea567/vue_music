<template>
  <div>
    <!-- 歌曲列表组件 star -->
    <!-- 传入歌曲列表数据给子组件 -->
    <MusicListMoudle
    :musicData="this.searchMusic.result.songs"
    ></MusicListMoudle>
    <!-- 歌曲列表组件 end -->
    <!-- 分页组件 star -->
    <Pagination></Pagination>
  </div>
</template>

<script>
import MusicListMoudle from '@/views/search/MusicListMoudle.vue'
import Pagination from '@/views/search/Pagination.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['searchMusic'])
  },
  components: {
    MusicListMoudle,
    Pagination
  }

}
</script>

<style lang="less" scoped>

</style>
