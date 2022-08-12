<template>
  <div>
    <!-- {{this.$route.query.key}} -->

  <SearchItemMoudle :dataArray="this.$route.query.key"></SearchItemMoudle>
  </div>
</template>

<script>
import SearchItemMoudle from '@/views/search/SearchItemMoudle.vue'
export default {
  // data () {
  //   return {
  //     userDataArray: this.$route.query.key
  //   }
  // },

  components: { SearchItemMoudle }

}
</script>

<style>

</style>
