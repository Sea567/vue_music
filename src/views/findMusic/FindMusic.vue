<template>
  <div>
    <!-- 顶部导航区 -->
    <!-- :default-active="this.$route.path.substr(1)" 使用刷新后仍在当前路由 -->
    <el-menu  width="100%"  :default-active="this.$route.path.substr(1)" router class="el-menu-demo navigationMenu" mode="horizontal">
      <el-menu-item index="recommend">个性推荐</el-menu-item>
      <el-menu-item index="songlist">歌单</el-menu-item>
      <el-menu-item index="toplist">排行榜</el-menu-item>
      <el-menu-item index="artistlist">歌手</el-menu-item>
      <el-menu-item index="newestmusic">最新音乐</el-menu-item>
    </el-menu>
    <!-- 个性推荐的页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// 头部导航
.el-menu::after, .el-menu::before {
  // 去掉自带的下边框线
  display: table;
}
.el-menu--horizontal>.el-menu-item.is-active{
  // 选中时
  border-bottom: 4px solid #EC4141;
  font-size: 20px;
}
.navigationMenu/deep/ .el-menu-item.is-active{
  // 选中时字重
font-weight: 800;
}

.el-menu--horizontal>.el-menu-item{
  // 未选中时的字体大小和颜色
  font-size: 14px;
  color: #373737;
}
 .el-menu.el-menu--horizontal{
  // 上边框线
  border: 1px;
}
.el-menu-demo .el-menu-item{
  // 顶部导航栏间距
  padding: 0 10px;
}
.el-menu--horizontal>.el-menu-item{
  // 控制选中红线的高度
  height: 48px;
}
.navigationMenu {
  // 与轮播图的距离
  padding-bottom: 15px;
}
</style>
