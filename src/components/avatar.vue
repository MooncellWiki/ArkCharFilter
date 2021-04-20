<template>
  <div class="avatar-container">
    <a :href="`${$8data.domain}/w/${zh}`">
      <img
        class="avatar lazyload"
        :data-src="`${$8data.domain}images/${getPath(`头像_${zh}.png`)}`"
      />
      <div class="rarity">
        <img :src="`${$8data.domain}images/${$8data.rarity[rarity]}`" />
      </div>
      <div class="class_">
        <img :src="`${$8data.domain}images/${$8data.class_[class_]}`" />
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'avatar',
  props: {
    class_: String,
    rarity: String, //但是应该是数字
    zh: String,
  },
}
</script>
<style scoped>
.avatar-container {
  position: relative;
  width: 100px;
  height: 100px;
}
.avatar {
  width: 100px;
}
.rarity {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.rarity > img {
  height: 18px;
}
.class_ {
  position: absolute;
  top: 0px;
}
.class > img {
  width: 25px;
}
</style>
