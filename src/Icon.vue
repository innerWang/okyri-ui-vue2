<template>
  <svg class="o-icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
import './svg';
export default {
  name: 'OkyriIcon',
  props: {
    name: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.o-icon {
  width: 1em;
  height: 1em;
}
</style>
