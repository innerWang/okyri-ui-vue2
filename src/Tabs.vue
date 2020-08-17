<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabs',
  props: {
    selected: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val) => {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      },
    },
  },
  created() {
    //this.$emit('update:selected', 'xxx')
  },
};
</script>

<style>
.tabs {
}
</style>
