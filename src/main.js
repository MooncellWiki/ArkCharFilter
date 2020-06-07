import Vue from 'vue'
import App from './App.vue'
import MD5 from 'md5'
import Cookies from 'js-cookie'
import vel from 'velocity-animate'

Vue.config.productionTip = false
//getPath("兽Unknown.png")
//"c/c1/兽Unknown.png"
Vue.prototype.Cookies = Cookies
Vue.prototype.vel = vel
Vue.prototype.getPath = (() => {
  let pathMap = {}
  return filename => {
    if (pathMap[filename]) {
      return pathMap[filename]
    } else {
      let md5 = MD5(filename)
      let result = md5.slice(0, 1) + '/' + md5.slice(0, 2) + '/' + filename
      pathMap[filename] = result
      return result
    }
  }
})()
Vue.prototype.$8data = {
  domain: '//ak.mooncell.wiki/',
  uh: [
    '6/68/干员图鉴_uh_0.png',
    'd/d7/干员图鉴_uh_1.png',
    '6/69/干员图鉴_uh_2.png',
    'e/e5/干员图鉴_uh_3.png',
    '9/92/干员图鉴_uh_4.png',
    '4/45/干员图鉴_uh_5.png'
  ],
  uhs: '7/7f/干员图鉴_uh_阴影.png',
  class_: {
    先锋: '/7/78/图标_职业_先锋.png',
    近卫: '7/7d/图标_职业_近卫.png',
    狙击: '9/96/图标_职业_狙击.png',
    重装: '3/3c/图标_职业_重装.png',
    医疗: 'b/be/图标_职业_医疗.png',
    辅助: 'c/c7/图标_职业_辅助.png',
    术师: '2/23/图标_职业_术师.png',
    特种: 'f/f1/图标_职业_特种.png'
  },
  rarity: [
    '6/62/稀有度_黄_0.png',
    '0/02/稀有度_黄_1.png',
    '4/4b/稀有度_黄_2.png',
    '4/4c/稀有度_黄_3.png',
    '8/81/稀有度_黄_4.png',
    '4/46/稀有度_黄_5.png'
  ],
  lh: r => {
    let _lh = [
      '0/0b/干员图鉴_lh_0%2C1%2C2.png',
      'a/a5/干员图鉴_lh_3.png',
      '9/9e/干员图鉴_lh_4.png',
      'a/a5/干员图鉴_lh_5.png'
    ]
    if (r < 3) {
      return _lh[0]
    } else {
      return _lh[r - 2]
    }
  },
  light: [
    'a/a7/干员图鉴_稀有度_亮光_0.png',
    '9/9c/干员图鉴_稀有度_亮光_1.png',
    'b/b0/干员图鉴_稀有度_亮光_2.png',
    '0/0d/干员图鉴_稀有度_亮光_3.png',
    'f/f7/干员图鉴_稀有度_亮光_4.png',
    '1/19/干员图鉴_稀有度_亮光_5.png'
  ],
  bg: r => {
    let _bg = [
      '2/25/干员图鉴_背景_0%2C1%2C2.png',
      'b/b1/干员图鉴_背景_3.png',
      'a/ad/干员图鉴_背景_4.png',
      'c/c9/干员图鉴_背景_5.png'
    ]
    if (r < 3) {
      return _bg[0]
    } else {
      return _bg[r - 2]
    }
  },
  patch: '2/20/干员图鉴_补丁.png',
  logo: {
    乌萨斯: '/d/d8/Logo_乌萨斯.png',
    企鹅物流: '2/2b/Logo_企鹅物流.png',
    卡西米尔: '5/5f/Logo_卡西米尔.png',
    拉特兰: 'e/e9/Logo_拉特兰.png',
    深海猎人: 'c/cf/Logo_深海猎人.png',
    维多利亚: '1/14/Logo_维多利亚.png',
    罗德岛: '4/41/Logo_罗德岛.png',
    巴别塔: 'b/b9/Logo_巴别塔.png',
    莱塔尼亚: '3/32/Logo_莱塔尼亚.png',
    莱茵生命: 'b/b4/Logo_莱茵生命.png',
    谢拉格: 'd/d8/Logo_谢拉格.png',
    雷姆必拓: 'e/ee/Logo_雷姆必拓.png',
    黑钢: '/5/56/Logo_黑钢.png',
    龙门: '6/66/Logo_龙门.png',
    炎国: 'f/f6/Logo_炎国.png',
    汐斯塔: '2/2d/Logo_汐斯塔.png'
  }
}
new Vue({
  render: h => h(App)
}).$mount('#app')
