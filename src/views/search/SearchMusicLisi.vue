<template>
  <div>
    <!-- {{SearchMusicLisi.playlists}} -->
    <SearchItemMoudle :dataArray="this.SearchMusicLisi.playlists" ></SearchItemMoudle>
  </div>
</template>

<script>
import SearchItemMoudle from '@/views/search/SearchItemMoudle.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  components: {
    SearchItemMoudle
  },
  computed: {
    ...mapState(['SearchMusicLisi'])
  }

}
</script>

<style>

</style>
