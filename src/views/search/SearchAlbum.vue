<template>
  <div>

    <SearchItemMoudle :dataArray="this.searchAlbumCount.albums"></SearchItemMoudle>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchItemMoudle from '@/views/search/SearchItemMoudle.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    SearchItemMoudle
  },
  computed: {
    ...mapState(['searchAlbumCount'])
  }

}
</script>

<style lang="less" scoped>

</style>
