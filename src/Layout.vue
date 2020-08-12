<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriLayout',
  data: function () {
    return {
      layoutClass: {
        hasSider: false,
      },
    };
  },
  mounted() {
    this.$children.forEach((vm) => {
      // name 属性的第二个用法，可以找到子元素中是否包含特定的组件
      if (vm.$options.name === 'OkyriSider') {
        this.layoutClass.hasSider = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &.hasSider {
    flex-direction: row;
  }
}
</style>
