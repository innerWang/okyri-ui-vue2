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
      type: Array,
    },
  },
  data: function() {
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
    this.eventBus.$on('update:addSelected', (name) => {
      let selected = JSON.parse(JSON.stringify(this.selected)); // 深拷贝
      if (this.single) {
        selected = [name];
      } else {
        selected.push(name);
      }
      this.$emit('update:selected', selected); // 支持 .sync
      this.eventBus.$emit('update:selected', selected);
    });
    this.eventBus.$on('update:removeSelected', (name) => {
      const selected = this.selected.filter((n) => n !== name);
      this.$emit('update:selected', selected);
      this.eventBus.$emit('update:selected', selected);
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
