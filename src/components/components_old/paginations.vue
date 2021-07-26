<template>
  <div class="paginations-container">
    <select name="length" v-model="step_">
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>
    <div>{{ '共' + length + '条' }}</div>
    <div class="checkbox-container">
      <checkbox
        v-for="k in checkboxCount"
        :key="k"
        v-model="values"
        :title="k.toString()"
        :onlyOne="true"
        :atleastOne="true"
      ></checkbox>
    </div>
  </div>
</template>
<script>
import checkbox from './checkbox.vue'
export default {
  name: 'paginations',
  components: {
    checkbox,
  },
  props: {
    length: Number,
    step: String,
    index: Number,
  },
  data: () => {
    return {
      step_: 50,
      values: ['1'],
    }
  },
  watch: {
    values: function () {
      this.$emit('change', { index: parseInt(this.values[0]), step: this.step })
    },
    index: function () {
      this.$set(this.values, 0, this.index.toString())
    },
    step_: function (n, o) {
      this.$emit('changestep', { n, o })
    },
    step: function () {
      this.step_ = this.step
    },
  },
  computed: {
    checkboxCount: function () {
      return Math.ceil(this.length / this.step)
    },
  },
  created: function () {
    this.step_ = this.step
  },
}
</script>
<style scoped>
.paginations-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
select {
  width: 70px;
  height: 28px;
  outline: 0;
  margin: 5px 0;
}
.paginations-container .checkbox-container > div {
  margin: 0.3em;
  width: 28px;
  border-radius: 28px;
  min-width: 0px !important;
  padding: 0 !important;
  letter-spacing: 0 !important;
  text-indent: -0.05em !important;
}
</style>
