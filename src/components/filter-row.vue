<template>
  <div
    class="filter-row-container"
    :class="{ disabled: values.length == 0, long: both }"
  >
    <div class="title">{{ title }}</div>
    <div class="btns">
      <button class="btn" @click="addAll">全选</button>
      <button class="btn" @click="removeAll">清除</button>
      <checkbox
        v-if="both"
        :key="'both'"
        :title="'同时满足'"
        v-model="values"
      ></checkbox>
    </div>
    <div class="checkboxs">
      <checkbox
        v-for="v in cbt"
        :key="v"
        :title="v"
        v-model="values"
        :nowidth="nowidth"
      ></checkbox>
    </div>
  </div>
</template>
<script>
import checkbox from './checkbox.vue'
export default {
  name: 'filter-row',
  components: {
    checkbox,
  },
  props: {
    title: String,
    cbt: Array,
    both: Boolean,
    nowidth: Boolean,
    values: Array,
  },
  watch: {
    values: function () {
      this.$emit('change', this.values)
    },
  },
  methods: {
    removeAll: function () {
      if (this.values.indexOf('同时满足') === -1) {
        this.values = []
      } else {
        this.values = ['同时满足']
      }
    },
    addAll: function () {
      let temp = this.cbt.map((v) => v)
      if (this.values.indexOf('同时满足') === -1) {
        this.values = temp
      } else {
        temp.push('同时满足')
        this.values = temp
      }
    },
  },
}
</script>
<style scoped>
.filter-row-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-left: 0.2em solid #4487df;
  animation: 1s;
  flex-wrap: nowrap;
  padding: 3px;
  background-color: #f8f9fa;
}
.disabled {
  border-left: 0.2em solid rgba(0, 0, 0, 0);
}
.checkboxs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 auto;
}
.checkboxs > * {
  margin: 0.3em;
}
.title {
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
.btns {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  flex: 0 1000 auto;
  width: 116px;
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
@media screen and (max-width: 750px) {
  .filter-row-container {
    flex-wrap: wrap;
    border-bottom: solid 0.1em grey;
  }
  .btns {
    justify-content: flex-start;
    /* flex-grow: 1; */
  }
  .long .btns {
    width: 232px;
  }
}
</style>
