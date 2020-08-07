<template>
  <div class="row" :style="rowStyle">
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
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px',
      };
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
