<template>
  <div id="app" ref="app">
    <div>
      <div
        v-for="(v, i) in filters"
        :key="v.title"
        class="filter"
        :class="['filter-' + i]"
      >
        <div
          class="filter-title"
          :class="{ enabled: states[i].flat().length > 0 && !expanded[i] }"
        >
          {{ v.title }}
        </div>
        <div class="collapsible" @click="toggle(i)">
          <!-- {{ expanded[i] ? '折叠' : '展开' }} -->
          <div>
            <svg
              v-show="!expanded[i]"
              t="1590476789572"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6592"
              width="24"
              height="24"
            >
              <path
                d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z"
                p-id="6593"
              ></path>
            </svg>
            <svg
              v-show="expanded[i]"
              t="1590477111828"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6715"
              width="24"
              height="24"
            >
              <path
                d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z"
                p-id="6716"
              ></path>
            </svg>
          </div>
        </div>
        <div
          :ref="i"
          class="expand-panel"
          :style="{ height: expanded[i] ? 'auto' : '0px' }"
        >
          <filter-row
            v-for="(v2, i2) in v.filter"
            :key="v2.title"
            :title="v2.title"
            @change="$set(states[i], i2, $event)"
            :cbt="v2.cbt"
            :both="v2.both"
            :nowidth="i == 2"
            :values="states[i][i2]"
          ></filter-row>
        </div>
      </div>
      <div class="control">
        <div>排序方式</div>
        <div class="order">
          <checkbox
            v-for="v in orderMethod"
            :key="v"
            v-model="order"
            :title="v"
            :atleastOne="true"
            :onlyOne="true"
          ></checkbox>
        </div>
      </div>
      <div class="mode">
        <input placeholder="搜索干员名称/简介/特性" v-model="search_" />
        <div>
          <checkbox
            v-for="v in data_types"
            :key="v"
            :title="v"
            v-model="data_type"
          ></checkbox>
        </div>
        <!-- <div>
          <checkbox
            v-for="v in modes"
            :key="v"
            :title="v"
            v-model="mode"
            :atleastOne="true"
            :onlyOne="true"
          ></checkbox>
        </div> -->
        <div>
          <checkbox
            v-for="v in display_modes"
            :key="v"
            :title="v"
            :atleastOne="true"
            :onlyOne="true"
            v-model="display_states"
          ></checkbox>
        </div>
      </div>
    </div>
    <div id="pagination">
      <div class="btn" :data-clipboard-text="url" @click="copyurl">
        复制短链接
      </div>
      <paginations
        :length="oridata.length"
        @change="onPageChange"
        @changestep="onStepChange"
        :index="page.index"
        :step="page.step"
      ></paginations>
    </div>
    <div id="result">
      <shead
        v-if="display_states[0] == '表格' && bp === 1"
        :class="{ fix: fix }"
      ></shead>
      <lhead
        v-else-if="display_states[0] == '表格' && bp === 2"
        :class="{ fix: fix }"
      ></lhead>
      <div
        id="filter-result"
        :class="{
          showhead: display_states[0] == '头像',
          showavatar: display_states[0] == '半身像'
        }"
      >
        <template v-if="display_states[0] == '半身像'">
          <half
            v-for="v in data"
            :key="v.sortid"
            :class_="v.class_"
            :rarity="v.rarity"
            :logo="v.logo"
            :zh="v.zh"
            :en="v.en"
          ></half>
        </template>
        <template v-if="display_states[0] == '头像'">
          <avatar
            v-for="v in data"
            :key="v.sortid"
            :class_="v.class_"
            :rarity="v.rarity"
            :zh="v.zh"
          ></avatar>
        </template>
        <template v-if="display_states[0] == '表格' && bp === 1">
          <short
            v-for="v in data"
            :key="v.sortid"
            :row="v"
            :addtrust="data_type.indexOf('满信赖') != -1"
            :addpotential="data_type.indexOf('满潜能') != -1"
          >
            <div v-html="v.feature"></div>
          </short>
        </template>
        <template v-if="display_states[0] == '表格' && bp === 2">
          <long
            v-for="v in data"
            :key="v.sortid"
            :row="v"
            :addtrust="data_type.indexOf('满信赖') != -1"
            :addpotential="data_type.indexOf('满潜能') != -1"
          >
            <div v-html="v.feature"></div>
          </long>
        </template>
        <template v-if="display_states[0] == '表格' && bp == 0">
          <card
            v-for="v in data"
            :key="v.sortid"
            :row="v"
            :addtrust="data_type.indexOf('满信赖') != -1"
            :addpotential="data_type.indexOf('满潜能') != -1"
          >
            <div v-html="v.feature"></div>
          </card>
        </template>
      </div>
    </div>
    <paginations
      :length="oridata.length"
      @change="onPageChange"
      @changestep="onStepChange"
      :index="page.index"
      :step="page.step"
    ></paginations>
  </div>
</template>

<script>
import half from './components/half.vue'
import avatar from './components/avatar.vue'
import card from './components/row/card.vue'
import shead from './components/head/shead'
import short from './components/row/short.vue'
import lhead from './components/head/lhead.vue'
import long from './components/row/long.vue'
import checkbox from './components/checkbox.vue'
import filterRow from './components/filter-row.vue'
import paginations from './components/paginations.vue'
const m = [
  ['class_', 'rarity', 'position', 'sex', 'obtain_method', 'tag'],
  ['phy', 'flex', 'tolerance', 'plan', 'skill', 'adapt'],
  ['logo', 'birth_place', 'team', 'race']
]
export default {
  name: 'App',
  components: {
    half,
    avatar,
    card,
    shead,
    short,
    lhead,
    long,
    checkbox,
    filterRow,
    paginations
  },
  data: function() {
    return {
      states: [
        [[], [], [], [], [], []],
        [[], [], [], [], [], []],
        [[], [], [], []]
      ],
      filters: [],
      expanded: [true, false, false],
      order: ['实装顺序'],
      orderMethod: [
        '实装顺序',
        '实装倒序',
        '名称升序',
        '名称降序',
        '稀有度升序',
        '稀有度降序'
      ],
      // modes: ['筛选', '公开招募'],
      // mode: ['筛选'],
      display_modes: ['表格', '半身像', '头像'],
      display_states: ['表格'],
      data_types: ['满潜能', '满信赖'],
      data_type: [],
      bp: 2,
      filter_map: [],
      page: {
        index: 1,
        step: '50'
      },
      search_: '',
      search: '',
      fix: {}
    }
  },
  methods: {
    toggle: function(i) {
      this.$set(this.expanded, i, !this.expanded[i])
      this.Cookies.set('opFilterExpandState', this.expanded, {
        expires: 365
      })
      if (this.expanded[i]) {
        let targetHeight = 0
        for (let j = 0; j < this.$refs[i][0].children.length; j++) {
          targetHeight += this.$refs[i][0].children[j].offsetHeight
        }
        this.vel(
          this.$refs[i][0],
          { height: targetHeight },
          {
            duration: 500,
            delay: 0
          }
        ).then(() => {
          this.$refs[i][0].style.height = 'auto'
        })
      } else {
        this.vel(
          this.$refs[i][0],
          { height: 0 },
          {
            duration: 500,
            delay: 0
          }
        )
      }
    },
    onPageChange: function(page) {
      this.page = page
      this.Cookies.set('opFilterPageStep', this.page.step, { expires: 365 })
    },
    onStepChange: function({ n, o }) {
      n = parseInt(n)
      o = parseInt(o)
      if (o < n) {
        this.$set(this.page, 'index', Math.ceil((o / n) * this.page.index))
      } else {
        if (this.page.index >= 1) {
          this.$set(this.page, 'index', ((this.page.index - 1) * o) / n + 1)
        }
      }
      this.$set(this.page, 'step', n.toString())
      this.Cookies.set('opFilterPageStep', this.page.step, { expires: 365 })
    },
    copyurl: function() {
      if (this.isfirst) {
        this.isfirst = false
        // eslint-disable-next-line no-undef
        let clipboard = new ClipboardJS('#pagination > div.btn', {
          text: function(trigger) {
            return trigger.getAttribute('data-clipboard-text')
          }
        })
        clipboard.on('success', function(e) {
          alert('链接已复制: ' + e.text)
        })
        clipboard.on('error', function(e) {
          console.error({ copyUrlError: e })
        })
      }
    }
  },
  created: function() {
    const getLast = str => {
      if (str.indexOf('→') !== -1) {
        let arr = str.split('→')
        return arr[arr.length - 1]
      } else {
        return str
      }
    }
    this.source = Array.prototype.map.call(
      document.getElementById('filter-data').children,
      v => {
        let temp = {}
        Object.assign(temp, v.dataset)
        temp.tag = temp.tag.split(' ')
        temp.obtain_method = temp.obtain_method.split(' ')
        temp.cost = getLast(temp.cost)
        temp.block = getLast(temp.block)
        temp.feature = v.innerHTML
        temp.trust = temp.trust.split(',').map(v => {
          if (v.length !== 0) {
            return parseInt(v)
          } else {
            return 0
          }
        })
        temp.potential = temp.potential.split('`').map(v => v.split(','))
        temp.potential[1] = temp.potential[1].map(v => parseFloat(v))
        temp.noHtmlFeature = temp.feature.replace(/<[^<>]+>/g, '')
        return Object.freeze(temp)
      }
    )
    // console.log(this.source)
    let filters = Object.freeze(
      JSON.parse(document.getElementById('filter-filter').innerText).filters
    )
    this.filters = filters
    this.filter_map = Object.freeze(
      JSON.parse(document.getElementById('filter-map').innerText).filter_map
    )
    this.shortLinkMap = Object.freeze(
      JSON.parse(document.getElementById('filter-shortLinkMap').innerText).map
    )
    let states = []
    filters.forEach((v1, i1) => {
      states.push([])
      v1.filter.forEach(() => {
        states[i1].push([])
      })
    })
    this.states = states
    this.expanded = this.Cookies.getJSON('opFilterExpandState') || [
      true,
      false,
      false
    ]
    if (this.Cookies.get('opFilterDisplayState')) {
      this.display_states = [
        decodeURI(this.Cookies.get('opFilterDisplayState'))
      ]
    } else {
      this.display_states = ['表格']
    }
    this.data_type = this.Cookies.getJSON('opFilterDataType') || ['满潜能']
    if (this.Cookies.get('opFilterPageStep')) {
      let step = this.Cookies.get('opFilterPageStep')
      if (['50', '100', '200'].indexOf(step) != -1) {
        this.$set(this.page, 'step', step)
      }
    }
    const updateSearch = () => {
      this.search = this.search_
    }
    this.debouncedUpdateSearch = (fn => {
      let canRun = true
      return function() {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
          fn()
          canRun = true
        }, 100)
      }
    })(updateSearch)
    this._keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+,'
    {
      let data = /#([^#]+)#/.exec(window.location.hash)
      if (data && data[1]) {
        const base64ToArr = str => {
          return str
            .split('')
            .map(v => {
              let temp = this._keyStr.indexOf(v).toString(2)
              while (temp.length % 6 != 0) {
                temp = '0' + temp
              }
              return temp.split('')
            })
            .flat()
        }
        let arr = data[1].split('|')
        this.search_ = arr[arr.length - 1]
        arr = arr.slice(0, -1).map(v => base64ToArr(v))
        // console.log(arr)
        let i = 0
        let states = this.states
        let shortLinkMap = this.shortLinkMap
        this.states.forEach((v1, i1) => {
          v1.forEach((v2, i2) => {
            if (arr[i].filter(v => v != '0').length != 0) {
              arr[i].forEach((v3, i3) => {
                if (v3 == '1') {
                  states[i1][i2].push(shortLinkMap[i1][i2][i3])
                }
              })
            }
            i++
          })
        })
      }
    }
  },
  mounted: function() {
    let bp = () => {
      if (this.$refs.app.offsetWidth > 900) {
        this.bp = 2
      } else if (this.$refs.app.offsetWidth > 640) {
        this.bp = 1
      } else {
        this.bp = 0
      }
    }
    window.addEventListener(
      'resize',
      (fn => {
        let canRun = true
        return function() {
          if (!canRun) return
          canRun = false
          fn()
          setTimeout(() => {
            fn()
            canRun = true
          }, 500)
        }
      })(bp)
    )
    bp()
    this.isfirst = true
    let f = () => {
      let ele
      if (this.bp == 1) {
        ele = document.querySelector('#pagination')
      } else if (this.bp === 2) {
        ele = document.querySelector('#pagination')
      } else {
        return 0
      }
      if (
        ele.getBoundingClientRect().top + ele.getBoundingClientRect().height <
        0
      ) {
        this.fix = true
      } else {
        this.fix = false
      }
    }
    f()
    window.addEventListener(
      'scroll',
      (fn => {
        let timeout
        return function() {
          if (timeout) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(() => {
            fn()
          }, 10)
        }
      })(f)
    )
  },
  computed: {
    oridata: function() {
      let temp = this.source
      let filters = this.filters
      let filter_map = this.filter_map
      const has = (v, arr, i1, i2) => {
        let a = arr
        if (i1 == 2) {
          a = arr.map(v => filter_map[i2][v] || v).flat()
        }
        return a.indexOf(v) !== -1
      }
      const other = (v, arr, i1, i2) => {
        if (arr.indexOf('其他') !== -1) {
          let da = filters[i1]['filter'][i2]['cbt']
            .map(v => {
              if (filter_map[i2] && filter_map[i2][v]) {
                return filter_map[i2][v]
              } else {
                return v
              }
            })
            .flat()
          da.splice(da.indexOf('其他'), 1)
          return arr.indexOf(v) !== -1 || da.indexOf(v) == -1
        } else {
          return has(v, arr, i1, i2)
        }
      }
      this.states.forEach((v1, i1) => {
        v1.forEach((v2, i2) => {
          if (v2.length !== 0) {
            temp = temp.filter(v3 => {
              if (i1 == 0 && i2 == 1) {
                //稀有度
                return v2.indexOf('★' + (1 + parseInt(v3[m[i1][i2]]))) !== -1
              } else if (i1 == 0 && i2 == 3) {
                //性别
                if (v2.indexOf('其他') !== -1) {
                  return (
                    v2.indexOf(v3[m[i1][i2]] + '性') !== -1 ||
                    (v3.sex !== '男' && v3.sex !== '女')
                  )
                } else {
                  return v2.indexOf(v3[m[i1][i2]] + '性') !== -1
                }
              } else if (i1 == 0 && i2 == 4) {
                return (
                  v3[m[i1][i2]].filter(v4 => other(v4, v2, i1, i2)).length != 0
                )
                // return other(v3[m[i1][i2]], v2, i1, i2)
              } else if (i1 == 0 && i2 == 5) {
                //词缀
                if (v2.indexOf('同时满足') !== -1) {
                  //同时满足
                  if (v2.length === 1) {
                    return true
                  }
                  let flag = true
                  for (let i = 0; i < v2.length; i++) {
                    if (v2[i] !== '同时满足') {
                      if (v3.tag.indexOf(v2[i]) === -1) {
                        flag = false
                      }
                    }
                  }
                  return flag
                } else {
                  let flag = false
                  for (let i = 0; i < v2.length; i++) {
                    if (v3.tag.indexOf(v2[i]) !== -1) {
                      flag = true
                      break
                    }
                  }
                  return flag
                }
              } else if (i1 == 1 || (i1 == 2 && (i2 == 1 || i2 == 3))) {
                //六维筛选，出身地，种族有其他
                return other(v3[m[i1][i2]], v2, i1, i2)
              } else {
                return has(v3[m[i1][i2]], v2, i1, i2)
                // return v2.indexOf(v3[m[i1][i2]]) !== -1
              }
            })
          }
        })
      })
      let search = this.search
      temp = temp.filter(v => {
        let tags = ['zh', 'en', 'ja', 'id', 'noHtmlFeature']
        return tags.filter(key => v[key].indexOf(search) != -1).length != 0
      })
      switch (this.order[0]) {
        case '实装顺序':
          temp.sort((a, b) => a.sortid - b.sortid)
          break
        case '实装倒序':
          temp.sort((a, b) => b.sortid - a.sortid)
          break
        case '名称升序':
          temp.sort((a, b) => a.zh.localeCompare(b.zh, 'zh'))
          break
        case '名称降序':
          temp.sort((a, b) => b.zh.localeCompare(a.zh, 'zh'))
          break
        case '稀有度升序':
          temp.sort((a, b) => {
            let r = a.rarity - b.rarity
            if (r === 0) {
              let classes = this.filters[0].filter[0].cbt
              let o = classes.indexOf(a.class_) - classes.indexOf(b.class_)
              if (o === 0) {
                return a.zh.localeCompare(b.zh, 'zh')
              } else {
                return o
              }
            } else {
              return r
            }
          })
          break
        case '稀有度降序':
          temp.sort((a, b) => {
            let r = b.rarity - a.rarity
            if (r === 0) {
              let classes = this.filters[0].filter[0].cbt
              let o = classes.indexOf(a.class_) - classes.indexOf(b.class_)
              if (o === 0) {
                return a.zh.localeCompare(b.zh, 'zh')
              } else {
                return o
              }
            } else {
              return r
            }
          })
          break
      }
      // console.log(temp)
      return temp
    },
    data: function() {
      let start = (this.page.index - 1) * this.page.step
      return this.oridata.slice(start, start + this.page.step)
    },
    url: function() {
      const arrToBase64 = arr => {
        if (arr.indexOf(1) == -1) {
          return ''
        }
        let result = []
        while (arr.length % 6 != 0) {
          arr.push(0)
        }
        for (let i = 0; i < arr.length; i += 6) {
          result.push(
            this._keyStr.charAt(parseInt(arr.slice(i, i + 6).join(''), 2))
          )
        }
        return result.join('')
      }
      let states = this.states
      let result = []
      this.filters.forEach((v1, i1) => {
        v1.filter.forEach((v2, i2) => {
          let temp = Array(v2.cbt.length).fill(0)
          states[i1][i2].forEach(selected => {
            temp[this.shortLinkMap[i1][i2].indexOf(selected)] = 1
          })
          result.push(arrToBase64(temp))
        })
      })
      return (
        window.location.origin +
        window.location.pathname +
        '#' +
        result.join('|') +
        '|' +
        this.search +
        '#'
      )
    }
  },
  watch: {
    display_states: function() {
      this.Cookies.set('opFilterDisplayState', this.display_states[0], {
        expires: 365
      })
    },
    data_type: function() {
      this.Cookies.set('opFilterDataType', this.data_type, { expires: 365 })
    },
    search_: function() {
      this.debouncedUpdateSearch()
    },
    states: {
      handler: function() {
        this.$set(this.page, 'index', 1)
      },
      deep: true
    },
    order: {
      handler: function() {
        this.$set(this.page, 'index', 1)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1353px;
}
.filter {
  width: 100%;
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #f8f8f8;
  margin-bottom: 5px;
}
.filter-title {
  border-left: solid rgba(0, 0, 0, 0) 0.2em;
  transition: ease 0.5s;
  padding: 7px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-size: 16px;
  letter-spacing: 0.08em;
  text-indent: 0.08em;
  background-color: #eaebee;
}
.collapsible {
  position: absolute;
  right: 1.1em;
  top: 0px;
  color: blue;
  cursor: pointer;
  letter-spacing: 0.08em;
  text-indent: 0.08em;
  font-weight: 700;
  width: 29px;
  height: 24px;
  padding-top: 5px;
}
.collapsible > div:hover {
  border-radius: 50%;
  background-color: rgba(213, 215, 219, 0.4);
}
.expand-panel {
  /* transition: height 0.5s; */
  overflow: hidden;
}
.control {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  /* border-radius: 4px; */
  background-color: #f8f8f8;
  margin-bottom: 5px;
  padding: 3px;
}
.control > :first-child {
  height: 28px;
  /* min-width: 40px; */
  width: 60px;
  padding: 0 8px;
  display: inline-flex;
  flex: 0 0 auto;
  margin: 0.3em;
  align-items: center;
  justify-content: flex-start;
  vertical-align: middle;
}
#pagination :first-child,
.mode .checkbox-container,
.control .checkbox-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.order {
  display: flex;
  /* flex-grow: 1; */
  justify-content: flex-start;
  flex-wrap: wrap;
}
.mode {
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
}
.mode > div > div {
  margin: 0.3em;
}
.order > div {
  width: 80px !important;
  margin: 0.3em;
}
input {
  flex-grow: 1;
  height: 30px;
  min-width: 280px;
  outline: 0;
  border: rgba(0, 0, 0, 0.42) solid thin;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 1px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  /* padding: 2px; */
}
input:focus {
  border-color: #4487df;
}
.showavatar,
.showhead {
  display: flex;
  flex-wrap: wrap;
}
.enabled {
  border-left: solid#4487df 0.2em;
}
#pagination {
  display: flex;
  padding: 2px 0;
}
.btn {
  margin: 0.3em;
  box-shadow: 0 3px 5px grey;
  will-change: box-shadow;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f5f5f5;
  height: 28px;
  min-width: 50px;
  padding: 0 8px;
  align-items: center;
  /* border-radius: 4px; */
  display: inline-flex;
  flex: 0 0 auto;
  letter-spacing: 0.08em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.08em;
  vertical-align: middle;
  white-space: nowrap;
  border-width: 0px;
  cursor: pointer;
}
.btns > div {
  margin: 3px;
  width: 94px;
}
.fix {
  position: fixed;
  top: 0;
  right: 1em;
  left: 201px;
  z-index: 2;
}
@media screen and (min-width: 982px) {
  .fix {
    max-width: 1353px;
    right: 1.5em;
  }
}
.fix + #filter-result > div:first-child {
  margin-top: 100px;
}
</style>
