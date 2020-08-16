<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriToast',
};
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-bg: rgba(0, 0, 0, 0.75);
$toast-color: #fff;
$toast-box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
$toast-border-radius: 4px;
$toash-padding: 16px;

.toast {
  position: fixed;
  top: 0;
  left: 50%;
  padding: $toash-padding;
  color: $toast-color;
  font-size: $font-size;
  line-height: 1.8;
  transform: translateX(-50%);
  background-color: $toast-bg;
  border-radius: $toast-border-radius;
  box-shadow: $toast-box-shadow;
}
</style>
