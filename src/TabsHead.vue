<template>
  <div class="tabs-head">
    <slot></slot>
    <div ref="line" class="line"></div>
    <div class="extra-wrapper">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabsHead',
  inject: ['eventBus'],
  mounted() {
    this.eventBus.$on('update:selected', (item, vm) => {
      let { width, left } = vm.$el.getBoundingClientRect();
      this.$refs.line.style.width = `${width}px`;
      //  使用 transform 可以进行硬件加速，但是会引入其他问题
      this.$refs.line.style.left = `${left}px`;
    });
  },
};
</script>

<style lang="scss" scoped>
$primary-color: blue;

.tabs-head {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 48px;
  border-bottom: 1px solid #ddd;

  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $primary-color;
    transition: all 0.3s;
  }

  > .extra-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    margin-left: auto;
  }
}
</style>
