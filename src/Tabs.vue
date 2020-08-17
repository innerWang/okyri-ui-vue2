<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
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
  data: function () {
    return {
      // 使用 data 进行数据中转，保证当前组件也可以访问 eventBus
      eventBus: new Vue(),
    };
  },
  // 使用 provide 进行依赖注入
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.eventBus.$emit('update:selected', this.selected);
  },
};
</script>

<style>
.tabs {
}
</style>
