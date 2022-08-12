<template>
<!-- 歌手组件 -->
  <div class="artistListHome-contaier"  v-infinite-scroll="load" infinite-scroll-immediate="false">
    <el-skeleton v-if="isLoading" :rows="8" animated/>
    <!-- autoCenter为全局css文件里的样式，实现自动居中 -->
    <div class="artistListHome autoCenter">
      <!-- 标签盒子 -->
      <div class="tagBox">
        <!-- 语种标签 -->
        <div class="languageTag">
          <!-- 利用事件冒泡，将li的触发事件绑定在ul上,根据点击事件，区分是谁触发的 -->
          <ul ref="ul" @click="changeColor($event)">
            <span></span>
            <span>语种：</span>
            <li>全部</li>
            <li>|</li>
            <li>华语</li>
            <li>|</li>
            <li>欧美</li>
            <li>|</li>
            <li>日本</li>
            <li>|</li>
            <li>韩国</li>
            <li>|</li>
            <li>其他</li>
          </ul>
        </div>
        <!-- 男女歌手标签 -->
        <div class="languageTag">
          <ul ref="ul2" @click="changeColor2($event)">
            <span></span>
            <span>分类：</span>
            <li>全部</li>
            <li>|</li>
            <li>男歌手</li>
            <li>|</li>
            <li>女歌手</li>
            <li>|</li>
            <li>乐队组合</li>
          </ul>
        </div>
        <!-- 字母分类标签 -->
        <div class="languageTag">
          <ul ref="ul3" @click="changeColor3($event)">
            <span></span>
            <span>筛选：</span>
            <li>热门</li>
            <li>|</li>
            <li>A</li>
            <li>|</li>
            <li>B</li>
            <li>|</li>
            <li>C</li>
            <li>|</li>
            <li>D</li>
            <li>|</li>
            <li>E</li>
            <li>|</li>
            <li>F</li>
            <li>|</li>
            <li>G</li>
            <li>|</li>
            <li>H</li>
            <li>|</li>
            <li>I</li>
            <li>|</li>
            <li>J</li>
            <li>|</li>
            <li>K</li>
            <li>|</li>
            <li>L</li>
            <li>|</li>
            <li>M</li>
            <li>|</li>
            <li>N</li>
            <li>|</li>
            <li>O</li>
            <li>|</li>
            <li>P</li>
            <li>|</li>
            <li>Q</li>
            <li>|</li>
            <li>R</li>
            <li>|</li>
            <li>S</li>
            <li>|</li>
            <li>T</li>
            <li>|</li>
            <li>U</li>
            <li>|</li>
            <li>V</li>
            <li>|</li>
            <li>W</li>
            <li>|</li>
            <li>X</li>
            <li>|</li>
            <li>Y</li>
            <li>|</li>
            <li>Z</li>
            <li>|</li>
            <li>#</li>
          </ul>
        </div>
      </div>
      <!-- {{ type }}{{ initial }}{{ area }} -->
      <!-- 歌手盒子 -->
      <div class="artistListBox">
        <el-row :gutter="20" >
          <el-col :span="4"  v-for="item in artistListData" :key="item.id">
            <img @click="toArtistDetail(item.id)" :src="`${item.img1v1Url}?param=150y150`" alt="" />

            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true,
      // 从后端获取到的歌手数据
      artistListData: [],
      offset: 0,

      // 男女歌手乐队
      type: -1,
      // 语种
      area: -1,
      // 按字母分类
      initial: -1
    }
  },
  created () {
    this.getArtistList()
  },
  mounted () {
    this.delay()
  },
  methods: {
    // 跳转到歌手详情页
    toArtistDetail (id) {
      this.$router.push({
        path: '/artistdetail'
        // query: { id: id }
      })
      this.$store.commit('getAitistId', id)
      // console.log(123)
    },
    // 骨架屏延时时间
    delay () {
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
    // 懒加载到底后触发的事件
    load () {
      this.offset += 30
      this.getArtistList()
    },
    // 获取歌手数据
    async getArtistList () {
      const { data: res } = await this.$api.getArtistList({
        type: this.type,
        area: this.area,
        initial: this.initial,
        offset: this.offset
      })
      // 将新获取到的数据添加进数组
      this.artistListData.push(...res.artists)
    },
    // 语种标签点击事件
    changeColor (e) {
      if (e.target.tagName === 'UL' || e.target.tagName === 'SPAN') return
      if (e.target.innerHTML === '|') return
      if (e.target.innerHTML === '全部') {
        this.area = -1
      } else if (e.target.innerHTML === '华语') {
        this.area = 7
      } else if (e.target.innerHTML === '欧美') {
        this.area = 96
      } else if (e.target.innerHTML === '日本') {
        this.area = 8
      } else if (e.target.innerHTML === '韩国') {
        this.area = 16
      } else if (e.target.innerHTML === '其他') {
        this.area = 0
      }

      // 这三种方法都能拿到子元素，第三种为推荐方法
      // const liArray = this.$refs.ul.childNodes
      // const liArray = this.$refs.ul.children
      const liArray = this.$refs.ul.querySelectorAll('li')

      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'background-color: #fff; color: #676767;'
      }
      e.target.style = 'background-color: #fdf5f5; color:#ec4141'
      this.artistListData = []
      this.offset = 0
      this.getArtistList()
    },
    // 男女歌手分类标签点击事件
    changeColor2 (e) {
      if (e.target.tagName === 'UL' || e.target.tagName === 'SPAN') return
      if (e.target.innerHTML === '|') return
      if (e.target.innerHTML === '全部') {
        this.type = -1
      } else if (e.target.innerHTML === '男歌手') {
        this.type = 1
      } else if (e.target.innerHTML === '女歌手') {
        this.type = 2
      } else if (e.target.innerHTML === '乐队组合') {
        this.type = 3
      }
      // 这三种方法都能拿到子元素，第三种为推荐方法
      // const liArray = this.$refs.ul.childNodes
      // const liArray = this.$refs.ul.children
      const liArray = this.$refs.ul2.querySelectorAll('li')

      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'background-color: #fff; color: #676767;'
      }

      e.target.style = 'background-color: #fdf5f5; color:#ec4141'
      this.artistListData = []
      this.offset = 0
      this.getArtistList()
    },
    // 字母标签点击事件
    changeColor3 (e) {
      if (e.target.tagName === 'UL' || e.target.tagName === 'SPAN') return
      if (e.target.innerHTML === '|') return
      if (e.target.innerHTML === '热门') {
        this.initial = -1
      } else if (e.target.innerHTML === '#') {
        this.initial = 0
      } else {
        this.initial = e.target.innerHTML
      }
      const liArray = this.$refs.ul3.querySelectorAll('li')

      for (var i = 0; i < liArray.length; i++) {
        liArray[i].style = 'background-color: #fff; color: #676767;'
      }
      e.target.style = 'background-color: #fdf5f5; color:#ec4141'
      this.artistListData = []
      this.offset = 0
      this.getArtistList()
    }
  }
}
</script>

<style lang="less" scoped>
.artistListHome-contaier {
  position: relative;
  // height:550px;
  height: 99%;
  // overflow: auto;
  // 懒加载
  // 本该用overflow: auto;，但实现不了，用overflow: hidden;意外实现了
  overflow: hidden;

  // background-color: red;
    // 骨架屏
  /deep/.el-skeleton{
    // position: fixed;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #fff;
    height: 100vh;
    z-index: 10;
  }
  // 主体居中盒子
  .artistListHome {
    // height: 100px;
    // border: 1px solid rgb(9, 9, 9);
    margin: 0px auto;
    // 标签盒子
    .tagBox {
      // border: 1px solid rgb(249, 0, 0);
      // 语种标签
      .languageTag {
        // margin-top: 6px;
        span {
          margin-right: 10px;
          font-size: 12px;
          color: #4c4c4c;
        }
        ul {
          // margin-left: 10px;
        }
        ul,
        li {
          cursor: pointer;
          display: inline-block;
        }
        li {
          margin-top: 7px;
        }
        li:nth-child(3) {
          background-color: #fdeded;
          color: #ec4141;
        }
        li:nth-child(2n + 1) {
          text-align: center;
          // margin: 0px 10px;;
          margin-right: 16px;
          border-radius: 10px;

          padding: 0px 10px;
          // margin-left: 20px;
          font-size: 12px;
          list-style: none;
        }
        li:nth-child(2n) {
          // margin: 0px 6px;
          margin-right: 16px;
          width: 0px;
          font-weight: 100;
          color: rgb(243, 243, 243) !important;
        }
      }
    }
  }
  .artistListBox {
    .el-row {
    }
    .el-col {
      margin-top: 16px;
      img {
        cursor: pointer;
        width: 100%;
        border-radius: 5px;
      }
      span {
        display: inline-block;
        margin-top: 5px;
        color: #373737;
        font-size: 14px;
      }
    }
  }

}
</style>
