<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'OkyriCollapse',
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
    },
  },
  data: function () {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.eventBus.$emit('update:selected', this.selected);
    this.eventBus.$on('update:selected', (name) => {
      this.$emit('update:selected', name);
    });
  },
};
</script>

<style lang="scss" scoped>
$border-color: #ddd;
$border-radius: 4px;
.collapse {
  border: 1px solid $border-color;
  border-radius: $border-radius;
}
</style>
