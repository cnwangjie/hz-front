<template lang="html">
<div class="col-sm-3">
  <div v-for="block in sidebar" class="block">
    <div class="block-head">
      {{ block.title }}
    </div>
    <div class="block-content" v-html="block.content">
      <span v-if="block.readmore" class="readmore">继续阅读</span>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    let sidebar = []
    sidebar.push({
      title: '徽州文化定义',
      content: `
        <p><strong>刘伯山认为徽州文化即是指发生与存在于历史上徽州的以及由此发生辐射、影响于外的典型封建文化。</strong></p>

        <p>其一，我们说的徽州文化是指<strong>历史上徽州区划范围内的文化</strong>。其地理区域范围包括当年徽州府辖的6个县...</p>`,
        readmore: true
    })
    return {
      sidebar
    }
  }
}
</script>

<style lang="css">
.block {
}
.block-head {
  height: 40px;
  background: url(/static/block-head-bg.png);
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  padding: 4px 0 0 40px;
  font-size: 18px;
}
.block-content {
  position: relative;
  padding: 12px 20px;
  text-indent: 25px;
}
.readmore {
  cursor: pointer;
  color: rgba(46, 46, 46, 0.5);
}
.readmore:hover {
  text-decoration: underline;
}
</style>
