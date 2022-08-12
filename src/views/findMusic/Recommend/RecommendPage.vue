<template>
  <div>
 <!-- 发现音乐------个性推荐页面 -->
    <template >
      <!-- 移动端轮播图走马灯 -->
      <el-carousel class="lunbotumoible hidden-md-and-up" :interval="4000"  height="40vw" indicator-position="none">
        <el-carousel-item v-for="item in banners" :key="item.bannerId">
          <img @click="lunbotuPlayMusic(item)" :src="item.pic" alt="" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
    </template>

    <template >
      <!-- pc端轮播图走马灯 -->
      <el-carousel class="lunbotu hidden-sm-and-down " :interval="4000" type="card" height="200px" >

        <el-carousel-item v-for="item in banners" :key="item.bannerId">
          <img @click="lunbotuPlayMusic(item)" :src="`${item.pic}?param=690y250`" alt="" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
    </template>
    <!-- 推荐歌单文字pc -->
    <div class="musicListText pc hidden-sm-and-down">
      <span>推荐歌单</span>
      <i class="el-icon-arrow-right"></i>
    </div>

    <!-- 推荐歌单文字移动端 -->
    <div class="musicListText  hidden-md-and-up">
      <span>推荐歌单</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <!-- 推荐歌单列表pc端 -->
    <el-row type="flex" :gutter="10"  class="gexingtuijian hidden-sm-and-down" id="gxpc">
      <el-col   v-for="item in recommendMusicList" :key="item.id" :xs="8" :sm="6" :md="6" :lg="{span:'4-8'}" :xl="4"><div>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <i class="el-icon-headset" style="
                position: absolute;
                right: 5px;
                top: 5px;
                font-size: 12px;
                ">
                {{item.playCount | playvolume}}
            </i>
            <!-- cursor:pointer鼠标经过变小手  -->
            <img  style="cursor:pointer" @click="toMusicList(item, item.id,item.picUrl)" width="100%" :src="`${item.picUrl}?param=200y200`" class="image" />

            </el-card>
          <span>{{item.name}}</span>
          </div>
       </el-col>
    </el-row>

        <!-- 推荐歌单列表移动端 -->
    <el-row type="flex" :gutter="10"  class="gexingtuijian hidden-md-and-up">
      <el-col v-for="item in recommendMusicList" :key="item.id" :xs="8" :sm="6" :md="6" :lg="4" :xl="4"><div>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div class="groundGlass">
                <i class="el-icon-headset" > {{item.playCount | playvolume}} </i>
              </div>
              <img  width="100%" :src="item.picUrl" class="image" />
            </el-card>
          <span>{{item.name}}</span>
          </div>
       </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  data () {
    return {
      // 推荐歌单的数据
      recommendMusicList: [],
      // 轮播图的图片数据
      banners: [],
      // 点击轮播图后获得的歌曲链接
      bannerMusic: ''
    }
  },
  created () {
    // 获取推荐歌单
    this.getrecommendMusicList()
    // 获取轮播图
    this.getSlideshow()
  },
  methods: {
    // 点击歌单跳转到歌曲列表
    toMusicList (item, id, picUrl) {
      // console.log(id)
      // 将需要访问的歌单id存入Storage，在获取歌单列表的组件里进行访问
      // window.sessionStorage.setItem('id', id)
      // 将需要访问的歌单id存入vuex
      this.$store.commit('getMusicListId', id)
      this.$router.push('/musiclistpage')
      // console.log(item)
    },
    // 获取推荐歌单列表
    async getrecommendMusicList () {
      const { data: res } = await this.$http.get('personalized', {
        params: {
          // 获取歌单数目
          limit: 10
        }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取歌单失败')
      }
      this.recommendMusicList = res.result
      // console.log(this.recommendMusicList)
    },
    // 点击轮播图播放音乐
    async lunbotuPlayMusic (item) {
      // console.log(item.song.id)
      // 如果轮播图存在歌曲
      if (item.song.id) {
        const { data: res } = await this.$http.get('/song/url', {
          params: {
            id: item.song.id
          }
        })
        // console.log(res)
        // console.log(res.data[0].url)
        if (res.code !== 200) {
          return this.$message.error('获取音乐失败')
        }
        this.bannerMusic = res.data[0].url
        this.$store.commit('getMusicUrl', res.data[0].url)
        // console.log(this.bannerMusic)
      }
    },
    // 获取轮播图
    async getSlideshow () {
      const { data: res } = await this.$http.get('banner', {
        params: {
          // type2为pc端
          type: 2
        }
      })
      // console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取轮播图失败')
      }
      this.banners = res.banners
    }
  }

}
</script>

<style lang="less" scoped>
// 轮播图
.el-carousel.lunbotu {
  // margin-left: 100px;
  margin-left: 6.5vw;
  // margin-left: 10%;
  // width: 1100px;
  width: 71.6vw;
}
// 轮播图圆角
.el-carousel img {
  border-radius: 10px;
}

// 1
// 1
// 1
// 推荐歌单文字
.musicListText{
  font-size: 20px;
  font-weight: 700;
  margin-top: 24px;
}
.pc{
// 拥有此类时代表pc端
  margin-left: 6.5vw !important;
}

// 1
// 1
// 1
// 推荐歌单
/deep/.el-row#gxpc {
  // 推荐歌单PC端的宽度和左边距
  margin-left: 6.5vw !important;
  width: 71.6vw;
}

.gexingtuijian/deep/.el-col  {
  margin-top: 15px;
  margin-bottom: 15px;

}
// 评分5等份
.el-col-lg-4-8 {
  width: 20%;
}
.gexingtuijian span {
  // 推荐歌单图片文字
  display: inline-block;
  width: 100%;
  font-size: 14px;
  color: #2c3e50;
  white-space: nowrap;
   overflow: hidden;
  text-overflow: ellipsis;
}
.gexingtuijian .el-card {
  height: width;
  border-radius: 8px;

}
.gexingtuijian img{
  border-radius: 8px;
  // 去掉图片底部默认空白
  vertical-align: top;
}
/deep/ .gexingtuijian {
  // flex布局设置子元素换行
  flex-wrap: wrap;
}
.gexingtuijian/deep/.el-card{
  position: relative;
}
.gexingtuijian i {
  color: #fff;

}

.gexingtuijian{
  position: relative;
  // 移动端播放数的毛玻璃效果
  .groundGlass {
    font-size: 12px;
    position: absolute;
    height: 20px;
    line-height: 17px;
    padding: 0px 5px;
    // height: 20px;
    backdrop-filter: blur(100px);
    right: 5px;
    top: 5px;
    border-radius: 15px;
    background: rgba(255, 255, 255, .2);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
    overflow: hidden;
  }
  .groundGlass::before{
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    filter: blur(20px);
    z-index: -1;
    margin: -30px;
  }

}

</style>
