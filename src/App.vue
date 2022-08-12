<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!-- 头部区域 -->
      <el-header>
        <!-- logo区域 -->
        <div class="logodiv">
          <!-- logo圆型白色背景 -->
          <div class="logobgc">
            <img src="@/assets/img/网易云.png" alt="" class="log1" />
          </div>
          <img src="@/assets/img/网易云音乐文字.png" alt="" class="log2" />
        </div>
        <!-- 搜索区域 -->
        <div class="search">
          <!--搜索框左侧的图标 -->
                <div class="searchIcon">
                  <span><i class="el-icon-arrow-left"></i></span>
                  <span><i class="el-icon-arrow-right"></i></span>

                </div>
          <!-- 搜索框 -->
          <el-input @focus="searchInputFocus()" @blur="searchInputBlur" placeholder="搜索" @keydown.enter.native="ketEnter" v-model="serchInputText" prefix-icon="el-icon-search"> </el-input>
         <!-- 搜索框获得焦点时显示的搜索历史和热搜 -->
          <div  tabindex="0" ref="searchHistoryBoxRef" class="search-history-box" @focus="searchHistoryBoxFoucs"  @blur="searchHistoryBoxBlur" v-if="searchHistoryIsShow">
            <div class="search-history" >
              <!-- 搜索历史 -->
              <div class="title" v-show="searchHistoryTextArray.length !==0">
                <span>搜索历史
                  <!-- 清楚搜索 全部 历史记录 -->
                  <i class="el-icon-delete" @click="cleaerAllSearchHistory"></i>
                </span>
                <span @click="lookAll" ref="lookAllRef">看查全部</span>
              </div>
              <!-- 搜索历史字段 -->

              <div class="history-text" ref="historyTextRef" v-show="searchHistoryTextArray.length !==0">
                <span  v-for="(item) in searchHistoryTextArray" :key="item.id">
                  {{item.text}}
                  <!-- 清除搜索 单个 历史记录 -->
                  <i class="el-icon-close" @click="cleaerOneSearchHistory(item.id)" ></i>
                </span>
              </div>

            </div>
            <!-- 热搜榜 -->
            <div class="search-hot">
              <div class="title">热搜榜</div>
              <div @click="toSearchMusic(item.searchWord)" class="search-hot-list" v-for="(item ,index) in  searchHot.data" :key="item.id">
                <span :style=" index<3? 'color:#ff3a3a':'' ">{{index+1}}</span>
                <span>{{item.searchWord}}</span>
                <span>{{item.score}}</span>
                <i v-if="item.iconType === 1" class="hot" >HOT</i>
                <i v-if="item.iconType === 2" class="new">NEW</i>
              </div>
            </div>
          </div>
          <!-- 搜索框右侧的听歌识曲图标 -->
                <div class="searchIconRight">
                  <span><i class="el-icon-microphone"></i></span>

                </div>
          <!-- 搜索框有内容时，获得焦点显示 搜索建议 -->
          <div tabindex="0" @focus="searchSuggestionsFocus"  @blur="searchSuggestionsBlur" class="search-suggestions-box" v-show="searchSuggestionsIsShow">
            <!-- 搜'''相关的结果 -->
            <div class="container">
              搜"
              <span>{{serchInputText}}</span>
              "相关的结果
            </div>
            <!-- 单曲 -->
            <div class="title" v-if="searchSuggestData">
              <div class="title-text">
                <span><i class="iconfont icon-yinlefuhao2"></i>单曲</span>
              </div>
              <!-- {{searchSuggestData.songs}} -->
              <div @click="playMusic(item.id)" class="item"  v-for="item in searchSuggestData.songs" :key="item.id">
              <span>{{item.name}}</span>
              <span class="alias" v-if="item.alias.length>0"> ({{item.alias[0]}})</span>
              <span  class="artists" v-for="item2 in item.artists" :key="item2.id">-{{item2.name}}</span>
              </div>
            </div>
            <!-- 歌手 -->
            <div class="title" v-if="searchSuggestData">
              <div class="title-text"><span> <i class="iconfont icon-jurassic_user"></i> 歌手</span></div>
              <div  @click="toArtistDetail(item.id)" class="item" v-for="item in this.searchSuggestData.artists" :key="item.id">
                <span>{{item.name}}</span>
              </div>
            </div>
            <!-- 专辑 -->
            <div class="title" v-if="searchSuggestData">
              <div class="title-text"><span><i class="iconfont icon-guangpan"></i>专辑</span></div>
              <div @click="toAlbumContent (item.id)" class="item" v-for="item in this.searchSuggestData.albums" :key="item.id">
                 <span>{{item.name}}</span>
                 <span class="artist"> - {{item.artist.name}}</span>
              </div>
            </div>
            <!-- 歌单 -->
            <div class="title" v-if="searchSuggestData">
              <div class="title-text"><span><i class="iconfont icon-gedan"></i>歌单</span></div>
              <div @click="toPlayLists(item.id)" class="item" v-for="item in this.searchSuggestData.playlists" :key="item.id">
                <span>{{item.name}}</span>

              </div>
            </div>
          </div>
        </div>
        <!-- {{sessionStorage.getItem(userinfo).avatarUrl}} -->
        <!-- 用户区域  -->
        <div class="user">
          <div class="user-portrait" @click="isLogin?'':loginFrameIsShow=true">
             <el-avatar :src="loginUserInfo.avatarUrl"  icon="el-icon-user-solid" :size="30"  ></el-avatar>
          </div>
          <!-- 登录框 -->
          <div class="user-login-frame" ref="userLoginFrameRef" @mousedown="moveLoginFrame($event)" v-if="loginFrameIsShow">
            <!-- 关闭按钮和手机图片 -->
            <div class="img-and-close">
              <i class="iconfont icon-guanbi" @click="loginFrameIsShow=false" ></i>
              <img src="@/assets/img/phone.png" alt="">
            </div>
            <!-- 输入框登录按钮 -->
            <div class="input-and-button">
              <el-input
              class="input-phone"
                placeholder="请输入手机号"
                prefix-icon="el-icon-mobile-phone"
                v-model="userPhone"
                >
              </el-input>
              <el-input
              show-password
                class="input-password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="userPassword"
                >
              </el-input>
              <div class="auto-login">
                <input type="checkbox" >自动登录
              </div>
              <div class="login-button">
                <button class="login" @click="phoneLogin">登 录</button>
              </div>
              <div class="register-button">
                <button class="login">注册</button>
              </div>

            </div>
            <!-- 同意条款 -->
            <div class="agreement">
              <input type="checkbox" checked="checked"> 同意
              <span>《服务条款》</span>
              <span>《隐私政策》</span>
              <span>《儿童隐私政策》</span>
            </div>
          </div>
          <div class="user-name" @click="loginFrameIsShow=true">{{loginUserInfo.nickname?loginUserInfo.nickname:'未登录'}}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="user-vip">开通VIP</div>
        </div>

        <!-- 最右侧的图标 -->
        <div class="rightIcon">
              <!-- <div class="rightIconRelative"> -->
                <i class="iconfont icon-pifu"></i>
                <i class="iconfont icon-shezhi"></i>
                <i class="iconfont icon-youxiang"></i>
                <i class="iconfont icon-vertical_line"></i>
                <i class="iconfont icon-CZ_028"></i>
                <i class="iconfont icon-zuixiaohua"></i>
                <i class="iconfont icon-3zuidahua-1"></i>
                <i class="iconfont icon-guanbi"></i>
              <!-- </div> -->
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-container class="home-container">
        <!-- 主体左侧导航区域 -->
        <el-aside width="200px" class="hidden-sm-and-down asideMenu">
          <el-menu router active-text-color="#313131" default-active="findmusic">
            <el-menu-item index="findmusic">
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">播客</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">视频</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">朋友</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">直播</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span slot="title">私人FM</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体右侧界面区域 -->
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
      <!-- 抽屉 -->
      <el-drawer :withHeader="false" :modal="false" z-index="10" size="100%" :visible.sync="drawer" direction="btt">
        <!--播放器组件 -->
        <BigPlayerPage ref="BigPlayerPageRef" :father="this"></BigPlayerPage>
      </el-drawer>

      <!-- 底部播放区域 -->
      <el-footer>
        <!-- 左侧歌曲信息展示 -->
        <div class="imgAndNameBox" ref="imgAndNameBox">
          <!-- 进入大播放器界面时候显示的按钮 -->
          <div class="bigPlayButtonBox">
            <!-- 此盒子为了position布局 -->
            <div class="bigPlayButton">
              <!-- 最左侧的图标 -->
              <i class="el-icon-arrow-down" @click="closeDrawer"></i>
              <!-- 4个图标 -->
              <div class="bigPlayButtonTwo">
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin2"></use>
                  </svg>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoucang-copy"></use>
                  </svg>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai2-copy"></use>
                  </svg>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1-copy"></use>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <!-- 图片歌手区域 -->
          <div class="imgAndName">
            <!-- 鼠标经过图片时的遮罩层 -->
            <div class="imgMaskLayer" @click="showDrawer">
              <i class="el-icon-arrow-up"></i>
            </div>
            <!-- 歌曲图 -->
            <img :src="musicInfo[0] ? `${musicInfo[0].al.picUrl}?param=80y80` : ''" alt="" />

            <!-- 歌曲和歌手名 -->
            <div class="songer">
              <!-- 歌曲名字 -->
              <span>{{ musicInfo[0] ? musicInfo[0].name : '' }}</span>
              <!-- 爱心图标两个，按需显示 -->
              <span class="iconfont icon-aixin2" v-if="love" @click="iLike(musicInfo[0].id)"></span>
              <span style="color: #ec4141" class="iconfont icon-aixin1" v-else @click="dislike(musicInfo[0].id)"></span>
              <br />
              <!-- 判断是否有两个歌手，是的话显示两个歌手，否则显示一个 -->
              <span v-if="musicInfo[0]">{{ musicInfo[0].ar.length === 2 ? musicInfo[0].ar[0].name + ' / ' + musicInfo[0].ar[1].name : musicInfo[0].ar[0].name }}</span>
            </div>
          </div>
        </div>
        <!-- 歌曲控制 -->
        <div class="musicControl">
          <div class="control">
            <i class="iconfont icon-caozuo-xunhuan1"></i>
            <i class="iconfont icon-shangyishou"></i>
            <i class="iconfont icon-24gf-play" v-if="playshow" @click="changeplayshow"></i>
            <i class="iconfont icon-24gf-pause2" v-else @click="changeplayshow"></i>
            <i class="iconfont icon-xiayishou"></i>
            <i class="iconfont icon-geciweidianji"></i>
            <div class="playCircle"></div>
          </div>
          <!-- 进度条 -->
          <div class="longtime">
            <div>
              <el-slider :show-tooltip="false" @change="setPlayTime" v-model="playTime" :max="duration"></el-slider>
              <!-- 播放时长 -->
              <span>{{ (currentTime * 1000) | timeformate }}</span>
              <br />
              <!-- 歌曲总时长 -->
              <span>{{ (duration * 1000) | timeformate }}</span>
            </div>
          </div>
        </div>

        <!-- controls="controls" -->
        <audio ref="audio1" autoplay="autoplay" preload="metadata">
          <source :src="musicUrl" type="audio/mp3" />
          Your browser does not support this audio format.
        </audio>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 导入播放器组件给抽屉使用
import BigPlayerPage from '@/components/bigPlayer/BigPlayerPage.vue'
// 导入vuex的数据，以计算属性的方式使用vuex的数据
import { mapState } from 'vuex'

export default {
  // 将方法传给子孙组件
  provide () {
    return {
      closeDrawer: this.closeDrawer
    }
  },
  components: {
    // 注册播放器组件
    // 'BigPlayerPage':BigPlayerPage 同名可以省略
    BigPlayerPage
  },
  data () {
    return {
      // 用于保存防抖的定时器
      timeout: null,
      // 搜索推荐数据
      searchSuggestData: {},
      // 搜索历史用的id
      searchStoryId: 0,
      // 保存搜索历史文字的数组
      searchHistoryTextArray: [],
      // 搜索建议框是否获得焦点
      searchSuggestionsIsFocus: false,
      // 搜索建议框是否显示
      searchSuggestionsIsShow: false,
      // 搜索历史框是否得到焦点
      searchHistoryBoxIsFoucs: false,
      // 搜索历史框是否显示
      searchHistoryIsShow: false,
      // 热搜
      searchHot: {},
      // 歌曲当前播放时长
      currentTime: 0,
      // 歌曲总长度
      duration: 0,
      // audio组件
      audio: '',
      // 播放歌曲进度条数据
      playTime: 0,
      // 控制播放暂停图标
      playshow: true,
      // 控制收藏爱心的显示与隐藏
      love: true,
      // 控制抽屉显示
      drawer: false,
      // 搜索输入框v-mode绑定数据
      serchInputText: '',
      // 用户手机输入登录框
      userPhone: '',
      // 用户密码输入框
      userPassword: '',
      // 控制登录框的显示
      loginFrameIsShow: false,
      // 用户头像
      userImg: '',
      // 用户名
      userName: ''

    }
  },
  computed: {
    // 以计算属性的方式使用vuex的数据
    ...mapState(['musicUrl', 'musicInfo', 'loginUserInfo', 'isLogin'])
  },
  methods: {
    // 取消喜欢歌曲
    async dislike (musicID) {
      console.log(this.musicInfo[0])
      const { data: res } = await this.$api.iLike({ id: musicID, like: false })
      console.log(res)
      if (res.code === 200) {
        // true为白色爱心
        this.love = true
      }
    },
    // 我喜欢
    async iLike (musicID) {
      console.log(this.musicInfo[0])
      console.log(this.musicInfo[0].id)
      const { data: res } = await this.$api.iLike({ id: musicID, like: true })
      console.log(res)
      if (res.code === 200) {
        this.love = false
      }
    },
    // 手机登录
    async phoneLogin () {
      const { data: res } = await this.$api.phoneLogin({ phone: this.userPhone, password: this.userPassword })
      console.log(res)
      if (res.code === 200) {
        this.$message('登录成功')
        document.cookie = `Authorization=${res.token}`
        this.$store.commit('getLoginToken', res.token)
        this.$store.commit('getLoginUserInfo', res.profile)
        this.userImg = res.profile.avatarUrl
      }
      console.log(res)
    },
    // 拖动登录框
    moveLoginFrame (e) {
      // 判断可拖动的区域
      if (e.target.className === '' ||
      e.target.className === 'el-input__inner' ||
      e.target.className === 'login'
      ) return
      var x = e.pageX - this.$refs.userLoginFrameRef.offsetLeft
      var y = e.pageY - this.$refs.userLoginFrameRef.offsetTop
      var userLoginFrame = this.$refs.userLoginFrameRef
      document.addEventListener('mousemove', move)
      function move (e) {
        userLoginFrame.style.left = e.pageX - x + 'px'
        userLoginFrame.style.top = e.pageY - y + 'px'
      }
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', move)
      })
    },
    // 点击搜索推荐中 歌单 跳转到歌单页面
    toPlayLists (id) {
      // console.log(item)
      this.$store.commit('getMusicListId', id)
      // 判断当前router路径，如果在当前组件则不跳转
      if (this.$route.path !== '/musiclist') {
        this.$router.push('/musiclist')
      }
      this.searchSuggestionsIsShow = false
    },

    // 点击搜索推荐中 专辑 跳转到内容详情页
    toAlbumContent (id) {
      // 编程式路由传参
      this.$router.push({
        query: { id: id },
        path: '/albumcontent'
      }
      )
      this.searchSuggestionsIsShow = false
    },
    // 点击搜索推荐中歌手 跳转到歌手详情页
    toArtistDetail (id) {
      this.$router.push({
        path: '/artistdetail'
        // query: { id: id }
      })
      this.$store.commit('getAitistId', id)
      this.searchSuggestionsIsShow = false
    },
    // 点击搜索推荐中的 音乐单曲，播放音乐
    async playMusic (id) {
      // 获取音乐url
      const { data: res } = await this.$api.getMusicUrl({ id: id })
      // 将url同步至vuex
      this.$store.commit('getMusicUrl', res.data[0].url)
      // 获取歌曲详细信息
      const { data: musicInfo } = await this.$api.getMusicInfo({ ids: id })
      this.$store.commit('getMusicInfo', musicInfo.songs)
      this.searchSuggestionsIsShow = false
    },

    // 防抖
    debounce (fn, delay) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        // this.getSearchSuggest()
        fn()
      }, delay)
    },

    // 获取搜索建议
    async getSearchSuggest () {
      const { data: res } = await this.$api.getSearchSuggest({ keywords: this.serchInputText })
      console.log(res.result)
      if (res.result === undefined) return
      if (Object.keys(res.result).length === 0) return
      this.searchSuggestData = res.result
    },

    // 搜索历史查看全部
    lookAll () {
      console.log('cookall')
      this.$refs.historyTextRef.style = 'overflow: auto;height: auto;'
      this.$refs.lookAllRef.style = 'display: none'
    },
    // 删除搜索单个历史记录
    cleaerOneSearchHistory (id) {
      // 使用过滤器删除数组中的内容 把不等于被删除的id的项留下来
      this.searchHistoryTextArray = this.searchHistoryTextArray.filter(item => item.id !== id)
    },
    // 删除搜索全部历史记录
    cleaerAllSearchHistory () {
      this.searchHistoryTextArray = []
    },
    // 点击热搜榜 跳转到搜索页面
    toSearchMusic (searchWord) {
      // console.log(searchWord)
      this.serchInputText = searchWord
      this.ketEnter()
      // 关闭搜索历史框
      this.searchHistoryBoxIsFoucs = false
      this.searchHistoryIsShow = false
      // 关闭搜索推荐框
      // 如果直接关闭，则watch检测到数据变化，搜索推荐框又会被重新打开
      // 使用定时器后,就在被watch打开后再关闭
      setTimeout(() => {
        this.searchSuggestionsIsShow = false
        this.searchSuggestionsIsFocus = false
      }, 1)
    },
    // 当搜索推荐框得到焦点
    searchSuggestionsFocus () {
      console.log('搜索推荐得到焦点')
      this.searchSuggestionsIsFocus = true
    },
    // 当搜索推荐框失去焦点
    searchSuggestionsBlur () {
      console.log('搜索推荐失去焦点')
      this.searchSuggestionsIsFocus = false
      this.searchSuggestionsIsShow = false
    },
    // 当搜索历史框失去焦点
    searchHistoryBoxBlur () {
      console.log('历史框失去焦点')

      this.$refs.lookAllRef.style = 'display: inline-block;'
      // 判断是否有历史记录，如果有，则设定高度
      if (this.searchHistoryTextArray !== 0) {
        this.$refs.historyTextRef.style = 'overflow: hidden;height: 65px;'
      }

      this.searchHistoryBoxIsFoucs = false
      this.searchHistoryIsShow = false
    },
    // 历史框得到焦点
    searchHistoryBoxFoucs () {
      console.log('历史框得到焦点')
      this.searchHistoryBoxIsFoucs = true
    },
    // 当搜索框失去焦点
    searchInputBlur () {
      console.log('搜索框失去焦点')
      // 当搜索框失去焦点后，点击历史框，就会改变历史框是否在焦点，如果在焦点，则直接return
      // 这里用setTimeout，是为了点击历史框后，searchHistoryIsShow为true，才能被检测到
      // 如果不用setTimeout，js会先执行blur，再执行click，会导致历史框直接消失，点击事件无法触发
      setTimeout(() => {
        // 历史框获得焦点则不隐藏历史框
        if (this.searchHistoryBoxIsFoucs || this.searchSuggestionsIsFocus) return
        this.searchHistoryIsShow = false
        this.searchSuggestionsIsShow = false
        console.log(this.searchHistoryBoxIsFoucs)
      }, 10)
    },
    // 当搜索框获得焦点
    searchInputFocus () {
      if (this.serchInputText.length !== 0) {
        console.log('搜索框得到焦点')
        this.searchSuggestionsIsShow = true
      }
      if (this.serchInputText.length === 0) {
        console.log('搜索框得到焦点')
        this.getSearchHot()
        this.searchHistoryIsShow = true
      }
    },
    // 获取热搜列表
    async getSearchHot () {
      const { data: res } = await this.$api.getSearchHot()
      console.log(res)
      this.searchHot = res
    },
    // 按下 回车跳转到搜索
    ketEnter () {
      // 搜索框按下enter键跳转到搜索页面
      if (this.serchInputText === '') return
      // 关闭搜索建议框
      this.searchSuggestionsIsShow = false
      // 按下回车后将搜索的内容添加进数组
      var obj = {}
      obj.text = this.serchInputText
      // 给每个历史记录添加id
      obj.id = this.searchStoryId
      this.searchStoryId += 1
      this.searchHistoryTextArray.unshift(obj)
      // console.log(this.searchHistoryTextArray)
      // 搜索框关键字提交至vuex
      this.$store.commit('getKeywords', this.serchInputText)
      // 判断当前路径，防止重复跳转报错
      if (this.$route.path !== '/searchMusic') {
        this.$router.push('/searchpage')
      }
    },
    // 拖动进度条更改播放进度
    setPlayTime (play) {
      // 将播放秒数改为进度条的值
      this.audio.currentTime = play
      // console.log(this.playTime)
      // this.playTime = play
    },
    // 显示播放按钮
    changeplayshow () {
      // true为暂停按钮
      this.playshow = !this.playshow
      this.$store.commit('getPlayState', this.playshow)
      // 控制audio的播放与暂停
      if (!this.playshow) {
        this.$refs.audio1.play()
      } else {
        this.$refs.audio1.pause()
      }
    },
    // 显示爱心
    changeLove () {
      this.love = !this.love
    },
    // 显示抽屉并调整左侧盒子的显示
    showDrawer () {
      this.drawer = !this.drawer
      // this.$refs.imgAndNameBox.style.top = '0px'
      this.$refs.imgAndNameBox.style = 'transform: translateY(81px);transition-duration: 1s;'
      //
    },
    // 关闭抽屉并调整左侧盒子的显示
    closeDrawer () {
      this.drawer = !this.drawer
      // this.$refs.imgAndNameBox.style.top = '-81px'
      this.$refs.imgAndNameBox.style = 'transform: translateY(0px);transition-duration: 1s;'
    }
  },
  created () {},
  mounted () {
    // 用于iconfont里第三种在线引用方法
    const oScript = document.createElement('script')
    oScript.type = 'text/javascript'
    oScript.src = 'https://at.alicdn.com/t/font_3325157_md1ago0avja.js'
    document.body.appendChild(oScript)

    this.audio = this.$refs.audio1
    // 获取歌曲总时长
    this.audio.addEventListener('canplay', () => {
      this.duration = parseInt(this.audio.duration)
    })
    // 获取已经播放时长
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = parseInt(this.audio.currentTime)
      // 把播放时间赋值给进度条的值
      this.playTime = this.currentTime
      // 把播放时间赋值给vuex
      this.$store.commit('getcurrentTime', this.audio.currentTime)
    })
    // 歌曲结束时自动更换暂停图标
    this.audio.addEventListener('ended', () => {
      // console.log(1231323)
      this.playshow = true
      // 根据audio的播放状态更改状态数据，用于其他组件使用
      this.$store.commit('getPlayState', this.playshow)
    })
    // 歌曲开发播放时,自动更换播放图标
    this.audio.addEventListener('play', () => {
      // console.log(1231323)
      this.playshow = false
      // 根据audio的播放状态更改状态数据，用于其他组件使用
      this.$store.commit('getPlayState', this.playshow)
    })
  },
  watch: {

    musicUrl () {
      // 监听数据，当vux的数据发生了改变，就重新加载播放器的数据，实现播放
      this.$refs.audio1.load()
      // 实现双击播放时  播放按钮的自动转换
      this.playshow = false
    },
    // 抽屉搜索框和主页面的搜索框互相监听，实现双向数据绑定
    serchInputText () {
      // 控制历史框和搜索推荐框的显示
      if (this.serchInputText === '') {
        this.searchSuggestionsIsShow = false
        this.searchHistoryIsShow = true
      }
      if (this.serchInputText !== '') {
        this.searchSuggestionsIsShow = true
        this.searchHistoryIsShow = false
        // 获取搜索推荐
        // 防抖
        this.debounce(this.getSearchSuggest, 500)
      }
      // 首页输入框内容和播放器输入框双向绑定，应该使用vuex
      // 先判断BigPlayerPageRef是否被加载
      if (this.$refs.BigPlayerPageRef) {
        this.$refs.BigPlayerPageRef.serchInputText2 = this.serchInputText
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 布局容器样式
.el-header {
  position: relative;
  background-color: #ec4141;
}
.el-footer {
  border-top: 1px solid #e6e6e6;
  height: 72px !important;
  // background-color: rgb(80, 65, 65);
}
.el-main {
  padding-top: 0;
  // height: 685px !important;
  // height: 613px !important;
  // background-color: rgb(202, 202, 167);
}
.home-container {
  // height: 613px !important;
  height: 80vh !important;
}
// log的布局样式
.logodiv {
  float: left;
  width: 150px;
  margin-right: 0;
  .logobgc {
    display: inline-block;
    height: 28px;
    width: 28px;
    background-color: #fff;
    border-radius: 14px;
    text-align: center;
    line-height: 31px;
    margin-top: 15px;
    .log1 {
      width: 60%;
    }
  }
  .log2 {
    display: inline-block;
    width: 60%;
    margin-left: 3px;
  }
}

// 搜索框的布局样式

.search {
  float: left;
  position: relative;
  margin-top: 15px;
  margin-left: 126px;
  // 搜索框左侧图标
        .searchIcon{
          top: 3px;
          left: -70px;
          position: absolute;
          span{
            cursor: pointer;
            margin-right: 10px;
            display: inline-block;
            // border: 1px solid red;
            border-radius: 20px;
            text-align: center;
            line-height: 24px;
            height: 24px;
            width: 24px;
            // background-color: rgba(153, 153, 153, 0.2);
            background-color: #d93b3b;
            i{
              font-size: 14px;
              color: #f9d8d8;
            }
          }
        }
        // 搜索框右侧图标
        .searchIconRight{
          position: absolute;
          top: 0px;
          left: 170px;
          span{
            cursor: pointer;
            // margin-right: 10px;
            display: inline-block;
            // border: 1px solid red;
            border-radius: 30px;
            text-align: center;
            line-height: 32px;
            height: 32px;
            width: 32px;
            // background-color: rgba(153, 153, 153, 0.2);
            background-color: #d93b3b;
            i{
            cursor: pointer;
            font-size: 20px;
            color: #f9d8d8;
          }
          }

        }
  // 搜索历史和热搜榜盒子
.search-history-box{
  overflow: auto;
  position: absolute;
  left: -30px;
  z-index: 10;
  height: 450px;
  width: 350px;
  padding: 13px 0px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 12px #505050;
  // 搜索历史盒子
  .search-history{
    //height: 110px;
    //搜索历史和查看全部
    .title{
      margin-left: 20px;
      color: #666666;
      font-size: 14px;
      i{
        cursor: pointer;
        &:hover{
          color: rgb(51, 51, 51);
        }
      }
      //查看全部
      span:nth-child(2){
        margin-left: 180px;
        cursor: pointer;
        &:hover{
          color: rgb(51, 51, 51);
        }
      }
    }
    //搜索历史字段盒子
    .history-text{

      margin-bottom: 10px;
      overflow: hidden;
      height: 65px;
      margin-top: 12px;
      padding: 0px 20px;
      span{
        &:hover i{
          visibility: visible;
        }
        &:hover{
          background-color: rgb(243, 242, 242);
        }
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        display: inline-block;
        border: 1px solid rgb(217, 217, 217);
        border-radius: 20px;
        height: 24px;
        line-height: 23px;
        padding-left:  17px ;
        padding-right: 3px;
        color: rgb(51, 51, 51);
        i{
          visibility: hidden;
          margin-left: -3px;
        }
      }
    }
  }
  // 热搜榜盒子
  .search-hot{
    // 热搜榜 标题
    .title{
      margin-left: 20px;
      color: #666666;
      font-size: 14px;

    }
    // 热搜榜item
    .search-hot-list{
      &:hover{
        background-color: #f3f3f3;
      }
      cursor: pointer;
      line-height: 50px;
      height: 55px;
      span{
        cursor: pointer;
      }
      span:nth-child(1){
        color: #cccccc;
        margin-left: 20px;
      }
      span:nth-child(2){
        font-size: 12px;
        font-weight: 700;
        color: #333333;
        margin-left: 30px;
      }
      span:nth-child(3){
        margin-left: 10px;
        font-size: 12px;
        font-weight: 200;
        color: #cccccc;
      }
      .hot{
        font-size: 12px;
        font-weight: 700;
        margin-left: 10px;
        color: #ff3b3b;
      }
      .new{
        font-size: 12px;
        font-weight: 700;
        margin-left: 10px;
        color: #27af27;
      }
    }
  }
}
// 搜索建议盒子
.search-suggestions-box{
  // display: none;
  overflow: auto;
  position: absolute;
  left: -30px;
  z-index: 10;
  height: 400px;
  width: 355px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 12px #505050;
  .container{
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    // background-color: pink;
    font-size: 12px;
    color: #676767;
    span{
      color: #507dc0;
    }
  }
  .title{
    // margin-left: 10px;
    color:#373737;
    font-size: 12px;
    .title-text{
      cursor: pointer;
      line-height: 25px;
      height: 25px;
      background-color: #f5f5f7;
      span{
        margin-left: 10px;
        i{
          margin-right: 5px;
        }
      }
    }
    .item{
      &:hover{
        background-color: #f5f5f7;
      }
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      span{
        cursor: pointer;
        margin-left: 30px;

      }
      .alias{
        margin-left: 0px;
        color: #9f9f9f;
      }
      .artists{
        margin-left: 0px;

      }
      .artist{
        margin-left: 0px;
      }

    }
  }
}

  /deep/ .el-input__inner {
    color: #fff;
    font-size: 12px;
    width: 160px;
    height: 32px;
    background-color: #e13e3e;
    border-radius: 20px;
    border: 0;
  }

  /deep/ .el-input__prefix {
    color: #fff;
  }

  /deep/ .el-input {
    color: red;
  }

  /deep/ .el-input__icon {
    line-height: 35px;
  }

  /deep/input::-webkit-input-placeholder {
    color: #d3d3d3;
    font-size: 12px;
  }
}
// user区域
.user{

  position: absolute;
  right: 285px;
  // background-color: pink;
  color: #fbd9d9;
  height: 100%;
  // width: 148px;
  font-size:12px;

  .user-portrait,.user-name,.user-vip{
    line-height: 60px;
    float: left;
    cursor: pointer;
  }
  .user-portrait{
    margin-top: 10px;
    .el-avatar{
      cursor: pointer;
    }
  }
  .user-name{
    margin-left: 5px;
    &:hover{
      color: #ffffff;
    }
  }
  .user-vip{
    margin-left: 3px;
    &:hover{
      color: #ffffff;
    }
  }
  // 登录框
  .user-login-frame{
    position: fixed;
    top:100px;
    right: 50%;
    transform:translate(50%,0);//实现居中
    width: 350px;
    height: 530px;
    background-color: #fff;
    z-index: 10;
    border-radius: 5px;
    box-shadow: 2px 2px 12px #505050;
    // 关闭按钮和手机图片
    .img-and-close{

      i{
        cursor: pointer;
        display: block;
        float: right;
        margin-top: 8px;
        margin-right: 8px;
        font-size: 20px;
        color: #999999;
      }
      img{
        width: 100%;
        margin-top: 30px;
      }
    }
    .input-and-button{
      /deep/.input-phone{
        width: 260px;
        // margin-left: 20px;
        margin-left: 45px;
        border: 1px solid #e5e5e5;
        border-radius:5px 5px 0px 0px
      }
      .input-password{
        width: 260px;
        margin-left: 45px;
        border: 1px solid #e5e5e5;
        border-top: 0px;
        border-radius:0px 0px 5px 5px
      }
      .auto-login{
        display: block;
        color: #666666;
        line-height: 40px;
        vertical-align: middle;
        input{
          // -webkit-appearance: none;//这个属性是将input标签变成一个可修改样式的普通标签
          vertical-align: middle;
          margin-left: 45px;
          // width: 50px;
        }
      }
      .login-button{
        .login{
          cursor: pointer;
          width: 260px;
          background-color: #ea4848;
          border: none;
          height: 40px;
          color: #fff;
          margin-left: 45px;
          border-radius: 5px;
          font-size:16px;
          &:hover{
            background-color: #c72e2e;
          }

        }

      }
      .register-button{
        margin-top:5px;
        button{
          text-decoration:underline;
          cursor: pointer;
          width: 260px;
          background-color: #fff;
          border: none;
          height: 40px;
          color: #333333;
          margin-left: 45px;
          border-radius: 5px;
          font-size:16px;
        }
      }

      /deep/ .el-input__inner {
    color: #333;
    font-weight: 700;
    font-size: 12px;
    // width: 260px;
    // height: 32px;
    // background-color: #e13e3e;
    border-radius: 5px;
    border: 0;
  }

  /deep/ .el-input__prefix {
    color: #9b9b9b;
  }

  /deep/ .el-input {
    color: red;
  }

  /deep/ .el-input__icon {
    line-height: 35px;
  }

  /deep/input::-webkit-input-placeholder {
    color: #d3d3d3;
    font-size: 12px;
  }
    }
    // 同意条款
    .agreement{
      vertical-align: middle;
      color: #aeaeae;
      margin-left: 33px;
      margin-top: 75px;
      input{
        vertical-align: middle;
      }
      span{
        color: #507daf;
      }
    }
  }
}
 // header右侧图标
.rightIcon{
        position: absolute;
        right: 0;
        // border: 1px solid red;
        box-sizing: border-box;
        height: 80px;
        width: 268px;
        i{
          cursor: pointer;
          display: inline-block;
          font-size: 20px;
          // margin-right: 14px;
          margin-top: 20px;
          color: #fbd9d9;
        }
        i:nth-child(2){
          margin-left: 14px;
        }

        i:nth-child(3){
          margin-left: 14px;
        }
        i:nth-child(4){
          margin-left: 4px;
        }
        i:nth-child(5){
          margin-left: 5px;
        }
        i:nth-child(n+6){
          margin-left: 16px;
        }

}

// 左侧导航区域
.asideMenu/deep/ .el-menu-item.is-active {
  font-weight: 800;
}

.asideMenu/deep/ .el-menu-item {
  // 未选中字体大小
  font-size: 16px;
}
.asideMenu/deep/ .el-menu-item,
.el-submenu__title {
  height: 38px;
  line-height: 38px;
}
.asideMenu/deep/.el-menu {
  // 距离顶部
  margin-top: 10px;
  // 整体高度，98是为了不让出现滑动条
  height: 100%;
}
// 1
// 1
// 11
// 1
// 1

// footer区域
// 使footer在抽屉之上
.el-footer {
  background-color: #fff;
  overflow: hidden;
  position: relative;
  z-index: 100;
  // 左侧图片和歌手区域和大播放器的按钮区域
  .imgAndNameBox {
    top: -83px;
    position: absolute;

    width: 400px;
    height: 160px;
    // 大播放器按钮区域
    .bigPlayButtonBox {
      height: 64px;
      // width: 200px;
      // border: 1px solid red;
      // 包含全部按钮的盒子
      .bigPlayButton {
        position: relative;
        height: 60px;

        // 最左侧的按钮
        i {
          cursor: pointer;
          position: absolute;
          left: 15px;
          top: 10px;
          font-size: 22px;
          color: #5c5c5c;
        }
        // 右侧的4个按钮整体盒子
        .bigPlayButtonTwo {
          margin-top: 18px;
          // margin-left: 80px;
          margin-left: 5.4vw;
          width: 250px;
          svg {
            font-size: 25px;
          }
          // 按钮背景
          span {
            line-height: 42px;
            text-align: center;
            display: inline-block;
            border: 1px solid #e6e6e6;
            border-radius: 20px;
            height: 38px;
            width: 38px;
            margin-left: 15px;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
    // 图片歌手区域
    .imgAndName {
      position: relative;
      height: 80px;
      // 图片遮罩层
      .imgMaskLayer {
        cursor: pointer;
        position: absolute;
        z-index: 100;
        top: 13px;
        left: 0px;
        width: 47px;
        height: 47px;
        border-radius: 5px;
        text-align: center;
        line-height: 47px;
        font-size: 22px;
        i {
          color: rgba(212, 212, 212, 0);
        }
        &:hover i {
          color: rgba(212, 212, 212, 0.5);
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(2px);
        }
      }
      // 歌曲图片
      img {
        position: absolute;
        width: 47px;
        border-radius: 5px;
        margin-top: 13px;
        // margin-left: 13px;
      }
      // 歌曲歌手名
      .songer {
        position: absolute;
        top: 15px;
        left: 50px;
        display: inline-block;
        margin-left: 10px;

        //歌曲名
        span:nth-child(1) {
          font-size: 15px;
          font-weight: 500;
          color: #333333;
          // color: green;
        }
        //爱心图标
        span:nth-child(2) {
          font-size: 18px;
          margin-left: 8px;
        }
        //歌手名
        span:nth-child(4) {
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          // color: red;
        }
      }
    }
  }
  // 歌曲控制
  .musicControl {
    position: absolute;
    // left: 490px;
    // border: 1px solid red;
    left: 35%;
    top: 20;
    width: 450px;
    height: 100%;
    .control {
      position: relative;
      // position: absolute;
      margin-top: 20px;
      // 五个图标
      i {
        cursor: pointer;
        font-size: 20px;
        &:hover {
          color: #ef6767;
        }
      }
      i:nth-child(1) {
        margin-left: 110px;
      }
      i:nth-child(2) {
        margin-left: 30px;
      }
      i:nth-child(3) {
        // z-index: 1000;
        margin-left: 38px;
      }
      i:nth-child(4) {
        margin-left: 34px;
      }
      i:nth-child(5) {
        margin-left: 26px;
      }
      .playCircle {
        z-index: -1;
        position: absolute;
        border-radius: 20px;
        background-color: #f4f4f4;
        // background-color: red;
        width: 38px;
        height: 38px;
        right: 204px;
        top: -9px;
      }
    }
    .longtime {
      position: relative;
      .el-slider {
        width: 83%;
        margin-left: 40px;
      }
      // 进度条高度
      /deep/.el-slider__runway {
        height: 4px;
        cursor: pointer;
      }
      // 去掉鼠标小手
      /deep/.el-slider__button-wrapper {
        width: 0;
        height: 0;
      }
      // 进度条经过部分颜色
      /deep/.el-slider__bar {
        background-color: #ff4e4e;
        height: 4px;
      }
      // 圆型按钮
      /deep/.el-slider__button {
        cursor: auto;
        width: 8px;
        height: 8px;
        border: 2px solid #ec4141;
        // background-color: #EC4141;
        background-color: #fff;
        // margin-bottom: 2px;
        margin-top: 8px;
      }
      // 已经播放时长
      span:nth-child(2) {
        top: 10px;
        position: absolute;
        color: #74777d;
        font-size: 10px;
      }
      // 歌曲总时长
      span:nth-child(4) {
        position: absolute;
        right: 2px;
        top: 10px;
        color: #74777d;
        font-size: 10px;
      }
    }
  }
}
</style>
