<template>
<!-- 分页组件 -->
<!-- 1.使用  provide和inject  传入改变父元素偏移量的方法 ，用于点击后改变父组件的偏移量-->
<!-- 2.使用  provide和inject  传入获取到的总数量，用于正确显示分页的页数 -->
  <div class="Pagination-container">
    <el-pagination
    :page-size="50"
    @current-change="pageChange"
    background
    layout="prev, pager, next"
    :total="Count">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  // 接收上级组件的方法和数据
  // ChangOffset改变偏移量的方法
  // Counth获取到的数据数量
  // inject: ['ChangOffset', 'Count'],
  props: {
    Count: {
      type: Number,
      required: true
    }
  },

  methods: {
    // 改变页数时触发
    pageChange (num) {
      // console.log(num)
      num = num - 1
      // 调用SearchPage.vue的方法，并传参，改变偏移量
      this.$emit('ChangOffset', num * 50)
    }
  }

}
</script>

<style lang="less" scoped>
.Pagination-container{
  margin-top: 40px;
  text-align: center;
  // margin:  auto;
  // 选中时颜色
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#EC4141;

  }
}
</style>
