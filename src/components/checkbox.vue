<template>
  <div
    @click="onclick"
    class="checkbox-container"
    :class="{
      selected: selected,
      nowidth: nowidth
    }"
  >
    {{ title }}
  </div>
</template>
<script>
export default {
  name: 'checkbox',
  props: {
    value: Array,
    title: String,
    atleastOne: Boolean,
    onlyOne: Boolean,
    nowidth: Boolean
  },
  methods: {
    onclick: function() {
      // console.log(event)
      if (this.value) {
        if (this.selected) {
          if (!this.atleastOne || this.value.length != 1) {
            this.$emit(
              'change',
              this.value.splice(this.value.indexOf(this.title), 1)
            )
          }
        } else {
          if (this.onlyOne && this.value.length === 1) {
            this.$emit(
              'change',
              (() => {
                this.value.pop()
                this.value.push(this.title)
                return this.value
              })()
            )
          } else {
            this.$emit('change', this.value.push(this.title))
          }
        }
      }
    }
  },
  computed: {
    selected: function() {
      if (this.value) {
        return this.value.indexOf(this.title) !== -1
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.checkbox-container {
  width: 70px;
  background-color: #313131;
  color: #ffffff;
  height: 28px;
  min-width: 40px;
  padding: 0 8px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  box-shadow: 0 3px 5px grey;
  letter-spacing: 0.08em;
  text-indent: 0.08em;
  cursor: pointer;
}

.selected {
  background-color: #0098dc;
}
.nowidth {
  width: initial;
}
</style>
