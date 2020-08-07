<template>
  <div
    class="row"
    :style="{ marginLeft: -gutter / 2 + 'px', marginRight: -gutter / 2 + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriRow',
  props: {
    // 单位是像素
    gutter: {
      type: [Number, String],
    },
  },
  mounted() {
    // 需要注意，此处需要使用箭头函数，否则需要 bind this
    this.$children.forEach((vm) => {
      vm.gutter = this.gutter;
    });
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
</style>
