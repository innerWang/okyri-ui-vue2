<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="extra-wrapper">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabsHead',
  inject: ['eventBus'],
  mounted() {},
};
</script>

<style lang="scss" scoped>
.tabs-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 48px;

  .extra-wrapper {
    margin-left: auto;
  }
}
</style>
