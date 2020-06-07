<template>
  <div id="shead">
    <div id="avatar">头像</div>
    <div id="name">姓名</div>
    <div id="camp">
      <div>标志</div>
      <div>出身地</div>
      <div>团队</div>
      <div>种族</div>
    </div>
    <div id="data">
      <div>生命值</div>
      <div>攻击</div>
      <div>防御</div>
      <div>法术抗性</div>
    </div>
    <div id="property">
      <div>再部署时间</div>
      <div>部署费用</div>
      <div>阻挡</div>
      <div>攻击间隔</div>
    </div>
    <div id="obtain">获取方式</div>
    <div id="tag">
      <div>性别</div>
      <div>位置</div>
      <div>标签</div>
    </div>
    <div id="feature">特性</div>
  </div>
</template>
<script>
export default {
  name: 'shead'
}
</script>
<style scoped>
#shead {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  border-bottom: 1px solid #a2a9b1;
}
#shead > div {
  border-right: 1px solid #a2a9b1;
  display: flex;
  align-items: center;
  justify-content: center;
}
#avatar {
  border-left: 1px solid #a2a9b1;
  border-right: 1px solid #a2a9b1;
  width: 100px;
}
#name,
#camp,
#data,
#property,
#obtain,
#tag {
  flex-direction: column;
  width: 60px;
  flex: 1;
}
#feature {
  flex: 2 1;
}
</style>
