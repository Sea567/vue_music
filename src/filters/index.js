// 全局过滤器
import Vue from 'vue'
// 导入moment.js,用于格式化时间
import moment from 'moment'
// 定义全局过滤器，用来格式化数字 亿  万
Vue.filter(
  // toFixed为保留小数点位数
  'playvolume', function (arg) {
    // 此处用来防止报错
    if (!arg) {
      arg = ''
    }
    if (arg.toString().length >= 13) {
      // return arg/1000000000000+"万亿"
      const volume = arg / 1000000000000
      const realVal = parseFloat(volume).toFixed(2)
      return realVal + '万亿'
    } else if (arg.toString().length >= 9) {
      const volume = arg / 100000000
      const realVal = parseFloat(volume).toFixed(2)
      return realVal + '亿'
    } else if (arg.toString().length > 4) {
      const volume = arg / 10000
      const realVal = parseFloat(volume).toFixed(0)
      return realVal + '万'
    } else if (arg.toString().length >= 1) {
      return arg
    }
  }
)
// 全局过滤器，用于格式化时间 年月日
Vue.filter(
  // 'YYYY-MM-DD HH:mm:ss' 年月日 时分秒
  'dateformate', function (dataStr, pattern = 'YYYY-MM-DD ') {
    return moment(dataStr).format(pattern)
  }
)
// 格式化时间时分秒
Vue.filter(
  'timeformate', function (dataStr, pattern = 'mm:ss') {
    return moment(dataStr).format(pattern)
  }
)
