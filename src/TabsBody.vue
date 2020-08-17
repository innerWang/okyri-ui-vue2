<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabsBody',
  inject: ['eventBus'],
  mounted() {},
};
</script>

<style>
.tabs-body {
}
</style>
