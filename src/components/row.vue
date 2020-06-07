<template>
  <div class="row-container">
    <card v-if="type === 0" :row="row"></card>
    <short v-if="type === 1" :row="row"></short>
    <long v-if="type === 2" :row="row"></long>
  </div>
</template>
<script>
import card from './row/card.vue'
import long from './row/long.vue'
import short from './row/short.vue'
export default {
  name: 'row',
  components: {
    card,
    long,
    short
  },
  props: {
    row: {
      class_: String, //职业
      rarity: Number, //稀有度（0-5）
      logo: String, //标志
      birth_place: String, //出身地
      team: String, //团队
      race: String, //种族
      zh: String, //中文干员名
      en: String, //英文干员名
      ja: String, //日文干员名
      id: String, //情报编号
      re_deploy: String, //再部署时间
      cost: Number, //部署费用
      block: Number, //阻挡数
      sex: String, //性别
      position: String, //位置
      tag: Array, //词缀
      obtain_method: Array //获得方式
    },
    type: Number
  }
}
</script>
<style scoped>
.row-conainer {
  width: 100%;
}
</style>
