<template>
  <div class="o-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriButtonGroup',
  mounted() {
    for (let ele of this.$el.children) {
      const tag = ele.nodeName.toLowerCase();
      if (tag !== 'button') {
        console.warn(
          `children of o-button-group should only be o-button! but you use "${tag}"`
        );
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.o-button-group {
  display: inline-flex;
  vertical-align: middle; // 为了和外面的其他元素对齐

  > .o-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
    }

    &:first-child {
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }

    &:last-child {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }

    &:hover {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
